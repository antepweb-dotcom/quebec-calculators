import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://seninsiten.com' // CANLIYA ALINCA BURAYI KENDİ DOMAININ YAP
  
  // 1. STATİK SAYFALAR (Tüm Araçlar)
  const staticRoutes = [
    '', // Ana Sayfa
    '/salaire-net-quebec',
    '/augmentation-loyer-2026',
    '/taxe-de-bienvenue',
    '/tps-tvq-quebec',
    '/calcul-hypotheque',
    '/capacite-emprunt',
    '/pret-auto',
    '/pret-etudiant',
    '/frais-de-garde',
    '/inflation',
    '/assurance-emploi',
    '/epargne-retraite',
    '/dettes-credit',
    '/paie-vacances',
    '/pourboire',
    '/taux-horaire',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.9,
  }))

  // 2. DİNAMİK MAAŞ SAYFALARI (Sadece en popülerleri)
  // 5.000 tane yerine stratejik 20-150k arası üretelim, build süresi uzamasın
  const salaryRoutes = []
  for (let salary = 20000; salary <= 150000; salary += 2000) {
    salaryRoutes.push({
      url: `${baseUrl}/salaire-net-quebec/${salary}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })
  }

  return [...staticRoutes, ...salaryRoutes]
}