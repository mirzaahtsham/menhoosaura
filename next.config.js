/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Required for Cloudflare Pages
  },
  output: 'export', // Ensures static export for Cloudflare Pages
};

module.exports = nextConfig;
