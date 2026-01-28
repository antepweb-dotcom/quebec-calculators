import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://qcfinance.ca'
  
  // 1. STATIC PAGES (All Tools) - Organized by priority with real dates
  const staticRoutes = [
    // Homepage - Updated frequently
    { route: '', priority: 1.0, changeFrequency: 'daily' as const, lastModified: '2026-01-27' },
    
    // Tax & Income Tools (High Priority) - Updated for 2026 tax year
    { route: '/salaire-net-quebec', priority: 1.0, changeFrequency: 'weekly' as const, lastModified: '2026-01-27' },
    { route: '/declaration-simplifiee', priority: 0.9, changeFrequency: 'weekly' as const, lastModified: '2026-01-20' },
    { route: '/assurance-emploi', priority: 0.9, changeFrequency: 'monthly' as const, lastModified: '2026-01-15' },
    { route: '/taux-horaire', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: '2026-01-10' },
    { route: '/paie-vacances', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: '2026-01-10' },
    { route: '/tps-tvq-quebec', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: '2026-01-10' },
    
    // Real Estate Tools (High Priority) - Updated for 2026 rates
    { route: '/louer-ou-acheter', priority: 0.9, changeFrequency: 'weekly' as const, lastModified: '2026-01-25' },
    { route: '/calcul-hypotheque', priority: 0.9, changeFrequency: 'weekly' as const, lastModified: '2026-01-27' },
    { route: '/capacite-emprunt', priority: 0.9, changeFrequency: 'weekly' as const, lastModified: '2026-01-20' },
    { route: '/taxe-de-bienvenue', priority: 0.9, changeFrequency: 'monthly' as const, lastModified: '2026-01-15' },
    { route: '/augmentation-loyer-2026', priority: 0.9, changeFrequency: 'yearly' as const, lastModified: '2026-01-05' },
    
    // Family & Daily Tools - Updated for 2026 benefits
    { route: '/allocations-familiales', priority: 0.9, changeFrequency: 'monthly' as const, lastModified: '2026-01-27' },
    { route: '/frais-de-garde', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: '2026-01-15' },
    { route: '/auto-electrique-vs-essence', priority: 0.9, changeFrequency: 'monthly' as const, lastModified: '2026-01-20' },
    { route: '/pret-auto', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: '2026-01-10' },
    { route: '/pret-etudiant', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: '2026-01-10' },
    
    // Debt & Planning Tools
    { route: '/dettes-credit', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: '2026-01-10' },
    { route: '/epargne-retraite', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: '2026-01-10' },
    
    // Investment & Retirement Tools
    { route: '/interets-composes', priority: 0.9, changeFrequency: 'monthly' as const, lastModified: '2026-01-22' },
    
    // Static Pages
    { route: '/confidentialite', priority: 0.3, changeFrequency: 'yearly' as const, lastModified: '2025-12-01' },
    { route: '/a-propos', priority: 0.3, changeFrequency: 'yearly' as const, lastModified: '2025-12-01' },
  ].map(({ route, priority, changeFrequency, lastModified }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(lastModified),
    changeFrequency,
    priority,
  }))

  // 2. DYNAMIC SALARY PAGES (Strategic range for SEO)
  // Generate pages for common salary ranges (20k to 150k)
  const salaryRoutes = []
  const salaryLastModified = new Date('2026-01-27')
  for (let salary = 20000; salary <= 150000; salary += 2000) {
    salaryRoutes.push({
      url: `${baseUrl}/salaire-net-quebec/${salary}`,
      lastModified: salaryLastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })
  }

  return [...staticRoutes, ...salaryRoutes]
}

