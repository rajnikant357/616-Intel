import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

console.log('='.repeat(70));
console.log('  616 INTEL — PERFORMANCE BUDGET & REGRESSION CHECKER');
console.log('='.repeat(70));

const DIST_DIR = path.resolve('dist/client');
const ASTRO_ASSETS_DIR = path.join(DIST_DIR, '_astro');

if (!fs.existsSync(DIST_DIR)) {
  console.error('\n❌ Error: dist/client directory not found. Please run "npm run build" first.');
  process.exit(1);
}

let failed = false;

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(2)} KB`;
}

function checkBudget(name, actualBytes, budgetBytes, actualGzipBytes, budgetGzipBytes) {
  const rawPassed = actualBytes <= budgetBytes;
  const gzipPassed = actualGzipBytes <= budgetGzipBytes;
  const passed = rawPassed && gzipPassed;

  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`\n${status} | ${name}`);
  console.log(`   Raw Size:    ${formatBytes(actualBytes)} (Budget: <= ${formatBytes(budgetBytes)}) -> ${rawPassed ? 'OK' : 'EXCEEDED'}`);
  console.log(`   Gzip Size:   ${formatBytes(actualGzipBytes)} (Budget: <= ${formatBytes(budgetGzipBytes)}) -> ${gzipPassed ? 'OK' : 'EXCEEDED'}`);

  if (!passed) failed = true;
  return passed;
}

// 1. Check JS Assets
console.log('\n--- 1. JAVASCRIPT BUDGET VERIFICATION ---');
let totalJsRaw = 0;
let totalJsGzip = 0;
let jsFilesCount = 0;

if (fs.existsSync(ASTRO_ASSETS_DIR)) {
  const files = fs.readdirSync(ASTRO_ASSETS_DIR);
  for (const file of files) {
    if (file.endsWith('.js')) {
      jsFilesCount++;
      const filePath = path.join(ASTRO_ASSETS_DIR, file);
      const content = fs.readFileSync(filePath);
      const rawSize = content.length;
      const gzipSize = zlib.gzipSync(content).length;

      totalJsRaw += rawSize;
      totalJsGzip += gzipSize;

      checkBudget(`JS Bundle: ${file}`, rawSize, 50 * 1024, gzipSize, 25 * 1024);
    }
  }
}

checkBudget('Total First-Party JavaScript', totalJsRaw, 60 * 1024, totalJsGzip, 30 * 1024);

// 2. Check CSS Assets
console.log('\n--- 2. CSS BUDGET VERIFICATION ---');
let totalCssRaw = 0;
let totalCssGzip = 0;

if (fs.existsSync(ASTRO_ASSETS_DIR)) {
  const files = fs.readdirSync(ASTRO_ASSETS_DIR);
  for (const file of files) {
    if (file.endsWith('.css')) {
      const filePath = path.join(ASTRO_ASSETS_DIR, file);
      const content = fs.readFileSync(filePath);
      const rawSize = content.length;
      const gzipSize = zlib.gzipSync(content).length;

      totalCssRaw += rawSize;
      totalCssGzip += gzipSize;

      checkBudget(`CSS Bundle: ${file}`, rawSize, 100 * 1024, gzipSize, 25 * 1024);
    }
  }
}

// 3. Technical SEO Assets Verification
console.log('\n--- 3. TECHNICAL SEO ASSETS CHECK ---');
const robotsPath = path.join(DIST_DIR, 'robots.txt');
const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');

if (fs.existsSync(robotsPath)) {
  const robotsTxt = fs.readFileSync(robotsPath, 'utf-8');
  if (robotsTxt.includes('Sitemap: https://616intel.com/sitemap.xml')) {
    console.log('✅ PASS | robots.txt exists and contains valid sitemap directive');
  } else {
    console.log('❌ FAIL | robots.txt missing sitemap directive');
    failed = true;
  }
} else {
  console.log('❌ FAIL | robots.txt does not exist in dist/client');
  failed = true;
}

if (fs.existsSync(sitemapPath)) {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
  if (sitemapXml.includes('<urlset') && sitemapXml.includes('https://616intel.com')) {
    console.log('✅ PASS | sitemap.xml exists and contains valid urlset XML');
  } else {
    console.log('❌ FAIL | sitemap.xml does not contain valid XML markup');
    failed = true;
  }
} else {
  console.log('❌ FAIL | sitemap.xml does not exist in dist/client');
  failed = true;
}

// 4. Sample HTML Semantic Audit
console.log('\n--- 4. STATIC HTML SEMANTIC AUDIT ---');
// Find first available article directory
let sampleArticle = 'articles/demo-avengers-doomsday-latveria-scouts/index.html';
const articlesDir = path.join(DIST_DIR, 'articles');
if (fs.existsSync(articlesDir)) {
  const articleDirs = fs.readdirSync(articlesDir);
  for (const d of articleDirs) {
    const candidate = path.join('articles', d, 'index.html');
    if (fs.existsSync(path.join(DIST_DIR, candidate))) {
      sampleArticle = candidate;
      break;
    }
  }
}

const sampleHtmlFiles = [
  'index.html',
  'news/index.html',
  'rumors/index.html',
  'leaks/index.html',
  'movies/index.html',
  'characters/index.html',
  'videos/index.html',
  'photos/index.html',
  sampleArticle,
];

for (const relPath of sampleHtmlFiles) {
  const fullPath = path.join(DIST_DIR, relPath);
  if (fs.existsSync(fullPath)) {
    const html = fs.readFileSync(fullPath, 'utf-8');
    
    // Check main
    const hasMain = html.includes('<main') && html.includes('</main>');
    // Check Primary Nav
    const hasNav = html.includes('aria-label="Primary"');
    // Check Single H1
    const h1Matches = html.match(/<h1[\s>]/gi) || [];
    const singleH1 = h1Matches.length === 1;
    // Check JSON-LD
    const hasSchema = html.includes('application/ld+json');

    const passedSemantic = hasMain && hasNav && singleH1 && hasSchema;
    if (passedSemantic) {
      console.log(`✅ PASS | ${relPath} (1 H1, <main>, Primary Nav, Schema JSON-LD)`);
    } else {
      console.log(`❌ FAIL | ${relPath}: main=${hasMain}, nav=${hasNav}, singleH1=${singleH1} (count=${h1Matches.length}), schema=${hasSchema}`);
      failed = true;
    }
  } else {
    console.log(`⚠️ SKIP | Sample file ${relPath} not found (may differ by slug)`);
  }
}

console.log('\n' + '='.repeat(70));
if (failed) {
  console.error('❌ PERFORMANCE BUDGET / AUDIT CHECKS FAILED');
  process.exit(1);
} else {
  console.log('🎉 ALL PERFORMANCE BUDGET & SEMANTIC AUDIT CHECKS PASSED');
  console.log('='.repeat(70));
  process.exit(0);
}
