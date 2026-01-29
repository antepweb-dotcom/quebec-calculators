/**
 * Script to find all calculator components with input fields
 * that may need analytics refactoring
 * 
 * Run with: node scripts/find-calculator-inputs.js
 */

const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '..', 'components');
const APP_DIR = path.join(__dirname, '..', 'app');

const calculatorPatterns = [
  /Calculator/i,
  /Client\.tsx$/,
];

const inputPatterns = [
  /onChange=\{/,
  /<input/,
  /<select/,
  /type="range"/,
  /type="number"/,
];

function findFiles(dir, pattern) {
  const results = [];
  
  function walk(currentPath) {
    try {
      const files = fs.readdirSync(currentPath);
      
      for (const file of files) {
        const filePath = path.join(currentPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          // Skip node_modules and .next
          if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
            walk(filePath);
          }
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          results.push(filePath);
        }
      }
    } catch (err) {
      console.error(`Error reading directory ${currentPath}:`, err.message);
    }
  }
  
  walk(dir);
  return results;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(process.cwd(), filePath);
  
  // Check if it's a calculator component
  const isCalculator = calculatorPatterns.some(pattern => pattern.test(relativePath));
  
  if (!isCalculator) return null;
  
  // Check if it has input fields
  const hasInputs = inputPatterns.some(pattern => pattern.test(content));
  
  if (!hasInputs) return null;
  
  // Check if already refactored
  const hasDebounceHook = content.includes('useDebouncedAnalytics') || 
                          content.includes('useCalculatorTracking') ||
                          content.includes('useButtonTracking');
  
  // Count onChange handlers
  const onChangeCount = (content.match(/onChange=\{/g) || []).length;
  
  // Check for tracking calls
  const hasTracking = content.includes('gtag') || 
                      content.includes('trackEvent') ||
                      content.includes('sendGAEvent') ||
                      content.includes('analytics');
  
  return {
    path: relativePath,
    refactored: hasDebounceHook,
    onChangeCount,
    hasTracking,
    priority: hasTracking && !hasDebounceHook ? 'HIGH' : 'MEDIUM',
  };
}

function main() {
  console.log('🔍 Scanning for calculator components...\n');
  
  const componentFiles = findFiles(COMPONENTS_DIR);
  const appFiles = findFiles(APP_DIR);
  const allFiles = [...componentFiles, ...appFiles];
  
  const results = allFiles
    .map(analyzeFile)
    .filter(Boolean)
    .sort((a, b) => {
      // Sort by priority, then by onChange count
      if (a.priority !== b.priority) {
        return a.priority === 'HIGH' ? -1 : 1;
      }
      return b.onChangeCount - a.onChangeCount;
    });
  
  console.log(`Found ${results.length} calculator components\n`);
  
  const refactored = results.filter(r => r.refactored);
  const needsRefactoring = results.filter(r => !r.refactored);
  
  console.log('✅ Already Refactored:', refactored.length);
  console.log('⚠️  Needs Refactoring:', needsRefactoring.length);
  console.log('');
  
  if (refactored.length > 0) {
    console.log('✅ REFACTORED COMPONENTS:');
    console.log('─'.repeat(80));
    refactored.forEach(r => {
      console.log(`  ${r.path}`);
      console.log(`    └─ ${r.onChangeCount} input handlers`);
    });
    console.log('');
  }
  
  if (needsRefactoring.length > 0) {
    console.log('⚠️  COMPONENTS NEEDING REFACTORING:');
    console.log('─'.repeat(80));
    needsRefactoring.forEach(r => {
      const priorityIcon = r.priority === 'HIGH' ? '🔴' : '🟡';
      console.log(`${priorityIcon} ${r.path}`);
      console.log(`    ├─ Priority: ${r.priority}`);
      console.log(`    ├─ Input handlers: ${r.onChangeCount}`);
      console.log(`    └─ Has tracking: ${r.hasTracking ? 'YES' : 'NO'}`);
      console.log('');
    });
  }
  
  console.log('─'.repeat(80));
  console.log(`\n📊 Summary:`);
  console.log(`   Total calculators: ${results.length}`);
  console.log(`   Refactored: ${refactored.length} (${Math.round(refactored.length / results.length * 100)}%)`);
  console.log(`   Remaining: ${needsRefactoring.length} (${Math.round(needsRefactoring.length / results.length * 100)}%)`);
  console.log(`   High priority: ${needsRefactoring.filter(r => r.priority === 'HIGH').length}`);
  console.log('');
  console.log('💡 Next steps:');
  console.log('   1. Refactor HIGH priority components first (they have tracking)');
  console.log('   2. Follow the pattern in ANALYTICS_REFACTORING_GUIDE.md');
  console.log('   3. Test each component after refactoring');
  console.log('   4. Run this script again to track progress\n');
}

main();
