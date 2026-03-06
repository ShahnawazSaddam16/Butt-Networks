/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://buttnetworks.com', 
  generateRobotsTxt: true,             
  changefreq: 'daily',                
  priority: 0.8,                        
  sitemapSize: 5000, 
  generateIndexSitemap: true, 
  
  additionalPaths: async (config) => [
    { loc: 'https://dashboard.wahb.space', changefreq: 'weekly', priority: 0.9 },
    { loc: 'https://admin-dashboard.buttnetworks.com', changefreq: 'weekly', priority: 0.9 },
    { loc: 'https://boltform.wahb.space', changefreq: 'weekly', priority: 0.9 },
    { loc: 'https://key-chains.buttnetworks.com', changefreq: 'weekly', priority: 0.8 },
    { loc: 'https://digital-x.buttnetworks.com', changefreq: 'weekly', priority: 0.9 },
  ],

  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      'https://buttnetworks.com/sitemap.xml',
      'https://buttnetworks.com/sitemap-0.xml', 
    ],
  },
};