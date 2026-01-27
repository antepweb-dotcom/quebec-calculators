import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Quebec Calculators 2026 - Outils Financiers Gratuits'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
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
          background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Main Content Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '140px',
              height: '140px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '30px',
              marginBottom: '40px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              style={{
                fontSize: '80px',
                fontWeight: 'bold',
                color: 'white',
                display: 'flex',
              }}
            >
              QC
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: '20px',
              display: 'flex',
              letterSpacing: '-2px',
            }}
          >
            Quebec Calculators 2026
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '36px',
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              marginBottom: '40px',
              display: 'flex',
              maxWidth: '900px',
            }}
          >
            Impôts, Immobilier, Auto & Famille. Simplifiez vos finances.
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '16px 32px',
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontSize: '32px', display: 'flex' }}>🧮</div>
              <div style={{ fontSize: '28px', color: 'white', display: 'flex', fontWeight: '600' }}>
                19 Outils
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '16px 32px',
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontSize: '32px', display: 'flex' }}>🔒</div>
              <div style={{ fontSize: '28px', color: 'white', display: 'flex', fontWeight: '600' }}>
                100% Gratuit
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '16px 32px',
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontSize: '32px', display: 'flex' }}>✅</div>
              <div style={{ fontSize: '28px', color: 'white', display: 'flex', fontWeight: '600' }}>
                Sécurisé
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.7)',
              display: 'flex',
            }}
          >
            quebec-calculators.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
