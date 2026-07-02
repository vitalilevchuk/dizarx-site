import OrbitalIcon from "./OrbitalIcon";
import CosmicBackground from "./CosmicBackground";
import {
  howWeCreateGrowthSection,
  processSteps,
} from "@/data/siteContent";

/** Горизонтальный pipeline процесса роста */
export default function HowWeCreateGrowth() {
  return (
    <section id="our-process" className="orbital-bg relative py-20 md:py-28">
      <CosmicBackground />

      <div className="section-shell relative z-10">
        {/* Заголовок */}
        <div className="mb-16 text-center">
          <h2 className="section-label text-base md:text-lg">
            {howWeCreateGrowthSection.title}
          </h2>
          <div className="mx-auto mt-4 h-px w-48 bg-gradient-to-r from-transparent via-[var(--accent-blue)] to-transparent" />
        </div>

        {/* Desktop: horizontal pipeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Input labels */}
            <div className="absolute -left-2 top-1/2 flex -translate-y-1/2 flex-col gap-3">
              {howWeCreateGrowthSection.inputLabels.map((label) => (
                <span
                  key={label}
                  className="text-[0.65rem] font-medium tracking-[0.2em] text-[var(--accent-blue)]"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Output labels */}
            <div className="absolute -right-2 top-1/2 flex -translate-y-1/2 flex-col gap-3">
              {howWeCreateGrowthSection.outputLabels.map((label) => (
                <span
                  key={label}
                  className="text-[0.65rem] font-medium tracking-[0.2em] text-[var(--accent-blue)]"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Pipeline line */}
            <div className="relative mx-12 flex items-start justify-between">
              {/* Glowing line */}
              <div className="absolute left-0 right-0 top-[36px] h-px bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-violet)] to-[var(--accent-blue)] opacity-60" />
              <div className="absolute right-0 top-[32px] h-2 w-2 rotate-45 border-r border-t border-[var(--accent-blue)]" />

              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="relative z-10 flex w-[18%] flex-col items-center text-center"
                >
                  <span className="mb-3 text-xs font-medium text-[var(--accent-blue)]">
                    {step.number}
                  </span>
                  <OrbitalIcon Icon={step.icon} size="md" />
                  <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <div className="lg:hidden">
          {/* Input labels top */}
          <div className="mb-8 flex justify-center gap-6">
            {howWeCreateGrowthSection.inputLabels.map((label) => (
              <span
                key={label}
                className="text-[0.65rem] font-medium tracking-[0.2em] text-[var(--accent-blue)]"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="relative mx-auto max-w-md">
            {/* Vertical line */}
            <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-blue)] via-[var(--accent-violet)] to-[var(--accent-blue)] opacity-40" />

            <div className="flex flex-col gap-10">
              {processSteps.map((step) => (
                <div key={step.number} className="relative flex gap-5 pl-2">
                  <div className="relative z-10 shrink-0">
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-medium text-[var(--accent-blue)]">
                      {step.number}
                    </span>
                    <OrbitalIcon Icon={step.icon} size="sm" />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Output labels bottom */}
          <div className="mt-10 flex justify-center gap-6">
            {howWeCreateGrowthSection.outputLabels.map((label) => (
              <span
                key={label}
                className="text-[0.65rem] font-medium tracking-[0.2em] text-[var(--accent-blue)]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
