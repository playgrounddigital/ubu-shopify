const excludeUrls = ['/privacy-policy']

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ubustore.com.au',
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
