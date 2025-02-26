/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true, // Required for Cloudflare Pages
    },
  };
  
  module.exports = nextConfig;