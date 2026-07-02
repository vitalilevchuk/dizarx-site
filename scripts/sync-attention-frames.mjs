/**
 * Копирует картинки из «100 картинок для глаза» → public/assets/attention-frames
 * и генерирует src/data/attentionPupilFrames.ts (кроме eye_attention.png).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "100 картинок для глаза");
const DST_DIR = path.join(ROOT, "public/assets/attention-frames");
const MANIFEST = path.join(ROOT, "src/data/attentionPupilFrames.ts");

const EXCLUDE = new Set(["eye_attention.png", "eye_attention.PNG", ".DS_Store"]);
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

function isImage(fileName) {
  return IMAGE_EXT.has(path.extname(fileName).toLowerCase());
}

function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Папка не найдена: ${SRC_DIR}`);
    process.exit(1);
  }

  fs.mkdirSync(DST_DIR, { recursive: true });

  const sourceFiles = fs
    .readdirSync(SRC_DIR)
    .filter((name) => !EXCLUDE.has(name) && isImage(name))
    .sort((a, b) => a.localeCompare(b, "ru"));

  if (sourceFiles.length === 0) {
    console.warn("Нет картинок для зрачка (кроме eye_attention.png).");
  }

  // Очищаем старые frame-* в public
  for (const name of fs.readdirSync(DST_DIR)) {
    if (name.startsWith("frame-")) {
      fs.unlinkSync(path.join(DST_DIR, name));
    }
  }

  const publicPaths = sourceFiles.map((name, index) => {
    const ext = path.extname(name).toLowerCase();
    const frameName = `frame-${String(index + 1).padStart(3, "0")}${ext}`;
    fs.copyFileSync(path.join(SRC_DIR, name), path.join(DST_DIR, frameName));
    return `/assets/attention-frames/${frameName}`;
  });

  const manifestBody = `/** AUTO-GENERATED — npm run sync:eye-frames */
export const attentionPupilFrames = ${JSON.stringify(publicPaths, null, 2)} as const;

export type AttentionPupilFrame = (typeof attentionPupilFrames)[number];
`;

  fs.writeFileSync(MANIFEST, manifestBody, "utf8");

  console.log(`✓ ${publicPaths.length} кадров → public/assets/attention-frames/`);
  console.log(`✓ Манифест: src/data/attentionPupilFrames.ts`);
}

main();
