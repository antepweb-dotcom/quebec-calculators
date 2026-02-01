import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/login', '/api/admin'], // Block admin routes
      },
    ],
    sitemap: [
      'https://qcfinance.ca/sitemap.xml',
      'https://qcfinance.ca/image-sitemap.xml',
    ],
  }
}

