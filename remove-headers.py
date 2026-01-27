#!/usr/bin/env python3
"""
Script to remove Header imports and usage from all page files
since Header is now in the global layout.
"""

import os
import re

# List of files to update
files_to_update = [
    'app/pret-etudiant/page.tsx',
    'app/taux-horaire/page.tsx',
    'app/taxe-de-bienvenue/page.tsx',
    'app/paie-vacances/page.tsx',
    'app/tps-tvq-quebec/page.tsx',
    'app/pret-auto/page.tsx',
    'app/louer-ou-acheter/page.tsx',
    'app/salaire-net-quebec/page.tsx',
    'app/frais-de-garde/page.tsx',
    'app/interets-composes/page.tsx',
    'app/declaration-simplifiee/DeclarationSimplifieeClient.tsx',
    'app/dettes-credit/page.tsx',
    'app/epargne-retraite/page.tsx',
    'app/confidentialite/page.tsx',
    'app/capacite-emprunt/page.tsx',
    'app/assurance-emploi/page.tsx',
    'app/augmentation-loyer-2026/page.tsx',
    'app/calcul-hypotheque/page.tsx',
    'app/allocations-familiales/page.tsx',
    'app/auto-electrique-vs-essence/page.tsx',
    'app/a-propos/page.tsx',
    'app/salaire-net-quebec/[salary]/page.tsx',
]

def remove_header_from_file(filepath):
    """Remove Header import and usage from a file."""
    if not os.path.exists(filepath):
        print(f"⚠️  File not found: {filepath}")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Remove the Header import line
    content = re.sub(r"import Header from ['\"]@/components/Header['\"]\n?", '', content)
    
    # Remove <Header /> usage (with optional whitespace and newlines)
    content = re.sub(r'\s*<Header\s*/>\s*\n?', '', content)
    
    # Remove empty lines that might have been left behind (max 2 consecutive)
    content = re.sub(r'\n\n\n+', '\n\n', content)
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Updated: {filepath}")
        return True
    else:
        print(f"ℹ️  No changes needed: {filepath}")
        return False

def main():
    print("🚀 Removing Header from all page files...\n")
    
    updated_count = 0
    for filepath in files_to_update:
        if remove_header_from_file(filepath):
            updated_count += 1
    
    print(f"\n✨ Done! Updated {updated_count} files.")
    print("📝 Header is now only in app/layout.tsx (global layout)")

if __name__ == '__main__':
    main()
