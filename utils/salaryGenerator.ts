// Common salary amounts for programmatic SEO
export const COMMON_SALARIES = [
  // Entry level
  30000, 35000, 40000, 45000,
  // Mid-level
  50000, 55000, 60000, 65000, 70000, 75000, 80000,
  // Senior level
  85000, 90000, 95000, 100000, 110000, 120000,
  // Executive level
  130000, 140000, 150000, 175000, 200000, 250000, 300000,
]

// Generate salary URLs for sitemap
export function generateSalaryUrls(baseUrl: string): string[] {
  return COMMON_SALARIES.map(salary => `${baseUrl}/salaire-net-quebec/${salary}`)
}

// Format salary for URL (e.g., 50000 or 50k)
export function formatSalaryForUrl(salary: number): string {
  return salary.toString()
}

// Parse salary from URL parameter
export function parseSalaryFromUrl(param: string): number | null {
  // Remove any non-numeric characters except 'k'
  const cleaned = param.toLowerCase().replace(/[^0-9k]/g, '')
  
  // Handle 'k' notation (e.g., 50k = 50000)
  if (cleaned.includes('k')) {
    const num = parseInt(cleaned.replace('k', ''))
    return isNaN(num) ? null : num * 1000
  }
  
  const num = parseInt(cleaned)
  return isNaN(num) ? null : num
}
