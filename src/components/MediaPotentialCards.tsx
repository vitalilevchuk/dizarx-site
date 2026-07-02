import Image from "next/image";
import { Heart, MessageCircle, MoreHorizontal, Share2 } from "lucide-react";
import { mediaPotentialSection } from "@/data/siteContent";
import "./MediaPotentialCards.css";

/** Декоративные метрики под стиль mockup */
const CARD_STATS = [
  { likes: "1.2K", comments: "84" },
  { likes: "980", comments: "62" },
  { likes: "1.5K", comments: "91" },
  { likes: "870", comments: "55" },
  { likes: "1.1K", comments: "73" },
] as const;

/** 5 карточек в ряд — как в референсе */
export default function MediaPotentialCards() {
  const cards = mediaPotentialSection.cards;

  return (
    <div className="mp-cards">
      {cards.map((card, index) => {
        const stats = CARD_STATS[index];

        return (
          <article key={card.number} className="mp-cards__item">
            <div className="mp-cards__media">
              <Image
                src={card.imageSrc}
                alt=""
                fill
                className="mp-cards__image"
                sizes="(max-width: 1023px) 48vw, 16vw"
                priority={index < 2}
              />

              <div className="mp-cards__shade" aria-hidden="true" />

              <header className="mp-cards__top">
                <span className="mp-cards__handle">
                  <span className="mp-cards__num">{card.number}</span>
                  <span className="mp-cards__at">@dizarx</span>
                </span>
                <MoreHorizontal size={14} strokeWidth={1.75} aria-hidden="true" />
              </header>

              <div className="mp-cards__bottom">
                <div className="mp-cards__copy">
                  <h3 className="mp-cards__title">{card.title}</h3>
                  <p className="mp-cards__desc">{card.description}</p>
                </div>

                <div className="mp-cards__actions" aria-hidden="true">
                  <span className="mp-cards__action">
                    <Heart size={15} strokeWidth={1.75} />
                    <span>{stats.likes}</span>
                  </span>
                  <span className="mp-cards__action">
                    <MessageCircle size={15} strokeWidth={1.75} />
                    <span>{stats.comments}</span>
                  </span>
                  <Share2 size={15} strokeWidth={1.75} />
                </div>
              </div>

              <div className="mp-cards__progress" aria-hidden="true">
                <span className="mp-cards__progress-fill" />
              </div>
            </div>

            <div className="mp-cards__tags-panel">
              <ul className="mp-cards__tags">
                {card.tags.map((tag) => (
                  <li key={tag} className="mp-cards__tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
}
