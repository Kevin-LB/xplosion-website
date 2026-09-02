import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Upload d'images (photos d'équipe, couvertures d'actualités) via
      // server actions — la limite par défaut est trop basse pour des photos.
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
