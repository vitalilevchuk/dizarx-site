"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { heroProjects, heroStats } from "@/data/siteContent";

const LEVITATE_DELAY = [
  "",
  "hero-proof__card-float--d1",
  "hero-proof__card-float--d2",
  "hero-proof__card-float--d3",
  "hero-proof__card-float--d4",
];

const DOT_COUNT = 24;
const DOT_START = -60;
/** Ручной сдвиг орбиты вниз от авто-центра (px) */
const ORBIT_NUDGE_Y = 10;
/** ЭКСПЕРИМЕНТ: +px к размеру глаза. Откат — поставь 0 */
const EYE_SIZE_BONUS_PX = 200;

/** Карточка на орбите — левитация иконки + бейджа, медленный дрейф по кольцу */
function OrbitCard({
  project,
  index,
}: {
  project: (typeof heroProjects)[number];
  index: number;
}) {
  return (
    <div
      className="hero-proof__card"
      style={{ "--a": `${project.orbitAngle}deg` } as React.CSSProperties}
    >
      <div className="hero-proof__card-level">
        <div className={`hero-proof__card-float ${LEVITATE_DELAY[index]}`}>
          <div className="hero-proof__stack hero-proof__stack--col">
            <div className="hero-proof__card-img">
              <Image
                src={project.src}
                alt={project.name}
                fill
                className="object-cover"
                sizes="62px"
                priority
              />
            </div>
            <span className="hero-proof__badge">{project.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

type HeroProofLayout = {
  height?: number;
  canvasOffset?: number;
};

/** Правая зона hero — орбита; центр совпадает с серединой левого контент-блока */
export default function HeroProof() {
  const offerSyncRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<HeroProofLayout>({});
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    const proofEl = offerSyncRef.current;
    const grid = proofEl?.closest(".hero-split-grid");
    const offer = grid?.querySelector(".hero-split-offer") as HTMLElement | null;
    const actions = grid?.querySelector(".hero-split-actions") as HTMLElement | null;
    if (!proofEl || !offer || !actions) return;

    let raf = 0;

    const applyCanvasMetrics = (canvas: HTMLElement) => {
      const size = canvas.offsetWidth;
      if (size <= 0) return false;

      canvas.style.setProperty(
        "--eye",
        `${Math.round(Math.min(size * 0.72, 420) + EYE_SIZE_BONUS_PX)}px`,
      );
      canvas.style.setProperty(
        "--orbit",
        `${Math.round(Math.min(size * 0.5, 300))}px`,
      );
      canvas.style.setProperty(
        "--card",
        `${Math.round(Math.min(size * 0.102, 62))}px`,
      );
      return true;
    };

    const sync = () => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const canvas = proofEl.querySelector(
        ".hero-proof__canvas",
      ) as HTMLElement | null;

      if (!desktop) {
        proofEl.style.removeProperty("height");
        setLayout({});
        if (canvas) applyCanvasMetrics(canvas);
        return;
      }

      const height = offer.offsetHeight;
      proofEl.style.height = `${height}px`;

      if (!canvas) {
        setLayout({ height });
        return;
      }

      // Середина между верхом оффера (eyebrow + headline…) и низом CTA
      const offerRect = offer.getBoundingClientRect();
      const actionsRect = actions.getBoundingClientRect();
      const contentMidY = (offerRect.top + actionsRect.bottom) / 2;

      const proofRect = proofEl.getBoundingClientRect();
      const canvasOffset =
        contentMidY - proofRect.top - canvas.offsetHeight / 2 + ORBIT_NUDGE_Y;

      applyCanvasMetrics(canvas);

      setLayout({ height, canvasOffset });
    };

    const finish = () => {
      sync();
      raf = requestAnimationFrame(() => {
        sync();
        const canvas = proofEl.querySelector(
          ".hero-proof__canvas",
        ) as HTMLElement | null;
        if (canvas && applyCanvasMetrics(canvas)) {
          setIsReady(true);
        }
      });
    };

    finish();
    const ro = new ResizeObserver(finish);
    ro.observe(offer);
    ro.observe(actions);
    window.addEventListener("resize", finish);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", finish);
    };
  }, []);

  const dots = Array.from(
    { length: DOT_COUNT },
    (_, i) => DOT_START + (360 / DOT_COUNT) * i,
  );

  const proofStyle = {
    ...(layout.height ? { height: layout.height } : {}),
    ...(layout.canvasOffset !== undefined
      ? ({ "--canvas-offset": `${layout.canvasOffset}px` } as React.CSSProperties)
      : {}),
  };

  return (
    <div
      ref={offerSyncRef}
      className={`hero-proof${isReady ? " hero-proof--ready" : ""}`}
      style={proofStyle}
    >
      <div className="hero-proof__canvas">
        {/* Кольцо */}
        <div className="hero-proof__ring" aria-hidden="true" />

        {/* Точки на орбите */}
        {dots.map((deg, i) => (
          <span
            key={deg}
            className="hero-proof__dot"
            style={
              {
                "--a": `${deg}deg`,
                animationDelay: `${(i % 8) * 0.3}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Глаз + метрики */}
        <div className="hero-proof__eye">
          <div className="hero-proof__eye-inner hero-proof__eye--float">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/orb-sphere.png"
            alt=""
            className="hero-proof__eye-img"
            draggable={false}
          />
          <div className="hero-proof__eye-shade" aria-hidden="true" />
          <div className="hero-proof__stats">
            <div className="hero-proof__stats-scrim" aria-hidden="true" />
            {heroStats.map((s, i) => (
              <div key={s.label} className="hero-proof__stat">
                <span className="hero-proof__stat-val">{s.value}</span>
                <span className="hero-proof__stat-lbl">{s.label}</span>
                {i < heroStats.length - 1 && (
                  <span className="hero-proof__stat-line" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
          </div>
        </div>

        {/* Проекты — медленное вращение по орбите */}
        <div className="hero-proof__orbit-track">
          {heroProjects.map((p, i) => (
            <OrbitCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
