const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..', 'dist');
const INDEX = path.join(BASE, 'index.html');

const ROUTES = [
  { path: 'index.html', mode: null },
  { path: 'basic/index.html', mode: 'basic' },
  { path: 'scientific/index.html', mode: 'scientific' },
  { path: 'fraction/index.html', mode: 'fraction' },
  { path: 'percentage/index.html', mode: 'percentage' },
  { path: 'timer/index.html', mode: 'timer' },
];

const SEO = {
  basic: {
    title: 'Fullscreen Classic Calculator | Standard Math Mode - OmniCalc Classic',
    description: 'Classic large-screen online calculator. Simple math layout matching the ease of physical desktop calculators. Free, fast keyboard layout support.',
  },
  scientific: {
    title: 'Advanced Scientific Calculator Online | Trigo & Equations - OmniCalc Classic',
    description: 'Multi-function online scientific calculator. Handles trigonometry, logs, bracket resolution, exponents, radians, degrees, and value persistence.',
  },
  fraction: {
    title: 'Interactive Fraction Calculator with Step Simplifier - OmniCalc Classic',
    description: 'Calculate fractions instantly. Add, subtract, multiply, and divide proper and improper fractions with detailed step-by-step math breakdowns.',
  },
  percentage: {
    title: 'Dynamic Percentage Calculator & Growth Tracker - OmniCalc Classic',
    description: 'Calculate fraction changes, margin growth, percentage ratios, and compound rates quickly with our robust template calculators.',
  },
  timer: {
    title: 'Digital Stopwatch & Countdown Egg Timer Online - OmniCalc Classic',
    description: 'Accurate online countdown timer, stopwatch with high-precision lap splits, and audio-alerting egg timer. Simple browser workflow notifications.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'OmniCalc Classic',
  url: 'https://ais-pre-k5knbps4ntmxxa2m5qium2-932553371137.asia-southeast1.run.app/',
  description: 'OmniCalc Classic is the primary online multi-calculator suite.',
  applicationCategory: 'CalculatorApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

const OG_IMAGE = 'https://ais-pre-k5knbps4ntmxxa2m5qium2-932553371137.asia-southeast1.run.app/og-image.svg';
const BASE_URL = 'https://ais-pre-k5knbps4ntmxxa2m5qium2-932553371137.asia-southeast1.run.app';

if (!fs.existsSync(INDEX)) {
  console.error('dist/index.html not found. Run npm run build first.');
  process.exit(1);
}

const html = fs.readFileSync(INDEX, 'utf-8');

ROUTES.forEach(({ path: filePath, mode }) => {
  const meta = mode ? SEO[mode] : SEO.basic;
  const url = mode ? `${BASE_URL}/?mode=${mode}` : BASE_URL;
  const canonical = mode ? `${BASE_URL}/?mode=${mode}` : BASE_URL;

  let output = html
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${meta.description}" />`
    )
    .replace(
      /<meta property="og:title"[^>]*>/,
      `<meta property="og:title" content="${meta.title}" />`
    )
    .replace(
      /<meta property="og:description"[^>]*>/,
      `<meta property="og:description" content="${meta.description}" />`
    )
    .replace(
      /<meta property="og:url"[^>]*>/,
      `<meta property="og:url" content="${url}" />`
    )
    .replace(
      /<link rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${canonical}" />`
    );

  const outDir = path.dirname(path.join(BASE, filePath));
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(path.join(BASE, filePath), output);
  console.log(`Prerendered: ${filePath}`);
});

console.log('Prerendering complete.');
