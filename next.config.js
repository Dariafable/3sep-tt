const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@shared": path.resolve(__dirname, "src/shared"),
      "@features": path.resolve(__dirname, "src/features"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@styles": path.resolve(__dirname, "src/styles"),
    };
    return config;
  },
};

module.exports = nextConfig;
