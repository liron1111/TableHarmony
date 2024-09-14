import createMDX from "@next/mdx";
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "beloved-lemming-681.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "prod:adept-chipmunk-336.convex.cloud",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({});

const pwaConfig = withPWA({
  dest: "public/pwa",
});

export default pwaConfig(withMDX(nextConfig));
