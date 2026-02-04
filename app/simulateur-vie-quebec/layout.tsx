import { ReactNode } from 'react';

export default function SimulateurLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Simulateur de Vie au Québec',
    description: 'Calculateur gratuit pour estimer votre salaire net, impôts, coût de la vie et épargne au Québec',
    url: 'https://qcfinance.ca/simulateur-vie-quebec',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD',
    },
    featureList: [
      'Calcul du salaire net après impôts',
      'Estimation du coût de la vie dans 10 villes du Québec',
      'Calcul des impôts fédéraux et provinciaux 2025-2026',
      'Analyse du budget et de l\'épargne',
      'Comparaison entre villes',
      'Recommandations financières personnalisées',
    ],
    provider: {
      '@type': 'Organization',
      name: 'QCFinance.ca',
      url: 'https://qcfinance.ca',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Residents of Quebec',
      geographicArea: {
        '@type': 'Place',
        name: 'Quebec, Canada',
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://qcfinance.ca',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Simulateur de Vie au Québec',
        item: 'https://qcfinance.ca/simulateur-vie-quebec',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Comment fonctionne le simulateur de vie au Québec?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le simulateur calcule votre salaire net après impôts (fédéral et provincial), puis estime vos dépenses mensuelles selon la ville choisie (loyer, épicerie, transport, services). Il vous montre ensuite votre épargne potentielle et votre santé financière.',
        },
      },
      {
        '@type': 'Question',
        name: 'Les taux d\'imposition sont-ils à jour?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, le simulateur utilise les taux d\'imposition officiels 2025-2026 pour le Québec, incluant les impôts fédéraux, provinciaux, RRQ, RQAP et assurance-emploi.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quelles villes sont incluses dans le simulateur?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le simulateur couvre 10 villes majeures du Québec: Montréal, Québec, Laval, Gatineau, Longueuil, Sherbrooke, Saguenay, Lévis, Trois-Rivières et Terrebonne.',
        },
      },
      {
        '@type': 'Question',
        name: 'Le simulateur est-il gratuit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, le simulateur de vie au Québec est 100% gratuit et sans inscription. Vous pouvez l\'utiliser autant de fois que vous le souhaitez.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
