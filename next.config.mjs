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
const purgeCssConfig = {
  purgeCssPaths: ['app/**/*', 'components/**/*'],
  safelist: {
    standard: [/^(container|row|col|btn)/, /^(mt|mb|ml|mr|pt|pb|pl|pr)-/, /^text-/],
    deep: [/^noto-sans-jp/],
    greedy: [/^Noto_Sans_JP/, /^[a-zA-Z]+$/],
  },
  cssModules: true,
  cssModulesWhitelist: [/^[A-Za-z0-9-_]+$/],
  whitelistPatterns: [/^__next/, /^Noto_Sans_JP__/],
  rejected: true,
};

// 環境に応じた設定
const config =
  process.env.NODE_ENV === 'production'
    ? withPurgeCss({
        ...purgeCssConfig,
        ...nextConfig,
      })
    : nextConfig;

export default config;
