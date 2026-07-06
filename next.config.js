/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  // Silence the warning by using the correct experimental flag or just standardizing
  // If Turbopack error persists, run: npm run dev -- --webpack
};

module.exports = withPWA(nextConfig);