import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.istockphoto.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // Ensure no Node.js-specific modules conflict with Web3
    };
    config.externals.push("pino-pretty"); // Add pino-pretty external
    return config;
  },
  experimental: {
    // Optional: Add any experimental features, but avoid breaking changes
    // serverComponentsExternalPackages: ["@thirdweb-dev/react"], // Example if using Thirdweb
  },
};

export default nextConfig;
