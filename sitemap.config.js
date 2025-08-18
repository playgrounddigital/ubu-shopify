// const excludeUrls = ['/privacy-policy', '/workbook', '/terms-of-access']

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ubu-shopify.vercel.app',
  generateRobotsTxt: true,
  // robotsTxtOptions: {
  //   policies: [
  //     {
  //       userAgent: '*',
  //       allow: '/',
  //       disallow: excludeUrls,
  //     },
  //     {
  //       userAgent: 'Googlebot',
  //       allow: '/',
  //       disallow: excludeUrls,
  //     },
  //   ],
  // },
  // exclude: excludeUrls,
}
