/** @type {import('next').NextConfig} */
const nextConfig = {
  // This line is the magic fix for Docker/App Service
  output: 'standalone', 
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '20.31.148.108',
        port: '',
        pathname: '/asian-games-2030/**',
      },
    ],
  },
    // Custom headers for proper caching
  async headers() {
    return [
    
    ];
  },

};

module.exports = nextConfig;