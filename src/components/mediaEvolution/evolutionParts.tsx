"use client";

import Image from "next/image";
import { heroProjects, mediaEvolutionSection } from "@/data/siteContent";
import type { LucideIcon } from "lucide-react";

type PipelineStep = { id: string; label: string; icon: LucideIcon };

/** Pipeline — интерактивный hover/tap на шагах */
export function EvolutionPipeline({
  steps,
  activeStepId,
  onStepHover,
  defaultStepId,
}: {
  steps: PipelineStep[];
  activeStepId: string;
  onStepHover: (id: string) => void;
  defaultStepId: string;
}) {
  return (
    <div
      className="media-evolution__pipeline"
      onMouseLeave={() => onStepHover(defaultStepId)}
    >
      <div className="media-evolution__pipeline-track" aria-hidden="true">
        <span className="media-evolution__pipeline-line" />
      </div>
      <div className="media-evolution__pipeline-steps">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = activeStepId === step.id;

          return (
            <button
              key={step.id}
              type="button"
              className={`media-evolution__pipeline-step media-evolution__pipeline-step--interactive${isActive ? " is-active" : ""}`}
              onMouseEnter={() => onStepHover(step.id)}
              onFocus={() => onStepHover(step.id)}
              onClick={() => onStepHover(step.id)}
              aria-pressed={isActive}
            >
              <div className="media-evolution__pipeline-icon">
                <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <span className="media-evolution__pipeline-label">{step.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Общий value-блок под pipeline */
function PipelineValueBlock({
  value,
  caption,
  revealKey,
}: {
  value: string;
  caption: string;
  revealKey: string;
}) {
  return (
    <div
      key={revealKey}
      className="media-evolution__reveal media-evolution__reveal--metric"
    >
      <span className="media-evolution__reveal-value">{value}</span>
      <span className="media-evolution__reveal-label">{caption}</span>
    </div>
  );
}

/** Компактный бренд — только иконка и имя */
function BrandChip({ name, src }: { name: string; src: string }) {
  return (
    <div className="media-evolution__brand-chip">
      <div className="media-evolution__brand-chip-icon">
        <Image src={src} alt={name} width={28} height={28} className="object-cover" />
      </div>
      <span className="media-evolution__brand-chip-name">{name}</span>
    </div>
  );
}

/** Hover value-блок для Media Asset */
export function AssetStepReveal({
  stepId,
  projects,
}: {
  stepId: string;
  projects: typeof heroProjects;
}) {
  const asset = mediaEvolutionSection.mediaAsset;

  if (stepId === "content") {
    return (
      <div key="content" className="media-evolution__reveal media-evolution__reveal--brands">
        {projects.map((project) => (
          <BrandChip key={project.name} name={project.name} src={project.src} />
        ))}
      </div>
    );
  }

  if (stepId === "views") {
    return (
      <PipelineValueBlock
        revealKey="views"
        value={asset.aggregateMetricValue}
        caption={asset.aggregateMetricLabel}
      />
    );
  }

  if (stepId === "revenue") {
    return (
      <PipelineValueBlock
        revealKey="revenue"
        value={asset.revenueMetricValue}
        caption={asset.revenueMetricLabel}
      />
    );
  }

  return null;
}

/** Hover value-блок для Product Media System */
export function SystemStepReveal({ stepId }: { stepId: string }) {
  const system = mediaEvolutionSection.productSystem;

  const reveal = system.stepReveals[stepId as keyof typeof system.stepReveals];
  if (!reveal) return null;

  return (
    <PipelineValueBlock
      revealKey={stepId}
      value={reveal.value}
      caption={reveal.caption}
    />
  );
}
