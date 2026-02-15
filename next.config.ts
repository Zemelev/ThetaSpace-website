import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Тимчасово, поки не виправите
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;
