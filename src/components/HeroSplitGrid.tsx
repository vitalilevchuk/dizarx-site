"use client";

import { ArrowRight } from "lucide-react";
import HeroProof from "./HeroProof";
import { heroContent } from "@/data/siteContent";

/** Hero — левый оффер + правая орбита */
export default function HeroSplitGrid() {
  return (
    <div className="hero-split-grid">
      <div className="hero-split-offer">
        <h1 className="hero-split-title">
          {heroContent.titleLines.map((line, index) => (
            <span
              key={line}
              className={
                index === heroContent.gradientLineIndex
                  ? "hero-title-gradient block"
                  : "block"
              }
            >
              {line}
            </span>
          ))}
        </h1>

        <p className="hero-split-subtitle">{heroContent.subtitle}</p>

        <div className="hero-split-actions">
          <a href={heroContent.primaryCta.href} className="hero-btn-primary">
            {heroContent.primaryCta.label}
            <ArrowRight size={15} strokeWidth={2} />
          </a>
          <a
            href={heroContent.secondaryCta.href}
            className="hero-btn-secondary"
          >
            {heroContent.secondaryCta.label}
          </a>
        </div>
      </div>

      <div className="hero-split-proof">
        <HeroProof />
      </div>
    </div>
  );
}
