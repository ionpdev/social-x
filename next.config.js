/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // If you're using a custom directory structure
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  // If your app file is in src/client
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;
