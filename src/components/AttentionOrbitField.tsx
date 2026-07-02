"use client";

import AttentionEyeVisual from "./AttentionEyeVisual";
import {
  attentionOrbitItems,
  type AttentionOrbitItem,
} from "@/data/attentionOrbitItems";
import "./AttentionOrbitField.css";

const RING_DURATIONS: Record<AttentionOrbitItem["ring"], string> = {
  1: "380s",
  2: "520s",
  3: "640s",
  4: "780s",
};

/** Одна миниатюра на орбите */
function OrbitThumbnail({ item }: { item: AttentionOrbitItem }) {
  const shapeClass =
    item.shape === "circle"
      ? "am-orbit-field__thumb--circle"
      : item.shape === "square"
        ? "am-orbit-field__thumb--square"
        : "am-orbit-field__thumb--rounded";

  return (
    <div
      className={`am-orbit-field__item am-orbit-field__item--ring-${item.ring}`}
      style={
        {
          "--angle": `${item.angle}deg`,
          "--size": `${item.size}px`,
          "--opacity": item.opacity ?? 0.55,
          "--float-delay": `${(item.angle % 17) * 0.11}s`,
        } as React.CSSProperties
      }
    >
      <div className="am-orbit-field__item-inner">
        <div className={`am-orbit-field__thumb ${shapeClass}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt=""
            className="am-orbit-field__thumb-img"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

/** Орбитальное поле миниатюр + глаз в центре */
export default function AttentionOrbitField({ eyeSrc }: { eyeSrc: string }) {
  const rings: AttentionOrbitItem["ring"][] = [1, 2, 3, 4];

  return (
    <div className="am-orbit-field">
      <div className="am-orbit-field__backdrop" aria-hidden="true">
        {rings.map((ring) => (
          <span
            key={ring}
            className={`am-orbit-field__ring am-orbit-field__ring--${ring}`}
          />
        ))}
        <span className="am-orbit-field__glow" />
      </div>

      {rings.map((ring) => (
        <div
          key={ring}
          className={`am-orbit-field__layer am-orbit-field__layer--${ring}`}
          style={{ "--spin-duration": RING_DURATIONS[ring] } as React.CSSProperties}
        >
          {attentionOrbitItems
            .filter((item) => item.ring === ring)
            .map((item) => (
              <OrbitThumbnail key={item.id} item={item} />
            ))}
        </div>
      ))}

      <div className="am-orbit-field__eye">
        <AttentionEyeVisual eyeSrc={eyeSrc} />
      </div>
    </div>
  );
}
