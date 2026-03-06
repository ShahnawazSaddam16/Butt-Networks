/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://buttnetworks.com', // your live site URL
  generateRobotsTxt: true,             // generate robots.txt
  changefreq: 'daily',                
  priority: 0.8,                        // optional
  sitemapSize: 5000,                   
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },  // allow everything
    ],
  },
};