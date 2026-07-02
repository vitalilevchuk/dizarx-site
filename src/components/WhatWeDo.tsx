import OrbitalIcon from "./OrbitalIcon";
import CosmicBackground from "./CosmicBackground";
import MediaPotentialSection from "./MediaPotentialSection";
import { whatWeDoCards, whatWeDoSection } from "@/data/siteContent";

/** Media Potential + What We Do */
export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="orbital-bg relative overflow-visible pb-20 md:pb-28">
      <CosmicBackground variant="subtle" />

      <MediaPotentialSection />

      <div className="section-shell relative z-10">
        <div className="what-we-do-header mx-auto mb-12 max-w-2xl pt-4 text-center md:mb-16 md:pt-8">
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {whatWeDoSection.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)] md:mt-4 md:text-lg">
            {whatWeDoSection.subtitle}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whatWeDoCards.slice(0, 3).map((card) => (
            <ServiceCard key={card.number} card={card} />
          ))}
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {whatWeDoCards.slice(3).map((card) => (
            <ServiceCard key={card.number} card={card} wide />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  card,
  wide = false,
}: {
  card: (typeof whatWeDoCards)[0];
  wide?: boolean;
}) {
  return (
    <div
      className={`glass-card card-hover glow-border relative rounded-2xl p-6 md:p-8 ${wide ? "md:flex md:items-start md:justify-between md:gap-8" : ""}`}
    >
      <div className={wide ? "flex-1" : ""}>
        <span className="text-sm font-medium text-[var(--accent-blue)]">
          {card.number}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-white md:text-xl">
          {card.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
          {card.description}
        </p>
      </div>
      <div
        className={`${wide ? "mt-6 shrink-0 md:mt-0" : "absolute right-6 top-6 md:right-8 md:top-8"}`}
      >
        <OrbitalIcon Icon={card.icon} size="sm" />
      </div>
    </div>
  );
}
