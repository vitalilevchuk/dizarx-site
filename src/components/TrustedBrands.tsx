import CosmicBackground from "./CosmicBackground";
import {
  trustedBrands,
  trustedBrandsSection,
  type LogoDisplayMode,
} from "@/data/siteContent";

/** Внутренняя плашка под лого по режиму контраста */
function getLogoInnerClass(mode: LogoDisplayMode): string {
  const base = "logoInner";
  switch (mode) {
    case "badgeDark":
      return `${base} logoInnerBadgeDark`;
    case "badgeLight":
      return `${base} logoInnerBadgeLight`;
    case "boxed":
      return `${base} logoInnerBoxed`;
    default:
      return `${base} logoInnerTransparent`;
  }
}

/** Trusted brands — inner badge для low-contrast лого + marquee */
export default function TrustedBrands() {
  const items = [...trustedBrands, ...trustedBrands];

  return (
    <section
      id="trusted-brands"
      className="trusted-brands-teaser orbital-bg relative z-20 -mt-9 overflow-visible pb-5 pt-4 md:-mt-10 md:pb-6 md:pt-5"
    >
      <CosmicBackground variant="subtle" />

      <div className="section-shell relative z-10">
        <div className="relative pt-3">
          <div className="absolute top-0 left-6 z-30 flex -translate-y-1/2 items-center gap-2 rounded-md border border-[rgba(110,168,255,0.25)] bg-[var(--bg-secondary)] px-3 py-1 md:left-8 md:px-4 md:py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-[var(--accent-blue)] md:h-2 md:w-2" />
            <span className="section-label !text-[0.6rem] md:!text-[0.65rem]">
              {trustedBrandsSection.label}
            </span>
          </div>

          <div className="glass-card glow-border relative overflow-hidden rounded-2xl py-4 md:py-5">
            <div className="trustedBrandsMarquee mt-1">
              <div className="trustedBrandsTrack">
                {items.map((brand, i) => (
                  <div key={`${brand.name}-${i}`} className="trustedLogoCard">
                    <div className={getLogoInnerClass(brand.mode)}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={brand.src}
                        alt={brand.name}
                        style={{ transform: `scale(${brand.scale ?? 1})` }}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
