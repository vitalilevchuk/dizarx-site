"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Горизонтальная карусель со snap — только mobile UX */
export default function MobileSnapCarousel({
  children,
  ariaLabel,
  showHint = true,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  showHint?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  const updateIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.querySelectorAll<HTMLElement>("[data-mobile-slide]");
    setSlideCount(slides.length);
    if (!slides.length) return;

    const trackRect = track.getBoundingClientRect();
    const centerX = trackRect.left + trackRect.width * 0.42;
    let closest = 0;
    let minDist = Infinity;

    slides.forEach((slide, i) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const dist = Math.abs(slideCenter - centerX);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateIndex();
    track.addEventListener("scroll", updateIndex, { passive: true });
    window.addEventListener("resize", updateIndex);
    return () => {
      track.removeEventListener("scroll", updateIndex);
      window.removeEventListener("resize", updateIndex);
    };
  }, [updateIndex, children]);

  return (
    <div className="mobile-carousel">
      <div
        ref={trackRef}
        className="mobile-carousel__track"
        aria-label={ariaLabel}
        role="region"
      >
        {children}
      </div>

      {showHint && slideCount > 1 ? (
        <div className="mobile-carousel__footer">
          <div className="mobile-carousel__dots" aria-hidden="true">
            {Array.from({ length: slideCount }).map((_, i) => (
              <span
                key={i}
                className={`mobile-carousel__dot${i === activeIndex ? " is-active" : ""}`}
              />
            ))}
          </div>
          <span className="mobile-carousel__hint">SWIPE →</span>
        </div>
      ) : null}
    </div>
  );
}

/** Одна карточка в mobile-карусели */
export function MobileCarouselSlide({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-mobile-slide
      className={`mobile-carousel__slide ${className}`.trim()}
    >
      {children}
    </div>
  );
}
