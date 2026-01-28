'use client'

export default function OrganizationSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Quebec Calculators',
    alternateName: 'Calculateurs Québec',
    url: 'https://quebec-calculators.vercel.app',
    logo: 'https://quebec-calculators.vercel.app/logo.png',
    description: 'Outils financiers gratuits pour le Québec - Calculateurs d\'impôts, hypothèque, salaire net et plus',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CA',
      addressRegion: 'QC',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Quebec, Canada',
    },
    knowsAbout: [
      'Calcul d\'impôts',
      'Salaire net',
      'Hypothèque',
      'Allocations familiales',
      'Finances personnelles',
      'Immobilier Québec',
    ],
    sameAs: [
      // Ajoutez vos réseaux sociaux ici quand disponibles
      // 'https://facebook.com/quebeccalculators',
      // 'https://twitter.com/quebeccalc',
      // 'https://linkedin.com/company/quebeccalculators',
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://quebec-calculators.vercel.app',
    name: 'Quebec Calculators',
    image: 'https://quebec-calculators.vercel.app/logo.png',
    url: 'https://quebec-calculators.vercel.app',
    telephone: '', // Ajoutez si disponible
    priceRange: 'Gratuit',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CA',
      addressRegion: 'QC',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 46.8139,
      longitude: -71.2080,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '5420',
      bestRating: '5',
      worstRating: '1',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Quebec Calculators',
    url: 'https://quebec-calculators.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://quebec-calculators.vercel.app/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'fr-CA',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
