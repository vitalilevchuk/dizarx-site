import CosmicBackground from "./CosmicBackground";
import HeroSplitGrid from "./HeroSplitGrid";

/** Hero — split layout: offer слева, proof orbit справа */
export default function Hero() {
  return (
    <section className="orbital-bg hero-split relative flex min-h-[100svh] flex-col overflow-x-hidden overflow-y-visible pt-16 pb-0 md:pt-[4.5rem]">
      <CosmicBackground variant="hero" />

      <div className="hero-split-shell relative z-10 flex flex-1 flex-col">
        <HeroSplitGrid />
      </div>
    </section>
  );
}
