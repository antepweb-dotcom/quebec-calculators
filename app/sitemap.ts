import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://quebec-calculators.vercel.app'
  const currentDate = new Date()
  
  // 1. STATIC PAGES (All Tools) - Organized by priority
  const staticRoutes = [
    // Homepage
    { route: '', priority: 1.0, changeFrequency: 'daily' as const },
    
    // Tax & Income Tools (High Priority)
    { route: '/salaire-net-quebec', priority: 1.0, changeFrequency: 'weekly' as const },
    { route: '/declaration-simplifiee', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/assurance-emploi', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/taux-horaire', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/paie-vacances', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/tps-tvq-quebec', priority: 0.8, changeFrequency: 'weekly' as const },
    
    // Real Estate Tools (High Priority)
    { route: '/louer-ou-acheter', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/calcul-hypotheque', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/capacite-emprunt', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/taxe-de-bienvenue', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/augmentation-loyer-2026', priority: 0.9, changeFrequency: 'monthly' as const },
    
    // Family & Daily Tools
    { route: '/allocations-familiales', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/frais-de-garde', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/auto-electrique-vs-essence', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/pret-auto', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/pret-etudiant', priority: 0.8, changeFrequency: 'weekly' as const },
    
    // Debt & Planning Tools
    { route: '/dettes-credit', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/epargne-retraite', priority: 0.8, changeFrequency: 'weekly' as const },
    
    // Investment & Retirement Tools
    { route: '/interets-composes', priority: 0.9, changeFrequency: 'weekly' as const },
    
    // Static Pages
    { route: '/confidentialite', priority: 0.3, changeFrequency: 'monthly' as const },
    { route: '/a-propos', priority: 0.3, changeFrequency: 'monthly' as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency,
    priority,
  }))

  // 2. DYNAMIC SALARY PAGES (Strategic range for SEO)
  // Generate pages for common salary ranges (20k to 150k)
  const salaryRoutes = []
  for (let salary = 20000; salary <= 150000; salary += 2000) {
    salaryRoutes.push({
      url: `${baseUrl}/salaire-net-quebec/${salary}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })
  }

  return [...staticRoutes, ...salaryRoutes]
}
