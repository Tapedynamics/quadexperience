#!/usr/bin/env node

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs/promises';
import path from 'path';

const CONFIG = {
  // URLs to test (add your deployment URL here)
  urls: [
    'http://localhost:4321', // Italian (default)
    'http://localhost:4321/en', // English
    'http://localhost:4321/es', // Spanish
    'http://localhost:4321/fr', // French
  ],
  // Lighthouse options
  options: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
  },
  // Score thresholds (0-100)
  thresholds: {
    performance: 90,
    accessibility: 90,
    'best-practices': 90,
    seo: 90,
  },
};

async function runLighthouse(url, chrome) {
  console.log(`\n🔍 Running Lighthouse for: ${url}`);

  const runnerResult = await lighthouse(url, CONFIG.options, null, chrome.port);
  const { lhr } = runnerResult;

  // Extract scores
  const scores = {
    performance: Math.round(lhr.categories.performance.score * 100),
    accessibility: Math.round(lhr.categories.accessibility.score * 100),
    'best-practices': Math.round(lhr.categories['best-practices'].score * 100),
    seo: Math.round(lhr.categories.seo.score * 100),
  };

  // Check if scores meet thresholds
  const results = Object.entries(scores).map(([category, score]) => {
    const threshold = CONFIG.thresholds[category];
    const passed = score >= threshold;
    const emoji = passed ? '✅' : '❌';
    const status = passed ? 'PASS' : 'FAIL';

    return {
      category,
      score,
      threshold,
      passed,
      display: `${emoji} ${category.toUpperCase()}: ${score}/100 (threshold: ${threshold}) - ${status}`,
    };
  });

  return {
    url,
    scores,
    results,
    passed: results.every(r => r.passed),
    report: runnerResult.report,
  };
}

async function main() {
  console.log('🚀 Starting Lighthouse Performance Tests');
  console.log('========================================\n');

  let chrome;
  let allPassed = true;
  const testResults = [];

  try {
    // Launch Chrome
    console.log('🌐 Launching Chrome...');
    chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

    // Test each URL
    for (const url of CONFIG.urls) {
      const result = await runLighthouse(url, chrome);
      testResults.push(result);

      // Display results
      console.log(`\n📊 Results for ${url}:`);
      console.log('─'.repeat(50));
      result.results.forEach(r => console.log(r.display));

      if (!result.passed) {
        allPassed = false;
      }

      // Save detailed report
      const urlSlug = url.replace(/[^a-zA-Z0-9]/g, '-');
      const reportPath = path.join(process.cwd(), 'lighthouse-reports', `${urlSlug}.html`);

      try {
        await fs.mkdir(path.dirname(reportPath), { recursive: true });
        await fs.writeFile(reportPath, result.report);
        console.log(`📄 Detailed report saved: ${reportPath}`);
      } catch (error) {
        console.warn(`⚠️  Could not save report: ${error.message}`);
      }
    }

    // Summary
    console.log('\n🎯 SUMMARY');
    console.log('='.repeat(50));

    testResults.forEach(result => {
      const status = result.passed ? '✅ PASS' : '❌ FAIL';
      const avgScore = Math.round(
        Object.values(result.scores).reduce((a, b) => a + b, 0) / 4
      );
      console.log(`${status} ${result.url} (avg: ${avgScore}/100)`);
    });

    const totalTests = testResults.length;
    const passedTests = testResults.filter(r => r.passed).length;

    console.log(`\n📈 Overall: ${passedTests}/${totalTests} tests passed`);

    if (allPassed) {
      console.log('🎉 All Lighthouse tests passed! ');
    } else {
      console.log('💡 Some tests failed. Check the reports for optimization opportunities.');
    }

    // Exit with appropriate code
    process.exit(allPassed ? 0 : 1);
  } catch (error) {
    console.error('❌ Error running Lighthouse tests:', error);
    process.exit(1);
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
}

// Handle CLI arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Lighthouse Performance Testing Tool

Usage:
  npm run lighthouse              Run tests on localhost:4321
  npm run lighthouse -- --help   Show this help message

Configuration:
  Edit scripts/lighthouse.js to modify URLs, thresholds, or options.

Reports:
  Detailed HTML reports are saved to ./lighthouse-reports/
`);
  process.exit(0);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}