import type { Metadata } from "next";
import "./mobile-preview.css";

export const metadata: Metadata = {
  title: "DIZARX — Mobile Preview",
  description: "Mobile viewport preview for the DIZARX landing page",
};

/** Превью mobile-версии в phone frame на desktop */
export default function MobilePreviewPage() {
  return (
    <div className="mobile-preview-page">
      <header className="mobile-preview-page__bar">
        <p className="mobile-preview-page__title">DIZARX Mobile Preview</p>
        <p className="mobile-preview-page__meta">390px · 430px test widths</p>
        <a href="/" className="mobile-preview-page__link">
          Open full site →
        </a>
      </header>

      <div className="mobile-preview-page__stage">
        <div className="mobile-preview-page__device">
          <div className="mobile-preview-page__notch" aria-hidden="true" />
          <iframe
            src="/"
            title="DIZARX mobile preview"
            className="mobile-preview-page__iframe"
          />
        </div>
      </div>
    </div>
  );
}
