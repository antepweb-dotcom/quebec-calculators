'use client'

import { useEffect } from 'react';

const tools = [
  { name: 'Salaire Net Québec', href: '/salaire-net-quebec', keywords: ['salaire', 'net', 'impot', 'revenu', 'paie'] },
  { name: 'Calcul Hypothécaire', href: '/calcul-hypotheque', keywords: ['hypotheque', 'maison', 'pret', 'immobilier'] },
  { name: 'Déclaration Simplifiée', href: '/declaration-simplifiee', keywords: ['impot', 'declaration', 'retour', 'remboursement'] },
  { name: 'Assurance-Emploi', href: '/assurance-emploi', keywords: ['chomage', 'ae', 'emploi', 'prestation'] },
  { name: 'Allocations Familiales', href: '/allocations-familiales', keywords: ['famille', 'enfant', 'allocation', 'aide'] },
  { name: 'Frais de Garde', href: '/frais-de-garde', keywords: ['garde', 'cpe', 'enfant', 'garderie'] },
  { name: 'Louer ou Acheter', href: '/louer-ou-acheter', keywords: ['louer', 'acheter', 'maison', 'appartement'] },
  { name: 'Capacité d\'Emprunt', href: '/capacite-emprunt', keywords: ['emprunt', 'pret', 'banque', 'credit'] },
  { name: 'Taxe de Bienvenue', href: '/taxe-de-bienvenue', keywords: ['taxe', 'bienvenue', 'mutation', 'maison'] },
  { name: 'Augmentation de Loyer', href: '/augmentation-loyer-2026', keywords: ['loyer', 'augmentation', 'tal', 'locataire'] },
  { name: 'Taux Horaire', href: '/taux-horaire', keywords: ['taux', 'horaire', 'salaire', 'heure'] },
  { name: 'TPS/TVQ', href: '/tps-tvq-quebec', keywords: ['tps', 'tvq', 'taxe', 'vente'] },
  { name: 'Épargne-Retraite', href: '/epargne-retraite', keywords: ['retraite', 'epargne', 'reer', 'investissement'] },
  { name: 'Remboursement Dettes', href: '/dettes-credit', keywords: ['dette', 'credit', 'remboursement', 'pret'] },
  { name: 'Prêt Auto', href: '/pret-auto', keywords: ['auto', 'voiture', 'pret', 'financement'] },
  { name: 'Prêt Étudiant', href: '/pret-etudiant', keywords: ['etudiant', 'pret', 'afr', 'ecole'] },
  { name: 'Intérêts Composés', href: '/interets-composes', keywords: ['interet', 'compose', 'investissement', 'epargne'] },
  { name: 'Auto Électrique vs Essence', href: '/auto-electrique-vs-essence', keywords: ['auto', 'electrique', 'essence', 'voiture'] },
];

export default function HeroSearch() {
  useEffect(() => {
    const searchInput = document.getElementById('hero-search') as HTMLInputElement;
    const searchResults = document.getElementById('hero-search-results');
    const resultsContainer = document.getElementById('hero-results-container');

    if (!searchInput || !searchResults || !resultsContainer) return;

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const query = target.value.toLowerCase().trim();
      
      if (query.length === 0) {
        searchResults.classList.add('hidden');
        return;
      }

      const filtered = tools.filter(tool => {
        const nameMatch = tool.name.toLowerCase().includes(query);
        const keywordMatch = tool.keywords.some(keyword => keyword.includes(query));
        return nameMatch || keywordMatch;
      });

      if (filtered.length > 0) {
        resultsContainer.innerHTML = filtered.map(tool => `
          <a href="${tool.href}" class="block px-5 py-3 hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 transition-colors border-b border-gray-100 last:border-b-0">
            <span class="font-semibold text-base">${tool.name}</span>
          </a>
        `).join('');
      } else {
        resultsContainer.innerHTML = `
          <div class="px-5 py-8 text-center">
            <div class="text-sm text-gray-500">Aucun outil trouvé pour "<strong>${query}</strong>"</div>
          </div>
        `;
      }
      
      searchResults.classList.remove('hidden');
      searchResults.style.opacity = '0';
      searchResults.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        searchResults.style.transition = 'all 0.2s ease-out';
        searchResults.style.opacity = '1';
        searchResults.style.transform = 'translateY(0)';
      }, 10);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!searchInput.contains(target) && !searchResults.contains(target)) {
        searchResults.classList.add('hidden');
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        searchResults.classList.add('hidden');
        searchInput.blur();
      }
    };

    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
    };

    searchInput.addEventListener('input', handleInput);
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleShortcut);

    return () => {
      searchInput.removeEventListener('input', handleInput);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  return (
    <div className="mb-8 max-w-2xl mx-auto lg:mx-0">
      <div className="relative z-[9999]">
        <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text" 
          id="hero-search"
          placeholder="Rechercher un outil (ex: salaire, hypothèque, impôt)..." 
          className="w-full pl-14 pr-20 py-4 text-base border-2 border-gray-300 rounded-full focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:outline-none transition-all shadow-lg hover:shadow-xl bg-white relative z-[9999]"
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium hidden sm:block pointer-events-none">
          ⌘K
        </div>

        <div id="hero-search-results" className="hidden absolute left-0 right-0 top-full mt-3 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-h-[400px] overflow-y-auto z-[9999]">
          <div id="hero-results-container"></div>
        </div>
      </div>
    </div>
  );
}

