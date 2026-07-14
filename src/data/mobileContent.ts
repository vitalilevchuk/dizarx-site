import {
  FlaskConical,
  Layers,
  Lightbulb,
  Repeat,
} from "lucide-react";
import { heroProjects, mediaEvolutionSection } from "./siteContent";

/** Контент и данные только для mobile (<768px) */
export const mobileOurWork = {
  headline: "We learned attention by building media projects.",
  subtitle: "7B+ organic views across media assets we built.",
  summaryCard: {
    label: "MEDIA ASSETS",
    value: "7B+",
    caption: "organic views across media assets",
  },
  /** Проекты в карусели — Echoes включён только для mobile story */
  projectNames: [
    "Riddle",
    "Meet Arnold",
    "Dory Story",
    "GoGo Tunes",
    "Echoes",
  ] as const,
};

export const mobileWhatWeDo = {
  title: "Now we build media systems around products.",
  subtitle:
    "We apply the same attention mechanics to products to create trust and measurable growth.",
  cards: [
    {
      title: "Growth angles",
      description: "Find where your product can win attention.",
      icon: Layers,
    },
    {
      title: "Content opportunities",
      description: "Map formats that fit your offer and audience.",
      icon: Lightbulb,
    },
    {
      title: "Creative testing",
      description: "Test hooks, retention and response quickly.",
      icon: FlaskConical,
    },
    {
      title: "Repeatable formats",
      description: "Turn winners into a media growth system.",
      icon: Repeat,
    },
  ],
};

export const mobileProcess = {
  title: "How we create growth.",
  subtitle:
    "We audit, hypothesize, produce, test and scale what earns attention.",
};

/** Карточки evolution carousel для mobile */
export const mobileEvolutionCards = [
  {
    id: "media-asset",
    label: mediaEvolutionSection.mediaAsset.label,
    description: mediaEvolutionSection.mediaAsset.description,
    steps: mediaEvolutionSection.mediaAsset.steps,
    type: "pipeline" as const,
  },
  {
    id: "bridge",
    before: mediaEvolutionSection.bridgeTextBefore,
    accent: mediaEvolutionSection.bridgeTextAccent,
    type: "bridge" as const,
  },
  {
    id: "product-system",
    label: mediaEvolutionSection.productSystem.label,
    description: mediaEvolutionSection.productSystem.description,
    steps: mediaEvolutionSection.productSystem.steps,
    type: "pipeline" as const,
  },
];

export function getMobileProjects() {
  return mobileOurWork.projectNames
    .map((name) => heroProjects.find((p) => p.name === name))
    .filter(Boolean) as typeof heroProjects;
}
