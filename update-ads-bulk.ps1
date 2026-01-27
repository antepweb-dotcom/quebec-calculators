# Bulk update script to add ads to all calculator pages

$pages = @(
  @{file="app/pret-etudiant/page.tsx"; component="StudentLoanCalculator"},
  @{file="app/dettes-credit/page.tsx"; component="DebtCalculator"},
  @{file="app/frais-de-garde/page.tsx"; component="DaycareCalculator"},
  @{file="app/epargne-retraite/page.tsx"; component="RetirementCalculator"},
  @{file="app/assurance-emploi/page.tsx"; component="EICalculator"},
  @{file="app/paie-vacances/page.tsx"; component="VacationPayCalculator"},
  @{file="app/taux-horaire/page.tsx"; component="WageConverter"},
  @{file="app/taxe-de-bienvenue/page.tsx"; component="TransferTaxCalculator"},
  @{file="app/declaration-simplifiee/page.tsx"; component="DeclarationSimplifiee"}
)

Write-Host "Files to update: $($pages.Count)"
Write-Host "Please update manually using strReplace tool"
