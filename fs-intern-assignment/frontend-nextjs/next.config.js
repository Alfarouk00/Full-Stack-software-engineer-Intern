/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',          // frontend relative path
        destination: 'https://psychic-space-giggle-4j6pgjjjrx96h5w7w-8080.app.github.dev/:path*', // backend
      },
    ];
  },
};

module.exports = nextConfig;
