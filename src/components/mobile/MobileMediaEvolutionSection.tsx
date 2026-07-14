"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import CosmicBackground from "../CosmicBackground";
import {
  AssetStepReveal,
  EvolutionPipeline,
  SystemStepReveal,
} from "../mediaEvolution/evolutionParts";
import { heroProjects, mediaEvolutionSection } from "@/data/siteContent";
import "../MediaEvolutionSection.css";
import "./MobileMediaEvolutionSection.css";

/** Mobile: тот же контент что desktop, текст + finger-scroll карточки */
export default function MobileMediaEvolutionSection() {
  const data = mediaEvolutionSection;
  const asset = data.mediaAsset;
  const system = data.productSystem;
  const defaultStepId = "content";
  const [activeAssetStep, setActiveAssetStep] = useState(defaultStepId);
  const [activeSystemStep, setActiveSystemStep] = useState(defaultStepId);

  const gridProjects = asset.gridProjectNames
    .map((name) => heroProjects.find((p) => p.name === name))
    .filter(Boolean) as typeof heroProjects;

  return (
    <section id="what-we-do" className="mobile-media-evolution orbital-bg relative md:hidden">
      <CosmicBackground variant="subtle" />

      <div className="mobile-media-evolution__layout section-shell relative z-10">
        <header className="mobile-media-evolution__header media-evolution__header">
          <h2 className="media-evolution__title">
            {data.headlineWhite}
            <span className="media-evolution__title-accent">
              {" "}
              {data.headlineAccent}
            </span>
          </h2>
          <p className="media-evolution__subtitle">{data.subtitle}</p>
        </header>

        <div
          className="mobile-media-evolution__track"
          role="region"
          aria-label="Media asset and product media system"
        >
          <article className="mobile-media-evolution__slide media-evolution__panel media-evolution__panel--asset">
            <div className="media-evolution__panel-head">
              <p className="media-evolution__panel-label">{asset.label}</p>
              <p className="media-evolution__panel-desc">{asset.description}</p>
            </div>

            <EvolutionPipeline
              steps={asset.steps}
              activeStepId={activeAssetStep}
              onStepHover={setActiveAssetStep}
              defaultStepId={defaultStepId}
            />

            <div className="media-evolution__panel-body media-evolution__panel-body--interactive">
              <div className="media-evolution__value-slot">
                <AssetStepReveal stepId={activeAssetStep} projects={gridProjects} />
              </div>
            </div>
          </article>

          <div
            className="mobile-media-evolution__bridge media-evolution__bridge"
            aria-hidden="true"
          >
            <span className="media-evolution__bridge-glow" />
            <p className="media-evolution__bridge-text">
              {data.bridgeTextBefore}
              <br />
              <span className="media-evolution__bridge-accent">
                {data.bridgeTextAccent}
              </span>
            </p>
            <ArrowRight className="media-evolution__bridge-arrow" size={15} />
          </div>

          <article className="mobile-media-evolution__slide media-evolution__panel media-evolution__panel--system">
            <div className="media-evolution__panel-atmosphere" aria-hidden="true" />

            <div className="media-evolution__panel-head">
              <p className="media-evolution__panel-label">{system.label}</p>
              <p className="media-evolution__panel-desc">{system.description}</p>
            </div>

            <EvolutionPipeline
              steps={system.steps}
              activeStepId={activeSystemStep}
              onStepHover={setActiveSystemStep}
              defaultStepId={defaultStepId}
            />

            <div className="media-evolution__panel-body media-evolution__panel-body--interactive">
              <div className="media-evolution__value-slot">
                <SystemStepReveal stepId={activeSystemStep} />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
