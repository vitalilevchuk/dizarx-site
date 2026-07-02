import MediaPotentialCards from "./MediaPotentialCards";
import { mediaPotentialSection } from "@/data/siteContent";
import "./MediaPotentialSection.css";

/** Media Potential — заголовок + 5 карточек в ряд */
export default function MediaPotentialSection() {
  const data = mediaPotentialSection;

  return (
    <div className="media-potential">
      <div className="media-potential__shell section-shell relative z-10">
        <header className="media-potential__header">
          <h2 className="media-potential__title">
            {data.headlineLine1}
            <span className="media-potential__title-accent">
              {" "}
              {data.headlineAccent}
            </span>
          </h2>
          <p className="media-potential__subtitle">{data.subtitle}</p>
        </header>

        <div className="media-potential__body">
          <MediaPotentialCards />
        </div>
      </div>
    </div>
  );
}
