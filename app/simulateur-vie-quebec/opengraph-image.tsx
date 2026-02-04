import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Simulateur de Vie au Québec - Calculateur Salaire Net & Budget';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

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
          backgroundColor: '#0f172a',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
        }}
      >
        {/* Logo/Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
            }}
          >
            ✨
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#94a3b8',
              letterSpacing: '0.05em',
            }}
          >
            QCFINANCE.CA
          </div>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          Simulateur de Vie
          <br />
          au Québec
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '32px',
            color: '#94a3b8',
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          Calculez votre salaire net, budget et épargne
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            marginBottom: '40px',
          }}
        >
          {['10 Villes', 'Taux 2025-2026', '100% Gratuit'].map((feature) => (
            <div
              key={feature}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                }}
              />
              <span
                style={{
                  fontSize: '20px',
                  color: 'white',
                  fontWeight: '600',
                }}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderRadius: '999px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
            }}
          />
          <span
            style={{
              fontSize: '16px',
              color: '#10b981',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
            }}
          >
            GUIDE ÉTAPE PAR ÉTAPE
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
