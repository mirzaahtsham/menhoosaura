/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true, // Required for Cloudflare Pages
    },
  };
  
  module.exports = nextConfig;
  
  

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: 'export',
// }

// module.exports = nextConfig

// module.exports = {
//     output: 'export',
//     distDir: 'out', // Ensures static files go into the correct directory
//   };
  