/** @type {import('next').NextConfig} */
const nextConfig = {
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
    return config;
  },
  experimental: {
    // Optional: Add any experimental features, but avoid breaking changes
    // serverComponentsExternalPackages: ["@radix-ui/react-dialog"], // Example if using Radix UI
  },
  // Uncomment if you need to disable TypeScript errors during build (temporary)
  // typescript: {
    //   ignoreBuildErrors: true, // Not recommended for production
    // },
};
  
module.exports = nextConfig;