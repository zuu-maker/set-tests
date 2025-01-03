/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    domains: ["firebasestorage.googleapis.com"], // Add your external domain here
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
