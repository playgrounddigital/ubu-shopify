const excludeUrls = ['/privacy-policy']

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ubu-store.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: excludeUrls,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: excludeUrls,
      },
    ],
  },
  exclude: excludeUrls,
}
