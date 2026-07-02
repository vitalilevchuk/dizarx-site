import { ArrowRight } from "lucide-react";
import CosmicBackground from "./CosmicBackground";
import AttentionFieldOrbit from "./AttentionFieldOrbit";
import { attentionMemorySection, attentionEyeIris } from "@/data/siteContent";
import "./AttentionMemorySection.css";

/* ===== Глаз: размер и сдвиг (не влияют на колонку текста) ===== */
export const ATTENTION_EYE_SIZE_PX = 1020;
/** Сдвиг влево от края layout (отрицательное = левее) */
export const ATTENTION_EYE_OFFSET_X_PX = -172;
/** Сдвиг текста вправо */
export const ATTENTION_COPY_OFFSET_X_PX = 200;
/** Сдвиг глаза вниз */
export const ATTENTION_EYE_OFFSET_Y_PX = 30;

const EYE_SRC = "/assets/attention-eye/eye.png";

/** Финальный блок — daily attention stream + глаз */
export default function AttentionMemorySection() {
  const copy = attentionMemorySection;

  const sectionStyle = {
    "--am-eye-size": `${ATTENTION_EYE_SIZE_PX}px`,
    "--am-eye-offset-x": `${ATTENTION_EYE_OFFSET_X_PX}px`,
    "--am-copy-offset-x": `${ATTENTION_COPY_OFFSET_X_PX}px`,
    "--am-eye-offset-y": `${ATTENTION_EYE_OFFSET_Y_PX}px`,
    "--eye-iris-inner": attentionEyeIris.colorInner,
    "--eye-iris-mid": attentionEyeIris.colorMid,
    "--eye-iris-outer": attentionEyeIris.colorOuter,
    "--eye-iris-tint": String(attentionEyeIris.tintStrength),
    "--eye-hue-rotate": attentionEyeIris.hueRotate,
    "--eye-saturate": attentionEyeIris.saturate,
  } as React.CSSProperties;

  return (
    <section
      id="contact"
      className="am-section orbital-bg"
      style={sectionStyle}
    >
      <CosmicBackground variant="subtle" />

      <div className="section-shell relative z-10">
        <div className="am-section__layout">
          <div className="am-section__eye-column">
            <div className="am-section__eye-float" aria-hidden="true">
              <AttentionFieldOrbit eyeSrc={EYE_SRC} />
            </div>
          </div>

          <div className="am-section__copy">
            <p className="am-section__overline am-section__overline--empty" aria-hidden="true" />

            <h2 className="am-section__headline">
              {copy.headline}{" "}
              <span className="am-section__headline-accent">
                {copy.headlineAccent}
              </span>
            </h2>

            <p className="am-section__subheadline">{copy.subheadline}</p>

            <p className="am-section__body">{copy.body}</p>

            <div className="am-section__actions">
              <a href={copy.primaryCta.href} className="am-section__btn-primary">
                {copy.primaryCta.label}
                <ArrowRight size={16} />
              </a>
              <a href={copy.secondaryCta.href} className="am-section__link-secondary">
                {copy.secondaryCta.label}
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
