/**
 * Скачивает royalty-free изображения с Pexels для attention field вокруг глаза.
 * Требует PEXELS_API_KEY в .env
 *
 * Запуск: npm run download:attention-assets
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/attention-assets");
const MANIFEST_PATH = path.join(OUT_DIR, "manifest.json");

/** Категории и поисковые запросы (12–15 шт. на категорию) */
const CATEGORIES = [
  {
    category: "creators",
    perCategory: 13,
    queries: [
      "business portrait professional headshot",
      "founder talking camera office",
      "expert interview portrait studio",
      "content creator portrait microphone",
    ],
  },
  {
    category: "product",
    perCategory: 14,
    queries: [
      "skincare product cosmetics bottle",
      "gadget tech product flat lay",
      "coffee cup product photography",
      "fashion product minimal studio",
    ],
  },
  {
    category: "saas",
    perCategory: 13,
    queries: [
      "laptop dashboard analytics screen",
      "saas software interface laptop",
      "mobile app ui smartphone screen",
      "data analytics dashboard monitor",
    ],
  },
  {
    category: "gaming",
    perCategory: 12,
    queries: [
      "gaming controller neon setup",
      "streamer desk rgb lights",
      "video game entertainment setup",
      "esports gaming headset",
    ],
  },
  {
    category: "education",
    perCategory: 13,
    queries: [
      "research laboratory scientist",
      "whiteboard tutorial classroom",
      "online education laptop notes",
      "study desk books research",
    ],
  },
  {
    category: "lifestyle",
    perCategory: 13,
    queries: [
      "fitness wellness transformation",
      "travel lifestyle adventure",
      "wellness spa self care",
      "healthy lifestyle morning routine",
    ],
  },
  {
    category: "content",
    perCategory: 13,
    queries: [
      "podcast studio microphone",
      "youtube studio camera lights",
      "smartphone vertical video recording",
      "social media content creation desk",
    ],
  },
];

const PEXELS_SEARCH = "https://api.pexels.com/v1/search";
const REQUEST_DELAY_MS = 350;

/** Читает .env без внешних зависимостей */
function loadEnvFile() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const eqIndex = line.indexOf("=");
    if (eqIndex === -1) continue;

    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sanitizeAlt(text) {
  const cleaned = String(text || "Stock photo")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
  return cleaned || "Stock photo";
}

/** Поиск фото на Pexels */
async function searchPexels(apiKey, query, page = 1, perPage = 20) {
  const url = new URL(PEXELS_SEARCH);
  url.searchParams.set("query", query);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(perPage));

  const response = await fetch(url, {
    headers: { Authorization: apiKey },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Pexels search failed (${response.status}) for "${query}": ${body.slice(0, 200)}`,
    );
  }

  const data = await response.json();
  return Array.isArray(data.photos) ? data.photos : [];
}

/** Скачивает буфер изображения */
async function fetchImageBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Image download failed (${response.status})`);
  }
  return Buffer.from(await response.arrayBuffer());
}

/** Конвертирует в webp 480×640 или 640×480 */
async function saveOptimizedWebp(sharp, buffer, destPath) {
  const meta = await sharp(buffer).metadata();
  const width = meta.width || 1;
  const height = meta.height || 1;
  const isPortrait = height >= width;
  const aspect = isPortrait ? "portrait" : "landscape";

  const pipeline = sharp(buffer).rotate().resize({
    width: isPortrait ? 480 : 640,
    height: isPortrait ? 640 : 480,
    fit: "cover",
    position: "centre",
  });

  await pipeline.webp({ quality: 78, effort: 4 }).toFile(destPath);
  return aspect;
}

/** Собирает уникальные фото по категории */
async function collectCategoryPhotos(apiKey, categoryConfig, seenIds) {
  const collected = [];
  let page = 1;

  for (const query of categoryConfig.queries) {
    while (collected.length < categoryConfig.perCategory && page <= 8) {
      let photos = [];
      try {
        photos = await searchPexels(apiKey, query, page, 20);
      } catch (error) {
        console.warn(`  ⚠ Search error [${categoryConfig.category}]: ${error.message}`);
        break;
      }

      if (photos.length === 0) break;

      for (const photo of photos) {
        if (collected.length >= categoryConfig.perCategory) break;
        if (!photo?.id || seenIds.has(photo.id)) continue;

        const src =
          photo.src?.large ||
          photo.src?.medium ||
          photo.src?.landscape ||
          photo.src?.original;

        if (!src) continue;

        seenIds.add(photo.id);
        collected.push({
          id: photo.id,
          url: src,
          alt: sanitizeAlt(photo.alt),
        });
      }

      page += 1;
      await sleep(REQUEST_DELAY_MS);
    }

    page = 1;
    if (collected.length >= categoryConfig.perCategory) break;
  }

  return collected;
}

async function main() {
  loadEnvFile();

  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    console.error("✗ PEXELS_API_KEY не найден. Добавь ключ в .env (см. .env.example).");
    process.exit(1);
  }

  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.error("✗ Пакет sharp не установлен. Запусти: npm install --save-dev sharp");
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Удаляем старые webp, сохраняем manifest до перезаписи
  for (const name of fs.readdirSync(OUT_DIR)) {
    if (name.endsWith(".webp")) {
      fs.unlinkSync(path.join(OUT_DIR, name));
    }
  }

  const seenIds = new Set();
  const manifest = [];
  let globalIndex = 0;
  let failures = 0;

  console.log("→ Загрузка attention assets с Pexels...\n");

  for (const categoryConfig of CATEGORIES) {
    console.log(`• ${categoryConfig.category} (target: ${categoryConfig.perCategory})`);

    let photos = [];
    try {
      photos = await collectCategoryPhotos(apiKey, categoryConfig, seenIds);
    } catch (error) {
      console.warn(`  ⚠ Category failed: ${error.message}`);
      continue;
    }

    let saved = 0;

    for (const photo of photos) {
      globalIndex += 1;
      const fileName = `${categoryConfig.category}-${String(saved + 1).padStart(3, "0")}.webp`;
      const destPath = path.join(OUT_DIR, fileName);

      try {
        const buffer = await fetchImageBuffer(photo.url);
        const aspect = await saveOptimizedWebp(sharp, buffer, destPath);

        manifest.push({
          src: `/attention-assets/${fileName}`,
          category: categoryConfig.category,
          alt: photo.alt,
          aspect,
        });

        saved += 1;
        process.stdout.write(`  ✓ ${fileName}\n`);
      } catch (error) {
        failures += 1;
        console.warn(`  ⚠ Skip photo ${photo.id}: ${error.message}`);
      }

      await sleep(120);
    }

    console.log(`  → saved ${saved}/${categoryConfig.perCategory}\n`);
  }

  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log("—".repeat(48));
  console.log(`✓ Total images: ${manifest.length}`);
  console.log(`✓ Manifest: public/attention-assets/manifest.json`);
  if (failures > 0) {
    console.log(`⚠ Failed downloads: ${failures}`);
  }

  if (manifest.length < 50) {
    console.warn(
      "⚠ Мало изображений (<50). Проверь API key, лимиты Pexels или интернет.",
    );
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("✗ Fatal error:", error.message);
  process.exit(1);
});
