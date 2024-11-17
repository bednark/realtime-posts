import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGO_URL: process.env.MONGO_URL,
    WS_URL: process.env.WS_URL,
  },
};

export default nextConfig;