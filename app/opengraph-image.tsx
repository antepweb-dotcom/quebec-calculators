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
          background: 'linear-gradient(135deg, #0c4a6e 0%, #0891b2 50%, #06b6d4 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Left Side - Icons Grid */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              maxWidth: '400px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>💰</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>🏠</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>🚗</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>👨‍👩‍👧</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>📊</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>💳</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>📈</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>🎓</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '100px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '24px', fontSize: '48px', border: '2px solid rgba(255, 255, 255, 0.2)' }}>⚡</div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 60px',
          }}
        >
          {/* Badge */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              padding: '12px 28px',
              borderRadius: '50px',
              fontSize: '22px',
              color: 'white',
              fontWeight: '700',
              display: 'flex',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              marginBottom: '30px',
              width: 'fit-content',
            }}
          >
            🇨🇦 Québec 2026
          </div>

          {/* Logo + Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100px',
                height: '100px',
                background: 'white',
                borderRadius: '24px',
              }}
            >
              <div
                style={{
                  fontSize: '56px',
                  fontWeight: 'bold',
                  color: '#0891b2',
                  display: 'flex',
                  letterSpacing: '-2px',
                }}
              >
                QC
              </div>
            </div>
            <div
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: 'white',
                display: 'flex',
                letterSpacing: '-2px',
              }}
            >
              QC Finance
            </div>
          </div>

          {/* Slogan */}
          <div
            style={{
              fontSize: '36px',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '40px',
              display: 'flex',
              fontWeight: '500',
            }}
          >
            Votre guide financier au Québec
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginBottom: '40px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%', display: 'flex' }} />
              <div style={{ fontSize: '28px', color: 'white', display: 'flex', fontWeight: '600' }}>
                19 calculateurs gratuits
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%', display: 'flex' }} />
              <div style={{ fontSize: '28px', color: 'white', display: 'flex', fontWeight: '600' }}>
                Impôts • Immobilier • Auto • Famille
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%', display: 'flex' }} />
              <div style={{ fontSize: '28px', color: 'white', display: 'flex', fontWeight: '600' }}>
                Résultats instantanés et précis
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              background: 'white',
              padding: '20px 40px',
              borderRadius: '16px',
              width: 'fit-content',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#0891b2',
                display: 'flex',
              }}
            >
              Commencer Gratuitement
            </div>
            <div style={{ fontSize: '32px', display: 'flex' }}>→</div>
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: '22px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginTop: '40px',
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

