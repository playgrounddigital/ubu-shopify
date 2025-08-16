/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  env: {
    siteDomain: 'hedgey-landing-site.vercel.app',
    siteName: 'Hedgey Finance',
    siteTitle: ' | Hedgey Finance',
    siteDescription:
      'Hedgey helps you accelerate every step of token operations, from the first steps of TGE planning, through launch and beyond.',
    siteUrl: 'https://hedgey-landing-site.vercel.app',
    siteImagePreviewURL: '/share-preview.jpg',
    siteLogo: '/logo.svg',
    siteFavicon: '/favicon.png',
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
