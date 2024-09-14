/** @type {import('next').NextConfig} */

import withPurgeCss from 'next-purgecss';

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
  optimizeFonts: true,
  compress: true,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
};

// PurgeCSSの設定（開発環境では無効化）
const config =
  process.env.NODE_ENV === 'production'
    ? withPurgeCss({
        purgeCssPaths: ['app/**/*', 'components/**/*'],
        ...nextConfig,
      })
    : nextConfig;

export default config;
