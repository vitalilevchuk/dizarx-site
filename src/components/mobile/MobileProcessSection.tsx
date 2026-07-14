import MobileSnapCarousel, { MobileCarouselSlide } from "./MobileSnapCarousel";
import { howItStartsSteps } from "@/data/siteContent";
import { mobileProcess } from "@/data/mobileContent";

/** Mobile Process — horizontal swipe steps */
export default function MobileProcessSection() {
  return (
    <section id="process" className="mobile-section mobile-process md:hidden">
      <header className="mobile-section__header section-shell">
        <h2 className="mobile-section__title">{mobileProcess.title}</h2>
        <p className="mobile-section__subtitle">{mobileProcess.subtitle}</p>
      </header>

      <MobileSnapCarousel ariaLabel="Growth process">
        {howItStartsSteps.map((step) => {
          const Icon = step.icon;
          return (
            <MobileCarouselSlide key={step.number}>
              <article className="mobile-glass-card mobile-process__card">
                <div className="mobile-process__top">
                  <span className="mobile-process__number">{step.number}</span>
                  <span className="mobile-process__icon">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                </div>
                <h3 className="mobile-process__title">{step.title}</h3>
                <p className="mobile-process__desc">{step.description}</p>
              </article>
            </MobileCarouselSlide>
          );
        })}
      </MobileSnapCarousel>
    </section>
  );
}
