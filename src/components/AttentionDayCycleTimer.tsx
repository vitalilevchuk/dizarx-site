"use client";

import { useEffect, useRef } from "react";
import { attentionMemorySection } from "@/data/siteContent";

/** 24 часа внимания за 2 минуты */
const CYCLE_MS = 120_000;
const DAY_SECONDS = 24 * 60 * 60;

/** HH:MM:SS из непрерывного времени суток */
function formatDayTime(totalSeconds: number): string {
  const clamped = Math.min(Math.max(totalSeconds, 0), DAY_SECONDS - 0.001);
  const h = Math.floor(clamped / 3600);
  const m = Math.floor((clamped % 3600) / 60);
  const s = Math.floor(clamped % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Концептуальный 24-часовой цикл внимания под глазом */
export default function AttentionDayCycleTimer() {
  const timeRef = useRef<HTMLParagraphElement>(null);
  const startedAtRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    startedAtRef.current = performance.now();

    const tick = (now: number) => {
      const startedAt = startedAtRef.current ?? now;
      const elapsed = (now - startedAt) % CYCLE_MS;
      const totalSec = (elapsed / CYCLE_MS) * DAY_SECONDS;

      if (timeRef.current) {
        timeRef.current.textContent = formatDayTime(totalSec);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="am-section__day-timer-wrap">
      <p className="am-section__day-timer-label">
        {attentionMemorySection.timerLabel}
      </p>
      <p ref={timeRef} className="am-section__day-timer" aria-live="off">
        00:00:00
      </p>
    </div>
  );
}
