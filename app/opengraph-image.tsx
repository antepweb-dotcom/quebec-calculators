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
          background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 25%, #0891b2 50%, #06b6d4 75%, #22d3ee 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '500px',
            height: '500px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '50%',
            display: 'flex',
          }}
        />

        {/* Left Side - Icons Grid */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 60px',
            gap: '30px',
          }}
        >
          {/* Icon Grid */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              maxWidth: '400px',
            }}
          >
            {['💰', '🏠', '🚗', '👨‍👩‍👧', '📊', '💳', '📈', '🎓', '⚡'].map((emoji, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100px',
                  height: '100px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '24px',
                  fontSize: '48px',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                {emoji}
              </div>
            ))}
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
            position: 'relative',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.25)',
                padding: '12px 28px',
                borderRadius: '50px',
                fontSize: '22px',
                color: 'white',
                fontWeight: '700',
                display: 'flex',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              🇨🇦 Québec 2026
            </div>
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
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              }}
            >
              <div
                style={{
                  fontSize: '56px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                  backgroundClip: 'text',
                  color: 'transparent',
                  display: 'flex',
                  letterSpacing: '-2px',
                }}
              >
                QC
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontSize: '64px',
                  fontWeight: 'bold',
                  color: 'white',
                  display: 'flex',
                  letterSpacing: '-2px',
                  lineHeight: 1,
                }}
              >
                QC Finance
              </div>
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
              lineHeight: 1.3,
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                }}
              />
              <div
                style={{
                  fontSize: '28px',
                  color: 'white',
                  display: 'flex',
                  fontWeight: '600',
                }}
              >
                19 calculateurs gratuits
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                }}
              />
              <div
                style={{
                  fontSize: '28px',
                  color: 'white',
                  display: 'flex',
                  fontWeight: '600',
                }}
              >
                Impôts • Immobilier • Auto • Famille
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                }}
              />
              <div
                style={{
                  fontSize: '28px',
                  color: 'white',
                  display: 'flex',
                  fontWeight: '600',
                }}
              >
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
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'flex',
              }}
            >
              Commencer Gratuitement
            </div>
            <div
              style={{
                fontSize: '32px',
                display: 'flex',
              }}
            >
              →
            </div>
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

