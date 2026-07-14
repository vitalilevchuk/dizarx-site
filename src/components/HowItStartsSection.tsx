import { ArrowRight } from "lucide-react";
import CosmicBackground from "./CosmicBackground";
import OrbitalIcon from "./OrbitalIcon";
import { howItStartsSection, howItStartsSteps } from "@/data/siteContent";
import "./HowItStartsSection.css";

/** HOW IT STARTS — timeline процесса */
export default function HowItStartsSection() {
  const data = howItStartsSection;

  return (
    <section id="process" className="how-it-starts orbital-bg relative">
      <CosmicBackground />

      <div className="how-it-starts__shell section-shell relative z-10">
        <header className="how-it-starts__header">
          <p className="how-it-starts__label how-it-starts__label--empty" aria-hidden="true" />
          <h2 className="how-it-starts__title">
            {data.headlineWhite}
            <span className="how-it-starts__title-accent">
              {data.headlineAccent}
            </span>
          </h2>
          <p className="how-it-starts__subtitle">{data.subtitle}</p>
        </header>

        {/* Desktop timeline */}
        <div className="how-it-starts__timeline how-it-starts__timeline--desktop">
          <div className="how-it-starts__timeline-track" aria-hidden="true">
            <span className="how-it-starts__timeline-line" />
            <ArrowRight
              className="how-it-starts__timeline-arrow"
              size={14}
              strokeWidth={1.75}
            />
          </div>

          <ol className="how-it-starts__steps">
            {howItStartsSteps.map((step) => (
              <li key={step.number} className="how-it-starts__step">
                <span className="how-it-starts__step-number">{step.number}</span>
                <OrbitalIcon Icon={step.icon} size="md" />
                <h3 className="how-it-starts__step-title">{step.title}</h3>
                <p className="how-it-starts__step-desc">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile timeline */}
        <ol className="how-it-starts__steps how-it-starts__steps--mobile">
          {howItStartsSteps.map((step) => (
            <li key={step.number} className="how-it-starts__step-mobile">
              <div className="how-it-starts__step-mobile-icon">
                <span className="how-it-starts__step-number">{step.number}</span>
                <OrbitalIcon Icon={step.icon} size="sm" />
              </div>
              <div>
                <h3 className="how-it-starts__step-title">{step.title}</h3>
                <p className="how-it-starts__step-desc">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
