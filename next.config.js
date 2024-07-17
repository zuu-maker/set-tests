/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"], // Add your external domain here
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
