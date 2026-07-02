"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { attentionPupilFrames } from "@/data/attentionPupilFrames";
import AttentionDayCycleTimer from "./AttentionDayCycleTimer";

/** Натуральный размер eye.png — для canvas без letterbox-сдвига */
export const ATTENTION_EYE_NATURAL = { w: 1536, h: 1024 } as const;

/** Позиция зрачка относительно eye-canvas (по анализу eye.png) */
export const ATTENTION_PUPIL = {
  x: "50%",
  y: "47.56%",
  /** Чуть меньше чёрного зрачка — эффект не выходит за край */
  size: "24.5%",
  /** Объект внутри зрачка — своя форма через contain */
  objectSize: "90%",
  /** Сдвиг объекта вверх — визуальный центр зрачка */
  objectOffsetY: "-9%",
} as const;

const INTERVAL_MIN_MS = 240;
const INTERVAL_MAX_MS = 420;

/** Перемешиваем индексы без повтора первого после прошлого раунда */
function shuffledPool(length: number, avoidFirst?: number): number[] {
  const pool = Array.from({ length }, (_, i) => i);
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  if (
    avoidFirst !== undefined &&
    pool.length > 1 &&
    pool[0] === avoidFirst
  ) {
    [pool[0], pool[1]] = [pool[1], pool[0]];
  }
  return pool;
}

function randomIntervalMs(): number {
  return (
    INTERVAL_MIN_MS +
    Math.floor(Math.random() * (INTERVAL_MAX_MS - INTERVAL_MIN_MS + 1))
  );
}

interface AttentionEyeVisualProps {
  eyeSrc: string;
  eyeSizePx?: number;
}

/** Глаз + смена объектов в зрачке — бренды, продукты, мысли за сутки */
export default function AttentionEyeVisual({
  eyeSrc,
}: AttentionEyeVisualProps) {
  const frames: readonly string[] = attentionPupilFrames;

  const poolRef = useRef<number[]>([]);
  const poolCursorRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);
  const showARef = useRef(true);
  const timerRef = useRef<number | null>(null);

  const [frameA, setFrameA] = useState(0);
  const [frameB, setFrameB] = useState(frames.length > 1 ? 1 : 0);
  const [showA, setShowA] = useState(true);
  /** Анимация только на клиенте — без hydration mismatch */
  const [isRunning, setIsRunning] = useState(false);

  const pupilStyle = useMemo(
    () =>
      ({
        "--pupil-x": ATTENTION_PUPIL.x,
        "--pupil-y": ATTENTION_PUPIL.y,
        "--pupil-size": ATTENTION_PUPIL.size,
        "--pupil-object-size": ATTENTION_PUPIL.objectSize,
        "--pupil-object-offset-y": ATTENTION_PUPIL.objectOffsetY,
      }) as React.CSSProperties,
    [],
  );

  const nextFrameIndex = useCallback((): number => {
    if (frames.length === 0) return 0;
    if (frames.length === 1) return 0;

    if (
      poolRef.current.length === 0 ||
      poolCursorRef.current >= poolRef.current.length
    ) {
      poolRef.current = shuffledPool(
        frames.length,
        lastFrameRef.current ?? undefined,
      );
      poolCursorRef.current = 0;
    }

    const index = poolRef.current[poolCursorRef.current] ?? 0;
    poolCursorRef.current += 1;
    lastFrameRef.current = index;
    return index;
  }, [frames.length]);

  const scheduleNext = useCallback(
    function tick() {
      if (frames.length <= 1) return;

      const next = nextFrameIndex();
      const showingA = showARef.current;

      if (showingA) {
        setFrameB(next);
      } else {
        setFrameA(next);
      }

      showARef.current = !showingA;
      setShowA(showARef.current);

      timerRef.current = window.setTimeout(tick, randomIntervalMs());
    },
    [frames.length, nextFrameIndex],
  );

  // Прелоад + старт цикла только на клиенте
  useEffect(() => {
    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    if (frames.length <= 1) return undefined;

    setIsRunning(true);
    poolRef.current = shuffledPool(frames.length);
    poolCursorRef.current = 0;
    timerRef.current = window.setTimeout(scheduleNext, randomIntervalMs());

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [frames, scheduleNext]);

  return (
    <div className="am-section__eye-stack">
      <div
        className="am-section__eye-canvas"
        style={{
          aspectRatio: `${ATTENTION_EYE_NATURAL.w} / ${ATTENTION_EYE_NATURAL.h}`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={eyeSrc}
          alt=""
          className="am-section__eye-img"
          width={ATTENTION_EYE_NATURAL.w}
          height={ATTENTION_EYE_NATURAL.h}
          draggable={false}
        />

        {/* Перекраска радужки — маска кольца + mix-blend-mode: color */}
        <div className="am-section__eye-iris-tint" aria-hidden="true" />

        {frames.length > 0 && (
          <div className="am-section__pupil-slot" style={pupilStyle}>
            <div className="am-section__pupil-stage">
              <div className="am-section__pupil-object-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={frames[frameA]}
                  alt=""
                  className={`am-section__pupil-object${showA || !isRunning ? " am-section__pupil-object--visible" : ""}`}
                  draggable={false}
                />
                {frames.length > 1 && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={frames[frameB]}
                    alt=""
                    className={`am-section__pupil-object${!showA && isRunning ? " am-section__pupil-object--visible" : ""}`}
                    draggable={false}
                  />
                )}
              </div>
            </div>
            {/* Слои «глаз видит отражение» — свет, стекло, блик */}
            <div className="am-section__pupil-lens" aria-hidden="true">
              <span className="am-section__pupil-lens__sheen" />
              <span className="am-section__pupil-lens__specular" />
              <span className="am-section__pupil-lens__rim" />
            </div>
          </div>
        )}
      </div>
      <AttentionDayCycleTimer />
    </div>
  );
}
