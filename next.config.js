/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      'replicate.delivery', // For Replicate-generated images
    ],
  },
};

module.exports = nextConfig;
