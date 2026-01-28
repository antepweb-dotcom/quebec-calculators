#!/usr/bin/env node

/**
 * Lighthouse Performance Test Script
 * 
 * Usage:
 *   node scripts/test-lighthouse.js
 * 
 * Requirements:
 *   npm install -g lighthouse
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '..', 'lighthouse-reports');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const reportPath = path.join(OUTPUT_DIR, `report-${timestamp}.html`);
const jsonPath = path.join(OUTPUT_DIR, `report-${timestamp}.json`);

console.log('🚀 Starting Lighthouse audit...');
console.log(`📍 Testing URL: ${SITE_URL}`);
console.log(`📁 Output directory: ${OUTPUT_DIR}`);

const lighthouseCmd = `lighthouse ${SITE_URL} \
  --output=html,json \
  --output-path=${path.join(OUTPUT_DIR, `report-${timestamp}`)} \
  --chrome-flags="--headless --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo \
  --throttling-method=simulate \
  --preset=desktop`;

exec(lighthouseCmd, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Lighthouse audit failed:', error);
    return;
  }

  console.log('\n✅ Lighthouse audit completed!');
  console.log(`📊 HTML Report: ${reportPath}`);
  console.log(`📄 JSON Report: ${jsonPath}`);

  // Try to read and display scores
  try {
    const jsonReport = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const categories = jsonReport.categories;

    console.log('\n📈 Scores:');
    console.log(`   Performance:     ${Math.round(categories.performance.score * 100)}/100`);
    console.log(`   Accessibility:   ${Math.round(categories.accessibility.score * 100)}/100`);
    console.log(`   Best Practices:  ${Math.round(categories['best-practices'].score * 100)}/100`);
    console.log(`   SEO:             ${Math.round(categories.seo.score * 100)}/100`);

    // Check if scores meet targets
    const targets = {
      performance: 85,
      accessibility: 95,
      'best-practices': 95,
      seo: 95
    };

    console.log('\n🎯 Target Comparison:');
    let allPassed = true;
    for (const [key, target] of Object.entries(targets)) {
      const score = Math.round(categories[key].score * 100);
      const passed = score >= target;
      const emoji = passed ? '✅' : '❌';
      console.log(`   ${emoji} ${key}: ${score}/100 (target: ${target})`);
      if (!passed) allPassed = false;
    }

    if (allPassed) {
      console.log('\n🎉 All targets met!');
    } else {
      console.log('\n⚠️  Some targets not met. Check the report for details.');
    }

  } catch (err) {
    console.error('⚠️  Could not parse JSON report:', err.message);
  }

  console.log('\n💡 Tip: Open the HTML report in your browser to see detailed recommendations.');
});
