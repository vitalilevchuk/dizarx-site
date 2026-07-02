import type { LucideIcon } from "lucide-react";

interface OrbitalIconProps {
  Icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/** Иконка в орбитальном круге с glow-эффектом */
export default function OrbitalIcon({
  Icon,
  size = "md",
  className = "",
}: OrbitalIconProps) {
  const sizeMap = {
    sm: { container: "h-10 w-10", icon: 16, stroke: 1.4 },
    md: { container: "h-14 w-14", icon: 22, stroke: 1.5 },
    lg: { container: "h-[72px] w-[72px]", icon: 28, stroke: 1.6 },
  };

  const s = sizeMap[size];

  return (
    <div className={`orbital-icon ${s.container} ${className}`}>
      <Icon
        size={s.icon}
        strokeWidth={s.stroke}
        className="relative z-10 text-[#c8daff]"
      />
    </div>
  );
}
