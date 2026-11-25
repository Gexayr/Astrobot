// Prerenders each route to static HTML with its own <head>, so search engines get real content.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SITE = (process.env.SITE_URL ?? 'https://astrobot.amsoft.am').replace(/\/$/, '');
const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'dist/public');
const { render, faqs } = await import(pathToFileURL(path.join(root, 'dist/server/entry-server.js')).href);
const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
const today = new Date().toISOString().slice(0, 10);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

const homeLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'AstroBot AI Robot Toy',
    alternateName: ['AstroBot', 'Astro Bot robot toy'],
    description:
      'AstroBot is an interactive, programmable AI robot toy for kids and makers. It walks, talks, dances, reacts to your voice and learns new tricks.',
    image: [`${SITE}/og-image.jpg`],
    brand: { '@type': 'Brand', name: 'AstroBot', sameAs: 'https://www.instagram.com/astrobot22/' },
    category: 'Toys & Games > Toys > Robotic Toys',
    offers: {
      '@type': 'Offer',
      url: `${SITE}/#pricing`,
      price: '199.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/PreOrder',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
  { '@context': 'https://schema.org', '@type': 'WebSite', name: 'AstroBot', url: `${SITE}/` },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AstroBot',
    url: `${SITE}/`,
    logo: `${SITE}/favicon.svg`,
    email: 'privacy-astrobot@amsoft.am',
    sameAs: ['https://www.instagram.com/astrobot22/'],
  },
];

const routes = [
  {
    url: '/',
    file: 'index.html',
    title: 'AstroBot | AI Robot Toy for Kids That Walks, Talks and Dances',
    description:
      'AstroBot is an interactive AI robot toy for kids and makers: it walks, talks, dances, reacts to your voice and is programmable. Pre-order the smart robot toy for $199.',
    jsonLd: homeLd,
  },
  {
    url: '/privacy',
    file: 'privacy/index.html',
    title: 'Privacy Policy | AstroBot',
    description: 'How AstroBot collects, uses and protects your personal data when you subscribe or reserve an AstroBot robot toy.',
  },
  {
    url: '/terms',
    file: 'terms/index.html',
    title: 'Terms of Service | AstroBot',
    description: 'Terms of the AstroBot website and the AstroBot robot toy reservation (pre-order) program.',
  },
];

for (const r of routes) {
  const canonical = `${SITE}${r.url}`;
  const head = [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:site_name" content="AstroBot" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    ...(r.jsonLd ?? []).map(ld),
  ].join('\n    ');
  const html = template
    .replace('<!--seo-head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${render(r.url)}</div>`);
  const dest = path.join(outDir, r.file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  console.log(`prerendered ${r.url} -> ${r.file} (${html.length} bytes)`);
}

fs.writeFileSync(
  path.join(outDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((r) => `  <url><loc>${SITE}${r.url}</loc><lastmod>${today}</lastmod><priority>${r.url === '/' ? '1.0' : '0.3'}</priority></url>`)
    .join('\n')}\n</urlset>\n`,
);
fs.writeFileSync(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`);
fs.rmSync(path.join(root, 'dist/server'), { recursive: true, force: true });
