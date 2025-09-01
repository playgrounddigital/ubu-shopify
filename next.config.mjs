/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  env: {
    siteDomain: 'ubu-store.vercel.app',
    siteName: 'UBU Store',
    siteTitle: ' | UBU Store',
    siteDescription:
      'UBU is a creative kids’ accessories brand for the trendsetters, letting you be you and express yourself.',
    siteUrl: 'https://ubu-store.vercel.app',
    publisher: 'UBU Store',
    siteImagePreviewURL: '/share-preview.jpg',
    siteLogo: '/logo.svg',
    siteFaviconDark: '/favicon-dark.png',
    siteFaviconLight: '/favicon-light.png',
  },
  devIndicators: false,

  images: {
    imageSizes: [16, 32, 48, 64],
    deviceSizes: [96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    loader: 'default',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },

  webpack(config) {
    config.module.rules.push(
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      },
      {
        test: /\.svg$/,
        use: [{ loader: '@svgr/webpack', options: { titleProp: true } }],
      }
    )

    return config
  },

  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
      resolveAlias: {
        canvas: './empty-module.ts',
      },
    },
  },
}

export default nextConfig
