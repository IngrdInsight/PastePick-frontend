import withPWA from "@ducanh2912/next-pwa";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/request.js');
const runtimeCaching = [
  {
    urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'google-fonts',
      expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 }, // 1 year
      cacheableResponse: { statuses: [0, 200] },
    },
  },

  {
    urlPattern: /^https:\/\/cdn\.example\.com\/.*/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'external-cdn',
      cacheableResponse: { statuses: [0, 200] },
    },
  },

  {
    urlPattern: ({ request }) => request.destination === 'image',
    handler: 'CacheFirst',
    options: {
      cacheName: 'images',
      expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 }, // 30 days
      cacheableResponse: { statuses: [0, 200] },
    },
  },

  {
    urlPattern: ({ request }) => request.destination === 'document',
    handler: 'NetworkFirst',
    options: {
      cacheName: 'pages',
      networkTimeoutSeconds: 3,
      cacheableResponse: { statuses: [0, 200] },
    },
  },

  {
    urlPattern: /\/api\/.*/i,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'api',
      networkTimeoutSeconds: 3,
      expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 },
      cacheableResponse: { statuses: [0, 200] },
    },
  },

  {
    urlPattern: ({ request }) =>
        request.destination === 'script' || request.destination === 'style',
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-resources',
      cacheableResponse: { statuses: [0, 200] },
    },
  },
];


/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { globalNotFound: true },
};

export default withPWA({
  dest: "public",
  disable: false, // Changed: enable in all modes
  register: true,
  skipWaiting: true,
  sw: "sw.js",
  runtimeCaching,
  fallbacks: {
    document: "/offline",
  },
})(withNextIntl(nextConfig));
