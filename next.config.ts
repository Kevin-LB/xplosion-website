import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build autonome (server.js + node_modules minimaux) pour l'image Docker.
  output: "standalone",
  experimental: {
    serverActions: {
      // Upload d'images (photos d'équipe, couvertures d'actualités) via
      // server actions — la limite par défaut est trop basse pour des photos.
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
