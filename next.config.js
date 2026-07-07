/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  // We keep this empty because Vercel is now instructed to use 
  // the --webpack flag via your package.json build script.
};

module.exports = withPWA(nextConfig);