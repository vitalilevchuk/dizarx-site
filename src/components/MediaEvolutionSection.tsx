import Image from "next/image";
import { ArrowRight } from "lucide-react";
import CosmicBackground from "./CosmicBackground";
import { heroProjects, mediaEvolutionSection } from "@/data/siteContent";
import type { LucideIcon } from "lucide-react";
import "./MediaEvolutionSection.css";

/** Pipeline — одинаковые круги слева и справа */
function EvolutionPipeline({
  steps,
}: {
  steps: { label: string; icon: LucideIcon }[];
}) {
  return (
    <div className="media-evolution__pipeline">
      <div className="media-evolution__pipeline-track" aria-hidden="true">
        <span className="media-evolution__pipeline-line" />
      </div>
      <div className="media-evolution__pipeline-steps">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="media-evolution__pipeline-step">
              <div className="media-evolution__pipeline-icon">
                <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <span className="media-evolution__pipeline-label">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Компактная карточка проекта */
function ProjectTile({
  name,
  src,
  views,
}: {
  name: string;
  src: string;
  views: string;
}) {
  return (
    <div className="media-evolution__project-tile">
      <div className="media-evolution__project-tile-icon">
        <Image src={src} alt={name} width={36} height={36} className="object-cover" />
      </div>
      <div className="media-evolution__project-tile-body">
        <span className="media-evolution__project-tile-name">{name}</span>
        <span className="media-evolution__project-tile-views">{views}</span>
      </div>
    </div>
  );
}

/** Media Asset → Product Media System */
export default function MediaEvolutionSection() {
  const data = mediaEvolutionSection;
  const asset = data.mediaAsset;
  const system = data.productSystem;

  const gridProjects = asset.gridProjectNames
    .map((name) => heroProjects.find((p) => p.name === name))
    .filter(Boolean) as typeof heroProjects;

  return (
    <section id="what-we-do" className="media-evolution orbital-bg relative">
      <CosmicBackground variant="subtle" />

      <div className="media-evolution__shell section-shell relative z-10">
        <header className="media-evolution__header">
          <h2 className="media-evolution__title">
            {data.headlineWhite}
            <span className="media-evolution__title-accent">
              {" "}
              {data.headlineAccent}
            </span>
          </h2>
          <p className="media-evolution__subtitle">{data.subtitle}</p>
        </header>

        <div className="media-evolution__compare">
          <article className="media-evolution__panel media-evolution__panel--asset">
            <div className="media-evolution__panel-head">
              <p className="media-evolution__panel-label">{asset.label}</p>
              <p className="media-evolution__panel-desc">{asset.description}</p>
            </div>

            <EvolutionPipeline steps={asset.steps} />

            <div className="media-evolution__panel-body">
              <div className="media-evolution__projects-grid">
                {gridProjects.map((project) => (
                  <ProjectTile
                    key={project.name}
                    name={project.name}
                    src={project.src}
                    views={project.views}
                  />
                ))}
                <div className="media-evolution__aggregate-metric">
                  <span className="media-evolution__metric-value">
                    {asset.aggregateMetricValue}
                  </span>
                  <span className="media-evolution__metric-label">
                    {asset.aggregateMetricLabel}
                  </span>
                </div>
              </div>
            </div>
          </article>

          <div className="media-evolution__bridge" aria-hidden="true">
            <span className="media-evolution__bridge-glow" />
            <p className="media-evolution__bridge-text">
              {data.bridgeTextBefore}{" "}
              <span className="media-evolution__bridge-accent">
                {data.bridgeTextAccent}
              </span>
            </p>
            <ArrowRight className="media-evolution__bridge-arrow" size={15} />
          </div>

          <article className="media-evolution__panel media-evolution__panel--system">
            <div className="media-evolution__panel-atmosphere" aria-hidden="true" />

            <div className="media-evolution__panel-head">
              <p className="media-evolution__panel-label">{system.label}</p>
              <p className="media-evolution__panel-desc">{system.description}</p>
            </div>

            <EvolutionPipeline steps={system.steps} />

            <div className="media-evolution__panel-body media-evolution__panel-body--system">
              <div className="media-evolution__panel-footer media-evolution__panel-footer--outcome">
                <p className="media-evolution__outcome">{system.outcomeText}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
