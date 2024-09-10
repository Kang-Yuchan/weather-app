/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
        port: '',
        pathname: '/weather/**',
      },
    ],
  },
  sassOptions: {
    prependData: `@import "@/styles/variables.scss"; @import "@/styles/mixin.scss";`,
  },
};

export default nextConfig;
