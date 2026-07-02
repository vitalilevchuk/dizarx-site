import { Sparkles } from "lucide-react";
import OrbitalIcon from "./OrbitalIcon";
import CosmicBackground from "./CosmicBackground";
import {
  whoWeWorkWithCards,
  whoWeWorkWithSection,
} from "@/data/siteContent";

/** Секция целевых клиентов — 2x2 grid */
export default function WhoWeWorkWith() {
  return (
    <section
      id="who-we-work-with"
      className="orbital-bg relative py-20 md:py-28"
    >
      <CosmicBackground variant="subtle" />

      <div className="section-shell relative z-10">
        {/* Header */}
        <div className="mb-12 flex items-start gap-4 md:mb-16">
          <div className="mt-2 h-16 w-px bg-gradient-to-b from-[var(--accent-blue)] to-transparent" />
          <div>
            <span className="section-label">{whoWeWorkWithSection.label}</span>
            <h2 className="mt-3 text-2xl font-bold uppercase tracking-wide text-white md:text-3xl lg:text-4xl">
              {whoWeWorkWithSection.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              {whoWeWorkWithSection.subtitle}
            </p>
          </div>
        </div>

        {/* 2x2 cards */}
        <div className="grid gap-5 md:grid-cols-2">
          {whoWeWorkWithCards.map((card) => (
            <div
              key={card.number}
              className="glass-card card-hover glow-border flex gap-5 rounded-2xl p-6 md:gap-6 md:p-8"
            >
              <OrbitalIcon Icon={card.icon} size="md" className="shrink-0" />
              <div>
                <span className="text-sm font-medium text-[var(--accent-blue)]">
                  {card.number}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom statement pill */}
        <div className="glass-card glow-border mt-8 flex items-center gap-3 rounded-full px-6 py-4 md:mt-10 md:px-8 md:py-5">
          <Sparkles
            size={18}
            className="shrink-0 text-[var(--accent-blue)]"
            strokeWidth={1.5}
          />
          <p className="text-sm text-[var(--text-secondary)] md:text-base">
            {whoWeWorkWithSection.bottomStatement}
          </p>
        </div>
      </div>
    </section>
  );
}
