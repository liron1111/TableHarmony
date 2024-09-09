import createMDX from "@next/mdx";
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({});

const pwaConfig = withPWA({
  dest: "public",
});

export default pwaConfig(withMDX(nextConfig));
