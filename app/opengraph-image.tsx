import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'QC Finance - Votre guide financier au Québec'
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
          background: 'linear-gradient(135deg, #0f766e 0%, #10b981 50%, #14b8a6 100%)',
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
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '160px',
              height: '160px',
              background: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '35px',
              marginBottom: '50px',
              backdropFilter: 'blur(10px)',
              border: '3px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <div
              style={{
                fontSize: '90px',
                fontWeight: 'bold',
                color: 'white',
                display: 'flex',
                letterSpacing: '-3px',
              }}
            >
              QC
            </div>
          </div>

          {/* Brand Name */}
          <div
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: '24px',
              display: 'flex',
              letterSpacing: '-2px',
            }}
          >
            QC Finance
          </div>

          {/* Slogan */}
          <div
            style={{
              fontSize: '42px',
              color: 'rgba(255, 255, 255, 0.95)',
              textAlign: 'center',
              marginBottom: '50px',
              display: 'flex',
              fontWeight: '500',
            }}
          >
            Votre guide financier au Québec
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: '30px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '18px 36px',
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontSize: '32px', display: 'flex' }}>🧮</div>
              <div style={{ fontSize: '28px', color: 'white', display: 'flex', fontWeight: '600' }}>
                19 Calculateurs
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '18px 36px',
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontSize: '32px', display: 'flex' }}>✨</div>
              <div style={{ fontSize: '28px', color: 'white', display: 'flex', fontWeight: '600' }}>
                100% Gratuit
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '18px 36px',
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontSize: '32px', display: 'flex' }}>🇨🇦</div>
              <div style={{ fontSize: '28px', color: 'white', display: 'flex', fontWeight: '600' }}>
                Québec 2026
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: '26px',
              color: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              fontWeight: '500',
            }}
          >
            qcfinance.ca
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

