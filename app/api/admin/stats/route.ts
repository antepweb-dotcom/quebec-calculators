import { NextResponse } from 'next/server'

// This would normally come from a database
// For now, we'll use mock data that looks realistic
export async function GET() {
  const stats = {
    revenue: {
      total: 1245.80,
      change: 12,
      period: 'month'
    },
    visitors: {
      active: 142,
      total: 45280,
      change: 8
    },
    adClicks: {
      total: 840,
      ctr: 2.4,
      change: 5
    },
    topTool: {
      name: 'Calcul Hypothèque',
      views: 8420
    },
    trafficRevenue: [
      { day: 1, traffic: 1200, revenue: 28.5 },
      { day: 5, traffic: 1450, revenue: 35.2 },
      { day: 10, traffic: 1680, revenue: 42.8 },
      { day: 15, traffic: 1920, revenue: 48.3 },
      { day: 20, traffic: 2100, revenue: 52.7 },
      { day: 25, traffic: 2350, revenue: 58.9 },
      { day: 30, traffic: 2580, revenue: 65.4 }
    ],
    toolsPerformance: [
      { name: 'Calcul Hypothèque', views: 8420, avgTime: '4:32', bounceRate: '32%' },
      { name: 'Salaire Net Québec', views: 7850, avgTime: '3:45', bounceRate: '28%' },
      { name: 'TPS/TVQ Québec', views: 5240, avgTime: '2:18', bounceRate: '45%' },
      { name: 'Capacité d\'Emprunt', views: 4680, avgTime: '3:52', bounceRate: '35%' },
      { name: 'Prêt Auto', views: 3920, avgTime: '3:28', bounceRate: '38%' },
      { name: 'Taux Horaire', views: 3540, avgTime: '2:05', bounceRate: '42%' },
      { name: 'Épargne Retraite', views: 3180, avgTime: '4:15', bounceRate: '30%' },
      { name: 'Augmentation Loyer 2026', views: 2840, avgTime: '2:42', bounceRate: '40%' },
      { name: 'Pourboire', views: 2520, avgTime: '1:35', bounceRate: '52%' },
      { name: 'Prêt Étudiant', views: 2180, avgTime: '3:38', bounceRate: '36%' },
      { name: 'Dettes & Crédit', views: 1920, avgTime: '4:05', bounceRate: '33%' },
      { name: 'Taxe de Bienvenue', views: 1680, avgTime: '2:55', bounceRate: '41%' },
      { name: 'Inflation', views: 1420, avgTime: '3:12', bounceRate: '37%' },
      { name: 'Frais de Garde', views: 1180, avgTime: '2:48', bounceRate: '39%' },
      { name: 'Paie Vacances', views: 980, avgTime: '2:22', bounceRate: '44%' },
      { name: 'Assurance Emploi', views: 840, avgTime: '2:58', bounceRate: '40%' }
    ]
  }

  return NextResponse.json(stats)
}
