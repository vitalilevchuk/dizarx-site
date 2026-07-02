import { attentionPupilFrames } from "./attentionPupilFrames";

/** Элемент на орбите вокруг глаза */
export interface AttentionOrbitItem {
  id: string;
  src: string;
  ring: 1 | 2 | 3 | 4;
  /** Угол на кольце, градусы */
  angle: number;
  /** Размер миниатюры, px */
  size: number;
  opacity?: number;
  shape?: "circle" | "rounded" | "square";
}

const mediaPotentialImages = [
  "/assets/media-potential/personality.png",
  "/assets/media-potential/physical.png",
  "/assets/media-potential/digital.png",
  "/assets/media-potential/knowledge.png",
  "/assets/media-potential/experience.png",
] as const;

const projectImages = [
  "/our-projects/meet-arnold.webp",
  "/our-projects/dory.webp",
  "/our-projects/riddle.jpeg",
  "/our-projects/googootunes.jpeg",
  "/our-projects/echoes.jpg",
] as const;

const brandLogos = [
  "/trusted-brands-clean/nordvpn.png",
  "/trusted-brands-clean/skillshare.png",
  "/trusted-brands-clean/wix.png",
  "/trusted-brands-clean/blinkist.png",
  "/trusted-brands-clean/plarium.png",
  "/trusted-brands-clean/pixonic.png",
  "/trusted-brands-clean/eve-online.png",
  "/trusted-brands-clean/ccp-games.png",
] as const;

const crowdImages = [
  ...namDoveryayutImages(),
] as const;

/** Картинки из nam-doveryayut — дополнительный «шум» внимания */
function namDoveryayutImages(): string[] {
  return Array.from({ length: 10 }, (_, i) => `/nam-doveryayut/${i + 1}.png`);
}

/** Собираем набор миниатюр для орбиты */
function buildOrbitItems(): AttentionOrbitItem[] {
  const items: AttentionOrbitItem[] = [];
  let cursor = 0;

  const push = (
    src: string,
    ring: AttentionOrbitItem["ring"],
    angle: number,
    size: number,
    shape: AttentionOrbitItem["shape"] = "rounded",
    opacity = 0.62,
  ) => {
    items.push({
      id: `orbit-${cursor}`,
      src,
      ring,
      angle,
      size,
      shape,
      opacity,
    });
    cursor += 1;
  };

  attentionPupilFrames.forEach((src, index) => {
    push(
      src,
      ((index % 4) + 1) as AttentionOrbitItem["ring"],
      index * 34 + 8,
      46 + (index % 3) * 10,
      "rounded",
      0.58 + (index % 4) * 0.06,
    );
  });

  mediaPotentialImages.forEach((src, index) => {
    push(src, 2, 18 + index * 68, 52, "rounded", 0.55);
  });

  projectImages.forEach((src, index) => {
    push(src, 3, 6 + index * 70, 48, "circle", 0.6);
  });

  brandLogos.forEach((src, index) => {
    push(src, 4, 12 + index * 42, 36, "square", 0.48);
  });

  crowdImages.forEach((src, index) => {
    const ring = ((index % 3) + 2) as AttentionOrbitItem["ring"];
    push(src, ring, 24 + index * 33, 40 + (index % 2) * 8, "rounded", 0.42);
  });

  return items;
}

/** Миниатюры вокруг глаза — «шум» внимания */
export const attentionOrbitItems = buildOrbitItems();
