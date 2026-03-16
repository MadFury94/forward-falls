import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['framer-motion', 'swiper', 'recharts', '@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'azure-dugong-563921.hostingersite.com',
      },
    ],
  },
};

export default nextConfig;
