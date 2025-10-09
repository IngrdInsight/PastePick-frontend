import withPWA from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA({
  dest: "public",
  disable: false, // Changed: enable in all modes
  register: true,
  skipWaiting: true,
  sw: "sw.js",
  fallbacks: {
    document: "/offline",
  },
})(nextConfig);