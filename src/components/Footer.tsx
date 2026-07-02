import { footerContent } from "@/data/siteContent";

/** Компактный footer — бренд, подпись, контакт */
export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`site-footer ${className}`.trim()}>
      <div className="section-shell site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">{footerContent.brand}</p>
          <p className="site-footer__tagline">{footerContent.highlightLine}</p>
        </div>

        <div className="site-footer__meta">
          <a
            href={`mailto:${footerContent.email}`}
            className="site-footer__email"
          >
            {footerContent.email}
          </a>
          <p className="site-footer__copy">
            &copy; {new Date().getFullYear()} {footerContent.brand}
          </p>
        </div>
      </div>
    </footer>
  );
}
