/** @type {import('next').NextConfig} */
const nextConfig = {
  // This line is the magic fix for Docker/App Service
  output: 'standalone', 
  
  images: {
    unoptimized: true,
    remotePatterns: [
    ],
  },
};

module.exports = nextConfig;