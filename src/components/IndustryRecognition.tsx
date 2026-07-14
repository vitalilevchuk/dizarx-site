import { industryRecognitionSection } from "@/data/siteContent";

/** Industry Recognition — номинация Shorty Awards */
export default function IndustryRecognition() {
  const data = industryRecognitionSection;

  return (
    <section id="industry-recognition" className="relative py-8 md:py-12">
      <div className="section-shell">
        <div className="recognition-card glass-card glow-border flex flex-col gap-6 rounded-2xl p-6 md:flex-row md:items-stretch md:gap-8 md:p-8 lg:gap-10">
          <div className="flex shrink-0 justify-center md:justify-start">
            <div className="recognition-badge-wrap flex h-24 w-24 items-center justify-center rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] p-3 md:h-[7.5rem] md:w-[7.5rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.shortyBadgeSrc}
                alt="Shorty Awards"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="section-label">{data.label}</p>
            <h2 className="mt-3 text-2xl font-bold text-white md:text-[1.75rem] lg:text-3xl">
              {data.title}
            </h2>
            <p className="mt-2 text-sm font-medium text-[var(--accent-blue)] md:text-base">
              {data.category}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] md:text-[0.95rem]">
              {data.description}
            </p>
          </div>

          <div className="recognition-project flex shrink-0 flex-col border-t border-[rgba(255,255,255,0.1)] pt-6 md:w-52 md:border-t-0 md:border-l md:pl-8 md:pt-0 lg:w-56">
            <p className="section-label">{data.projectLabel}</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-lg font-semibold text-white">
                {data.projectName}
              </span>
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-[rgba(255,255,255,0.12)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.projectImageSrc}
                  alt={data.projectName}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
