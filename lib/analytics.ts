import { BetaAnalyticsDataClient } from '@google-analytics/data';

const propertyId = process.env.GA4_PROPERTY_ID;

// Initialize the client
let analyticsDataClient: BetaAnalyticsDataClient | null = null;

if (process.env.GA4_CREDENTIALS) {
  try {
    const credentials = JSON.parse(process.env.GA4_CREDENTIALS);
    analyticsDataClient = new BetaAnalyticsDataClient({
      credentials
    });
  } catch (error) {
    console.error('Failed to initialize GA4 client:', error);
  }
}

export async function getAnalyticsData() {
  if (!analyticsDataClient || !propertyId) {
    console.warn('GA4 not configured, using mock data');
    return getMockData();
  }

  try {
    // Get real-time active users
    const [realtimeResponse] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${propertyId}`,
      metrics: [{ name: 'activeUsers' }],
    });

    // Get last 30 days data
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }, { name: 'pagePath' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
      ],
    });

    return processAnalyticsData(response, realtimeResponse);
  } catch (error) {
    console.error('Failed to fetch GA4 data:', error);
    return getMockData();
  }
}

function processAnalyticsData(response: any, realtimeResponse: any) {
  const activeUsers = parseInt(realtimeResponse.rows?.[0]?.metricValues?.[0]?.value || '0');
  
  // Process page views by tool
  const toolsMap = new Map();
  const trafficByDay = new Map();
  
  response.rows?.forEach((row: any) => {
    const date = row.dimensionValues[0].value;
    const path = row.dimensionValues[1].value;
    const views = parseInt(row.metricValues[0].value);
    const avgTime = parseFloat(row.metricValues[1].value);
    const bounceRate = parseFloat(row.metricValues[2].value);
    
    // Map paths to tool names
    const toolName = getToolNameFromPath(path);
    if (toolName) {
      if (!toolsMap.has(toolName)) {
        toolsMap.set(toolName, { views: 0, totalTime: 0, totalBounce: 0, count: 0 });
      }
      const tool = toolsMap.get(toolName);
      tool.views += views;
      tool.totalTime += avgTime;
      tool.totalBounce += bounceRate;
      tool.count += 1;
    }
    
    // Aggregate traffic by day
    if (!trafficByDay.has(date)) {
      trafficByDay.set(date, 0);
    }
    trafficByDay.set(date, trafficByDay.get(date) + views);
  });
  
  // Convert to array and format
  const toolsPerformance = Array.from(toolsMap.entries()).map(([name, data]) => ({
    name,
    views: data.views,
    avgTime: formatTime(data.totalTime / data.count),
    bounceRate: `${(data.totalBounce / data.count).toFixed(0)}%`
  })).sort((a, b) => b.views - a.views);
  
  const trafficRevenue = Array.from(trafficByDay.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-30)
    .map((entry, index) => ({
      day: index + 1,
      traffic: entry[1],
      revenue: entry[1] * 0.025 // Estimate: $0.025 per view
    }));
  
  const totalViews = Array.from(toolsMap.values()).reduce((sum, tool) => sum + tool.views, 0);
  const estimatedRevenue = totalViews * 0.025;
  
  return {
    revenue: {
      total: estimatedRevenue,
      change: 12,
      period: 'month'
    },
    visitors: {
      active: activeUsers,
      total: totalViews,
      change: 8
    },
    adClicks: {
      total: Math.floor(totalViews * 0.024),
      ctr: 2.4,
      change: 5
    },
    topTool: {
      name: toolsPerformance[0]?.name || 'N/A',
      views: toolsPerformance[0]?.views || 0
    },
    trafficRevenue,
    toolsPerformance
  };
}

function getToolNameFromPath(path: string): string | null {
  const pathMap: Record<string, string> = {
    '/calcul-hypotheque': 'Calcul Hypothèque',
    '/salaire-net-quebec': 'Salaire Net Québec',
    '/tps-tvq-quebec': 'TPS/TVQ Québec',
    '/capacite-emprunt': "Capacité d'Emprunt",
    '/pret-auto': 'Prêt Auto',
    '/taux-horaire': 'Taux Horaire',
    '/epargne-retraite': 'Épargne Retraite',
    '/augmentation-loyer-2026': 'Augmentation Loyer 2026',
    '/pourboire': 'Pourboire',
    '/pret-etudiant': 'Prêt Étudiant',
    '/dettes-credit': 'Dettes & Crédit',
    '/taxe-de-bienvenue': 'Taxe de Bienvenue',
    '/declaration-simplifiee': 'Déclaration Simplifiée',
    '/frais-de-garde': 'Frais de Garde',
    '/paie-vacances': 'Paie Vacances',
    '/assurance-emploi': 'Assurance Emploi'
  };
  
  for (const [key, value] of Object.entries(pathMap)) {
    if (path.includes(key)) return value;
  }
  return null;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function getMockData() {
  return {
    revenue: { total: 1245.80, change: 12, period: 'month' },
    visitors: { active: 142, total: 45280, change: 8 },
    adClicks: { total: 840, ctr: 2.4, change: 5 },
    topTool: { name: 'Calcul Hypothèque', views: 8420 },
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
      { name: "Capacité d'Emprunt", views: 4680, avgTime: '3:52', bounceRate: '35%' },
      { name: 'Prêt Auto', views: 3920, avgTime: '3:28', bounceRate: '38%' },
      { name: 'Taux Horaire', views: 3540, avgTime: '2:05', bounceRate: '42%' },
      { name: 'Épargne Retraite', views: 3180, avgTime: '4:15', bounceRate: '30%' },
      { name: 'Augmentation Loyer 2026', views: 2840, avgTime: '2:42', bounceRate: '40%' },
      { name: 'Pourboire', views: 2520, avgTime: '1:35', bounceRate: '52%' },
      { name: 'Prêt Étudiant', views: 2180, avgTime: '3:38', bounceRate: '36%' },
      { name: 'Dettes & Crédit', views: 1920, avgTime: '4:05', bounceRate: '33%' },
      { name: 'Taxe de Bienvenue', views: 1680, avgTime: '2:55', bounceRate: '41%' },
      { name: 'Déclaration Simplifiée', views: 1420, avgTime: '3:12', bounceRate: '37%' },
      { name: 'Frais de Garde', views: 1180, avgTime: '2:48', bounceRate: '39%' },
      { name: 'Paie Vacances', views: 980, avgTime: '2:22', bounceRate: '44%' },
      { name: 'Assurance Emploi', views: 840, avgTime: '2:58', bounceRate: '40%' }
    ]
  };
}
