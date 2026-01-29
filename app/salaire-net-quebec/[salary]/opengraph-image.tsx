import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Calculateur Salaire Net Québec 2026'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { salary: string } }) {
  const salaryNum = parseInt(params.salary)
  const formattedSalary = salaryNum.toLocaleString('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0
  })

  // Rough net calculation for OG image
  const estimatedNetPercentage = salaryNum < 50000 ? 0.75 : salaryNum < 100000 ? 0.70 : 0.65
  const estimatedNet = Math.round(salaryNum * estimatedNetPercentage)
  const formattedNet = estimatedNet.toLocaleString('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0
  })

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          backgroundImage: 'linear-gradient(to bottom right, #e0f2fe, #dbeafe)',
        }}
      >
        {/* Logo/Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#10b981',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '9999px',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '40px',
          }}
        >
          QC Finance • 2026
        </div>

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 80px',
          }}
        >
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              color: '#0f172a',
              marginBottom: '20px',
              lineHeight: 1.2,
            }}
          >
            Salaire Net sur
          </h1>
          <div
            style={{
              fontSize: '96px',
              fontWeight: 'bold',
              color: '#10b981',
              marginBottom: '30px',
            }}
          >
            {formattedSalary}
          </div>
          <div
            style={{
              fontSize: '40px',
              color: '#475569',
              marginBottom: '40px',
            }}
          >
            ≈ {formattedNet} net/an
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#64748b',
              backgroundColor: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            Calcul complet • Impôts • RRQ • RQAP • AE
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '20px',
            color: '#94a3b8',
          }}
        >
          qcfinance.ca/salaire-net-quebec
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
