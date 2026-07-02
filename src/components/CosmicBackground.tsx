"use client";

/** Космический фон: градиенты, звёзды, орбитальные линии */
export default function CosmicBackground({
  variant = "default",
}: {
  variant?: "default" | "hero" | "subtle";
}) {
  const intensity =
    variant === "hero" ? 1 : variant === "subtle" ? 0.5 : 0.75;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Базовый градиент */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(110,168,255,${0.06 * intensity}) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 20%, rgba(155,140,255,${0.05 * intensity}) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 20% 80%, rgba(110,168,255,${0.04 * intensity}) 0%, transparent 50%)`,
        }}
      />

      {/* Орбитальные линии — смещены вправо, слабее слева */}
      <div
        className="absolute top-1/2"
        style={{
          left: variant === "hero" ? "69%" : "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {[280, 380, 480, 580].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full border"
            style={{
              width: size,
              height: size,
              left: -size / 2,
              top: -size / 2,
              borderColor: `rgba(74, 144, 226, ${(0.035 + i * 0.012) * intensity})`,
              opacity: variant === "hero" ? 0.28 + i * 0.06 : 0.5 + i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Край планеты (hero) */}
      {variant === "hero" && (
        <div
          className="absolute -right-[30%] -top-[20%] h-[600px] w-[600px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle at 30% 70%, rgba(110,168,255,0.15) 0%, transparent 60%)",
            boxShadow: "inset -40px -40px 80px rgba(110,168,255,0.08)",
          }}
        />
      )}

      {/* Звёзды */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: i % 5 === 0 ? 2 : 1,
            height: i % 5 === 0 ? 2 : 1,
            left: `${(i * 17 + 7) % 100}%`,
            top: `${(i * 23 + 11) % 100}%`,
            opacity: 0.15 + (i % 4) * 0.15,
            animation: `twinkle ${3 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
