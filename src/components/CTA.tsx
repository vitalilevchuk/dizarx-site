import { ArrowRight } from "lucide-react";
import CosmicBackground from "./CosmicBackground";
import { ctaSection } from "@/data/siteContent";

/** Финальный CTA-блок */
export default function CTA() {
  return (
    <section id="contact" className="orbital-bg relative py-20 md:py-28">
      <CosmicBackground />

      <div className="section-shell relative z-10">
        <div className="glass-card glow-border mx-auto max-w-3xl rounded-3xl px-8 py-14 text-center md:px-12 md:py-16">
          <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
            {ctaSection.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
            {ctaSection.subtitle}
          </p>
          <a
            href={ctaSection.button.href}
            className="btn-primary mt-8 inline-flex"
          >
            {ctaSection.button.label}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
