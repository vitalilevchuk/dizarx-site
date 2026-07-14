import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Разрешаем загрузку _next/* при открытии dev с телефона по LAN IP
  allowedDevOrigins: ["192.168.1.10", "192.168.*"],
};

export default nextConfig;
