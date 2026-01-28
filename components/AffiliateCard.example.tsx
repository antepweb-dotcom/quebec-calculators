/**
 * AffiliateCard Component - Usage Examples
 * 
 * This file demonstrates different ways to use the AffiliateCard component
 * across various calculators and contexts.
 */

import AffiliateCard from './AffiliateCard';

// Example 1: Wealthsimple CELI (Dark Theme)
export function WealthsimpleCELI() {
  return (
    <AffiliateCard
      title="Ouvrez un compte CELI avec Wealthsimple"
      description="Obtenez 25$ de bonus en vous inscrivant et commencez à investir sans frais de commission. Parfait pour faire fructifier votre salaire net à l'abri de l'impôt."
      buttonText="Profiter de l'offre"
      link="https://wealthsimple.com/fr-ca"
      theme="dark"
    />
  );
}

// Example 2: Questrade REER (Blue Theme)
export function QuestradeREER() {
  return (
    <AffiliateCard
      title="Économisez sur vos impôts avec un REER Questrade"
      description="Jusqu'à 50$ en transactions gratuites pour les nouveaux clients. Investissez intelligemment et réduisez votre revenu imposable dès maintenant."
      buttonText="Ouvrir un compte"
      link="https://questrade.com"
      theme="blue"
    />
  );
}

// Example 3: Tangerine Savings (Green Theme)
export function TangerineSavings() {
  return (
    <AffiliateCard
      title="Compte d'épargne à 5% avec Tangerine"
      description="Obtenez un taux promotionnel de 5% pendant 5 mois sur les nouveaux dépôts. Aucuns frais mensuels, aucun solde minimum requis."
      buttonText="Commencer à épargner"
      link="https://tangerine.ca"
      theme="green"
    />
  );
}

// Example 4: With Logo Image
export function WithLogo() {
  return (
    <AffiliateCard
      title="Investissez avec Wealthsimple"
      description="Plateforme d'investissement #1 au Canada. Gestion automatisée de portefeuille et frais parmi les plus bas de l'industrie."
      buttonText="Commencer maintenant"
      link="https://wealthsimple.com"
      image="/logos/wealthsimple.svg"
      theme="dark"
    />
  );
}

// Example 5: Mortgage Context
export function MortgageBroker() {
  return (
    <AffiliateCard
      title="Trouvez le meilleur taux hypothécaire"
      description="Comparez gratuitement les taux de 30+ prêteurs en 3 minutes. Nos courtiers négocient pour vous et peuvent vous faire économiser des milliers de dollars."
      buttonText="Comparer les taux"
      link="https://nesto.ca"
      theme="blue"
    />
  );
}

// Example 6: Credit Card Context
export function CreditCardOffer() {
  return (
    <AffiliateCard
      title="Carte de crédit avec 10% de cashback"
      description="Obtenez 10% de remise en argent sur vos achats pendant les 3 premiers mois, puis 2% par la suite. Aucuns frais annuels la première année."
      buttonText="Faire une demande"
      link="https://tangerine.ca/carte-credit"
      theme="green"
    />
  );
}

// Example 7: Insurance Context
export function InsuranceQuote() {
  return (
    <AffiliateCard
      title="Économisez sur votre assurance auto"
      description="Comparez les prix de 30+ assureurs en 5 minutes. Les Québécois économisent en moyenne 500$ par année en comparant leurs options."
      buttonText="Obtenir une soumission"
      link="https://kanetix.ca"
      theme="dark"
    />
  );
}

/**
 * INTEGRATION TIPS:
 * 
 * 1. Place after main results for maximum visibility
 * 2. Use contextually relevant offers (CELI for salary, mortgage for home calculators)
 * 3. Match theme to your page design
 * 4. Always include rel="noopener noreferrer sponsored" for affiliate links
 * 5. Test different positions and offers to optimize conversion
 * 6. Consider A/B testing different themes and copy
 */

