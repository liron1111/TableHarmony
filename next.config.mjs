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
};

const withMDX = createMDX({});

const pwaConfig = withPWA({
  dest: "public/pwa",
});

export default pwaConfig(withMDX(nextConfig));
