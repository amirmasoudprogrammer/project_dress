// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'http://localhost:3000', // آدرس دامنه واقعی سایتت رو اینجا بذار
    generateRobotsTxt: true,            // فایل robots.txt هم بسازه
    changefreq: 'weekly',               // هر چند وقت محتوای سایت تغییر می‌کنه
    priority: 0.7,                      // اولویت صفحات در سئو
    sitemapSize: 5000,                  // حداکثر مسیر در هر فایل sitemap
    exclude: ['/admin', '/private'],   // مسیرهایی که نمی‌خوای داخل sitemap باشن
};
