"use client";

import { useEffect, useMemo, useState } from "react";
import AttentionEyeVisual from "./AttentionEyeVisual";
import "./AttentionFieldOrbit.css";

export interface AttentionAssetManifestItem {
  src: string;
  category: string;
  alt: string;
  aspect: "portrait" | "landscape";
}

interface OrbitCardLayout {
  manifestIndex: number;
  ring: 1 | 2 | 3 | 4 | 5;
  angle: number;
  size: number;
  opacity: number;
  blur: number;
  rotation: number;
  depth: "back" | "mid" | "front";
  floatDelay: number;
}

const TARGET_CARD_COUNT = 70;
const RING_DURATIONS: Record<OrbitCardLayout["ring"], string> = {
  1: "360s",
  2: "480s",
  3: "620s",
  4: "760s",
  5: "900s",
};

/** Детерминированный pseudo-random 0..1 из индекса */
function seededUnit(seed: number): number {
  const value = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

/** Раскладка карточек — стабильная между рендерами */
function buildOrbitLayouts(count: number, total: number): OrbitCardLayout[] {
  const layouts: OrbitCardLayout[] = [];
  const step = Math.max(1, Math.floor(total / count));

  for (let i = 0; i < count; i += 1) {
    const manifestIndex = (i * step) % total;
    const seed = manifestIndex + 1;
    const r1 = seededUnit(seed);
    const r2 = seededUnit(seed + 17);
    const r3 = seededUnit(seed + 41);
    const r4 = seededUnit(seed + 73);
    const r5 = seededUnit(seed + 109);

    const ring = (Math.floor(r1 * 5) + 1) as OrbitCardLayout["ring"];
    const depth: OrbitCardLayout["depth"] =
      ring <= 2 ? "back" : ring === 3 ? "mid" : "front";

    layouts.push({
      manifestIndex,
      ring,
      angle: r2 * 360,
      size: Math.round(34 + r3 * 38),
      opacity: 0.28 + r4 * 0.42,
      blur: depth === "back" ? 1.2 + r5 * 1.4 : r5 * 0.8,
      rotation: -14 + r3 * 28,
      depth,
      floatDelay: r4 * 4.5,
    });
  }

  return layouts;
}

/** Одна плавающая карточка */
function OrbitCard({
  item,
  layout,
}: {
  item: AttentionAssetManifestItem;
  layout: OrbitCardLayout;
}) {
  const aspectClass =
    item.aspect === "portrait"
      ? "attention-field-orbit__card--portrait"
      : "attention-field-orbit__card--landscape";

  return (
    <div
      className={`attention-field-orbit__item attention-field-orbit__item--ring-${layout.ring} attention-field-orbit__item--${layout.depth}`}
      style={
        {
          "--angle": `${layout.angle}deg`,
          "--size": `${layout.size}px`,
          "--opacity": layout.opacity.toFixed(3),
          "--blur": `${layout.blur.toFixed(2)}px`,
          "--rotation": `${layout.rotation.toFixed(2)}deg`,
          "--float-delay": `${layout.floatDelay.toFixed(2)}s`,
        } as React.CSSProperties
      }
    >
      <div className="attention-field-orbit__item-inner">
        <div
          className={`attention-field-orbit__card ${aspectClass}`}
          title={item.alt}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={item.alt}
            className="attention-field-orbit__card-img"
            loading="lazy"
            draggable={false}
          />
          <span className="attention-field-orbit__card-overlay" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/** Attention field — manifest-карточки вокруг глаза */
export default function AttentionFieldOrbit({ eyeSrc }: { eyeSrc: string }) {
  const [manifest, setManifest] = useState<AttentionAssetManifestItem[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetch("/attention-assets/manifest.json")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data: AttentionAssetManifestItem[]) => {
        if (!cancelled && Array.isArray(data)) {
          setManifest(data);
        }
      })
      .catch(() => {
        if (!cancelled) setManifest([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const cardCount = Math.min(
    TARGET_CARD_COUNT,
    manifest.length > 0 ? manifest.length : 0,
  );

  const layouts = useMemo(
    () =>
      manifest.length > 0
        ? buildOrbitLayouts(cardCount, manifest.length)
        : [],
    [manifest.length, cardCount],
  );

  const rings: OrbitCardLayout["ring"][] = [1, 2, 3, 4, 5];

  return (
    <div className="attention-field-orbit">
      <div className="attention-field-orbit__backdrop" aria-hidden="true">
        {rings.map((ring) => (
          <span
            key={ring}
            className={`attention-field-orbit__ring attention-field-orbit__ring--${ring}`}
          />
        ))}
        <span className="attention-field-orbit__glow" />
      </div>

      <div className="attention-field-orbit__layers attention-field-orbit__layers--back">
        {rings
          .filter((ring) => ring <= 2)
          .map((ring) => (
            <div
              key={`back-${ring}`}
              className={`attention-field-orbit__layer attention-field-orbit__layer--${ring}`}
              style={
                { "--spin-duration": RING_DURATIONS[ring] } as React.CSSProperties
              }
            >
              {layouts
                .filter((layout) => layout.ring === ring)
                .map((layout) => {
                  const item = manifest[layout.manifestIndex];
                  if (!item) return null;
                  return (
                    <OrbitCard
                      key={`${ring}-${layout.manifestIndex}-${layout.angle}`}
                      item={item}
                      layout={layout}
                    />
                  );
                })}
            </div>
          ))}
      </div>

      <div className="attention-field-orbit__eye">
        <AttentionEyeVisual eyeSrc={eyeSrc} />
      </div>

      <div className="attention-field-orbit__layers attention-field-orbit__layers--front">
        {rings
          .filter((ring) => ring >= 3)
          .map((ring) => (
            <div
              key={`front-${ring}`}
              className={`attention-field-orbit__layer attention-field-orbit__layer--${ring}`}
              style={
                { "--spin-duration": RING_DURATIONS[ring] } as React.CSSProperties
              }
            >
              {layouts
                .filter((layout) => layout.ring === ring)
                .map((layout) => {
                  const item = manifest[layout.manifestIndex];
                  if (!item) return null;
                  return (
                    <OrbitCard
                      key={`${ring}-${layout.manifestIndex}-${layout.angle}`}
                      item={item}
                      layout={layout}
                    />
                  );
                })}
            </div>
          ))}
      </div>
    </div>
  );
}
