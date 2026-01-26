import { ImageResponse } from 'next/og'
import { calculateTaxes, formatCurrency } from '@/utils/taxLogic'

export const runtime = 'edge'
export const alt = 'Calculateur d\'Impôt Québec'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { salary: string } }) {
  const salary = parseInt(params.salary.replace(/[^0-9]/g, ''))
  
  if (isNaN(salary) || salary <= 0) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 60,
            background: 'linear-gradient(to bottom right, #f9fafb, #e5e7eb)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <div style={{ color: '#111827', fontWeight: 'bold' }}>
            Calculateur d'Impôt Québec 2026
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  }

  const results = calculateTaxes(salary)

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #f9fafb, #e5e7eb)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '60px',
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: '24px',
            padding: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ fontSize: 48, color: '#6b7280', marginBottom: '20px' }}>
            Salaire Brut
          </div>
          <div style={{ fontSize: 80, fontWeight: 'bold', color: '#111827', marginBottom: '40px' }}>
            {formatCurrency(salary)}
          </div>
          <div style={{ fontSize: 48, color: '#6b7280', marginBottom: '20px' }}>
            Revenu Net
          </div>
          <div style={{ fontSize: 80, fontWeight: 'bold', color: '#10b981' }}>
            {formatCurrency(results.netIncome)}
          </div>
        </div>
        <div style={{ fontSize: 32, color: '#6b7280', marginTop: '40px' }}>
          Calculateur d'Impôt Québec 2026
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
