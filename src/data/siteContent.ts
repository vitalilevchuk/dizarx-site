import {
  BarChart3,
  Building2,
  Clapperboard,
  Crosshair,
  DollarSign,
  FlaskConical,
  Layers,
  Lightbulb,
  Orbit,
  Calendar,
  Play,
  PlaySquare,
  Repeat,
  Rocket,
  Search,
  Shield,
  ShieldCheck,
  ShoppingCart,
  ShoppingBag,
  Target,
  TrendingUp,
  Users,
  Eye,
  type LucideIcon,
} from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroStat {
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface HeroProject {
  name: string;
  src: string;
  position: "top" | "left" | "right" | "bottom-left" | "bottom-right";
  glow: string;
  /** Просмотры проекта — показываем под карточкой на орбите */
  views: string;
  /** Угол на орбите в градусах: 0 = справа, -90 = сверху */
  orbitAngle: number;
  /** Тонкая подстройка позиции на орбите (px) */
  offsetX?: number;
  offsetY?: number;
}

/** Режим отображения лого в trusted-блоке */
export type LogoDisplayMode =
  | "transparent"
  | "badgeDark"
  | "badgeLight"
  | "boxed";

export interface TrustedBrand {
  name: string;
  src: string;
  scale: number;
  mode: LogoDisplayMode;
}

export interface WhatWeDoCard {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface WhoWeWorkWithCard {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

/** Карточка угла media potential */
export interface MediaAngleCard {
  number: string;
  title: string;
  description: string;
  tags: string[];
  visual: "personality" | "physical" | "digital" | "knowledge" | "experience";
  imageSrc: string;
}

/** Шаг system panel (Media Potential) */
export interface MediaSystemStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const siteMeta = {
  title: "DIZARX — Media Systems for Trust, Attention and Growth",
  description:
    "We build media systems that turn experience into trust — and trust into growth.",
};

export const navigationLinks: NavLink[] = [
  { label: "Our Work", href: "#proof" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const headerCta = {
  label: "Book a Growth Audit",
  href: "#contact",
};

export const heroContent = {
  pillLabel: "Data. AI. Creative. Growth.",
  titleLines: ["Media", "Growth", "Systems"],
  gradientLineIndex: 2,
  subtitle:
    "We build repeatable media systems that turn organic attention into trust, demand and revenue.",
  experienceBadge: "10+ years building media systems",
  primaryCta: { label: "Book a Growth Audit", href: "#contact" },
  secondaryCta: { label: "Explore Our Work", href: "#proof" },
};

export const heroStats: HeroStat[] = [
  { value: "20M+", label: "Subscribers Built", icon: Users },
  { value: "7B+", label: "Organic Views", icon: Eye },
];

export const heroProjects: HeroProject[] = [
  {
    name: "Riddle",
    src: "/our-projects/riddle.jpeg",
    position: "top",
    glow: "rgba(74, 144, 226, 0.45)",
    views: "2B+ views",
    orbitAngle: -60,
  },
  {
    name: "Dory Story",
    src: "/our-projects/dory.webp",
    position: "bottom-right",
    glow: "rgba(255, 255, 255, 0.32)",
    views: "500M+ views",
    orbitAngle: 84,
  },
  {
    name: "Meet Arnold",
    src: "/our-projects/meet-arnold.webp",
    position: "right",
    glow: "rgba(255, 180, 80, 0.42)",
    views: "3B+ views",
    orbitAngle: 12,
  },
  {
    name: "GoGo Tunes",
    src: "/our-projects/googootunes.jpeg",
    position: "left",
    glow: "rgba(255, 100, 180, 0.42)",
    views: "1B+ views",
    orbitAngle: -132,
  },
  {
    name: "Echoes",
    src: "/our-projects/echoes.jpg",
    position: "bottom-left",
    glow: "rgba(220, 80, 80, 0.42)",
    views: "200M+ views",
    orbitAngle: 156,
  },
];

export const trustedBrandsSection = {
  label: "TRUSTED BY",
};

/**
 * Лого: /public/trusted-brands-clean
 * badgeDark — белое лого на белом фоне; badgeLight — тёмное на белом;
 * transparent — чёрный фон / прозрачное; boxed — нейтральная плашка
 */
export const trustedBrands: TrustedBrand[] = [
  {
    name: "Skillshare",
    src: "/trusted-brands-clean/skillshare.png?v=4",
    scale: 1.1,
    mode: "badgeLight",
  },
  {
    name: "War Robots",
    src: "/trusted-brands-clean/war-robots.jpeg?v=5",
    scale: 1.1,
    mode: "transparent",
  },
  {
    name: "Blinkist",
    src: "/trusted-brands-clean/blinkist.png?v=5",
    scale: 1.05,
    mode: "badgeLight",
  },
  {
    name: "CCP Games",
    src: "/trusted-brands-clean/ccp-games.png?v=4",
    scale: 1.05,
    mode: "badgeLight",
  },
  {
    name: "EVE Online",
    src: "/trusted-brands-clean/eve-online.png?v=4",
    scale: 1.15,
    mode: "transparent",
  },
  {
    name: "Fortnite",
    src: "/trusted-brands-clean/fortnite.jpeg?v=5",
    scale: 1.12,
    mode: "badgeLight",
  },
  {
    name: "Plarium",
    src: "/trusted-brands-clean/plarium.png?v=4",
    scale: 1.05,
    mode: "transparent",
  },
  {
    name: "NordVPN",
    src: "/trusted-brands-clean/nordvpn.png?v=4",
    scale: 1.15,
    mode: "badgeDark",
  },
  {
    name: "Pixonic",
    src: "/trusted-brands-clean/pixonic.png?v=4",
    scale: 1.1,
    mode: "transparent",
  },
  {
    name: "Wix",
    src: "/trusted-brands-clean/wix.png?v=4",
    scale: 1.2,
    mode: "badgeDark",
  },
];

export const industryRecognitionSection = {
  label: "Industry Recognition",
  title: "Shorty Awards Nominee",
  category: "Best Educational Project — Meet Arnold",
  description:
    "Meet Arnold was recognized for turning educational content into a global media asset with billions of organic views.",
  projectLabel: "Project",
  projectName: "Meet Arnold",
  nominationUrl: "https://shortyawards.com/10th/meet-arnold",
  linkLabel: "View nomination",
  shortyBadgeSrc: "/industry-recognition/shorty-badge.png",
  projectImageSrc: "/industry-recognition/meet-arnold.webp",
};

/** Media Asset → Product Media System — блок What We Do */
export const mediaEvolutionSection = {
  headlineWhite: "We learned attention by building media projects.",
  headlineAccent: "Now we apply it to products.",
  subtitle:
    "The same mechanics that helped our own projects earn billions of views now become repeatable growth systems for brands.",
  bridgeTextBefore: "Same mechanics.",
  bridgeTextAccent: "New outcome.",
  mediaAsset: {
    label: "MEDIA ASSET",
    description: "We build media projects that generate views and ad revenue.",
    steps: [
      { label: "Content", icon: Clapperboard },
      { label: "Views", icon: Eye },
      { label: "Ad Revenue", icon: DollarSign },
    ],
    gridProjectNames: [
      "Riddle",
      "Dory Story",
      "Meet Arnold",
      "GoGo Tunes",
      "Echoes",
    ] as const,
    aggregateMetricValue: "7B+",
    aggregateMetricLabel: "organic views across media assets",
  },
  productSystem: {
    label: "PRODUCT MEDIA SYSTEM",
    description:
      "We apply the same mechanics to products to drive attention and growth.",
    steps: [
      { label: "Content", icon: Clapperboard },
      { label: "Views", icon: Eye },
      { label: "Trust", icon: ShieldCheck },
      { label: "Sales", icon: ShoppingCart },
    ],
    outcomeText: "Turning attention into growth.",
  },
};

/** HOW IT STARTS — процесс */
export const howItStartsSection = {
  label: "HOW IT STARTS",
  headlineWhite: "Every strong offer can earn organic attention if we find the ",
  headlineAccent: "formats that make it possible.",
  subtitle:
    "We do not start with random content ideas. We audit your product, audience and category to find repeatable formats that can attract attention, build trust and support revenue.",
  note: "Being shown is not the same as being chosen.",
};

export const howItStartsSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Audit",
    description: "Product, audience, market and current channels.",
    icon: Search,
  },
  {
    number: "02",
    title: "Format Hypotheses",
    description: "Find repeatable formats your offer can win with.",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Production",
    description:
      "Short-form, long-form, UGC, founder-led and product-led media.",
    icon: Clapperboard,
  },
  {
    number: "04",
    title: "Testing",
    description: "Retention, CTR, leads, CAC and audience response.",
    icon: BarChart3,
  },
  {
    number: "05",
    title: "Scaling",
    description: "Turn what works into a repeatable media growth system.",
    icon: Rocket,
  },
];

/** Финальный closing-блок — глаз + daily attention stream */
export const attentionMemorySection = {
  overline: "DAILY ATTENTION STREAM",
  headline: "Every day, hundreds of signals fight for attention.",
  headlineAccent: "Few become worth watching.",
  subheadline:
    "We find the growth angles that help your product enter attention, memory and choice.",
  body:
    "We study your product, audience and category to uncover content opportunities that can attract attention, build trust and support revenue.",
  primaryCta: { label: "Book a Growth Audit", href: "#contact" },
  secondaryCta: {
    label: "Contact Us",
    href: "mailto:contact@dizarx.com",
  },
  timerLabel: "A day in attention",
};

/**
 * Цвет радужки глаза — меняется кодом, PNG из GPT не нужен.
 * inner/mid/outer — градиент кольца; tintStrength 0–1; hueRotate — тонкая подстройка PNG.
 */
export const attentionEyeIris = {
  colorInner: "#9b8cff",
  colorMid: "#6ea8ff",
  colorOuter: "#4a90e2",
  tintStrength: 0.78,
  hueRotate: "0deg",
  saturate: "1.06",
} as const;

export const whatWeDoSection = {
  title: "What We Do",
  subtitle: "The systems we build to turn media into growth.",
};

/** Media Potential — один экран: углы → hub → система */
export const mediaPotentialSection = {
  headlineLine1: "Every offer can earn organic attention.",
  headlineAccent: "We find how.",
  subtitle:
    "Some offers grow through people. Some through the product itself, the workflow, the knowledge behind it or the experience it creates. We find the strongest angle — then turn it into a repeatable media system.",
  hubText: "We find the angle your product can win with.",
  systemPanelTitle: "Then we build the system around it",
  systemSummary:
    "From there, we build strategy, production and creative testing.",
  cards: [
    {
      number: "01",
      title: "Personality",
      description: "People trust people before products.",
      tags: ["Founder POV", "Expert takes", "Stories", "Beliefs", "Lessons"],
      visual: "personality",
      imageSrc: "/assets/media-potential/personality.png",
    },
    {
      number: "02",
      title: "Physical Product",
      description: "Make value visible in the real world.",
      tags: [
        "Demos",
        "Materials",
        "Use cases",
        "Comparisons",
        "Production",
        "Before / After",
      ],
      visual: "physical",
      imageSrc: "/assets/media-potential/physical.png",
    },
    {
      number: "03",
      title: "Digital Product",
      description: "Show the workflow, not just the feature.",
      tags: [
        "Interfaces",
        "Workflows",
        "Screens",
        "Automations",
        "Features",
        "SaaS use cases",
      ],
      visual: "digital",
      imageSrc: "/assets/media-potential/digital.png",
    },
    {
      number: "04",
      title: "Knowledge",
      description: "Help people understand why it works.",
      tags: [
        "Education",
        "Mechanisms",
        "Frameworks",
        "Research",
        "Explainers",
        "Breakdowns",
      ],
      visual: "knowledge",
      imageSrc: "/assets/media-potential/knowledge.png",
    },
    {
      number: "05",
      title: "Experience",
      description: "Show what changes for the user.",
      tags: [
        "Transformations",
        "Results",
        "Emotions",
        "Rituals",
        "Outcomes",
        "Before / After",
      ],
      visual: "experience",
      imageSrc: "/assets/media-potential/experience.png",
    },
  ] satisfies MediaAngleCard[],
  systemSteps: [
    {
      title: "Clarity",
      description: "You know which angles can make people care.",
      icon: Crosshair,
    },
    {
      title: "Consistency",
      description: "Content works as one system, not separate posts.",
      icon: Layers,
    },
    {
      title: "Testing",
      description: "We learn what earns attention and scale what works.",
      icon: FlaskConical,
    },
  ] satisfies MediaSystemStep[],
};

export const whatWeDoCards: WhatWeDoCard[] = [
  {
    number: "01",
    title: "Growth Strategy",
    description:
      "We audit your product, market and channels to find where content can drive traffic, trust, leads and sales.",
    icon: Target,
  },
  {
    number: "02",
    title: "Organic Content Systems",
    description:
      "We create and test repeatable formats across YouTube, short-form video, founder-led and expert-led media.",
    icon: Repeat,
  },
  {
    number: "03",
    title: "Trust & Conversion Content",
    description:
      "UGC, testimonials, case studies and brand documentaries that help convert attention into credibility and revenue.",
    icon: Shield,
  },
  {
    number: "04",
    title: "Media Growth Accelerator",
    description:
      "We train founders and teams to build in-house content systems, test ideas and connect media to business outcomes.",
    icon: TrendingUp,
  },
  {
    number: "05",
    title: "Media Venture Partnerships",
    description:
      "For selected products we believe in, we work as a media growth partner through hybrid models: reduced fee plus revenue share, equity or success fee.",
    icon: Orbit,
  },
];

export const howWeCreateGrowthSection = {
  title: "HOW WE CREATE GROWTH",
  inputLabels: ["PRODUCT", "MARKET", "AUDIENCE"],
  outputLabels: ["TRAFFIC", "TRUST", "REVENUE"],
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Audit",
    description:
      "We analyze your product, audience, competitors and current channels to find opportunities and content gaps.",
    icon: Search,
  },
  {
    number: "02",
    title: "Hypotheses",
    description:
      "We develop hypotheses for content formats that can drive reach, trust, leads and sales.",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Production",
    description:
      "We produce first content formats: short-form, long-form, UGC, founder-led, proof content and more.",
    icon: Clapperboard,
  },
  {
    number: "04",
    title: "Testing",
    description:
      "We test across platforms and audiences. Measure retention, CTR, leads, CAC, sales signals and audience response.",
    icon: BarChart3,
  },
  {
    number: "05",
    title: "Scaling",
    description:
      "We scale what works through organic, creators, paid media, community and internal teams.",
    icon: Rocket,
  },
];

export const whoWeWorkWithSection = {
  label: "BEST FIT / WHO WE WORK WITH",
  title: "WHO WE WORK BEST WITH",
  subtitle:
    "We work best with teams that already have real value — and need the right media system to turn it into trust, attention and revenue.",
  bottomStatement:
    "Best results happen when product quality already exists — and content becomes the growth engine.",
};

export const whoWeWorkWithCards: WhoWeWorkWithCard[] = [
  {
    number: "01",
    title: "E-commerce Brands",
    description:
      "You have a real product, margin and ad spend — but need stronger content, UGC and organic trust to reduce CAC and drive more sales.",
    icon: ShoppingBag,
  },
  {
    number: "02",
    title: "Creators & Educators",
    description:
      "You have expertise and audience potential, but need a clearer content system, packaging, distribution and monetization path.",
    icon: PlaySquare,
  },
  {
    number: "03",
    title: "Founders & Companies",
    description:
      "You have a strong business, but your founder story, expertise and media presence have not yet become a growth channel.",
    icon: Building2,
  },
  {
    number: "04",
    title: "Media Ventures",
    description:
      "You have a product, IP or concept that can be scaled through formats, audience building and long-term media infrastructure.",
    icon: Orbit,
  },
];

export const ctaSection = {
  title: "Have a product, brand or channel that should grow through content?",
  subtitle:
    "Send us a short message. We'll tell you where we see the fastest growth opportunity.",
  button: { label: "Book a Growth Audit", href: "#contact" },
};

export const footerContent = {
  brand: "DIZARX",
  tagline: "Media systems for trust, attention and growth.",
  highlightLine:
    "Built from 10+ years of creating media people choose to watch.",
  email: "contact@dizarx.com",
};
