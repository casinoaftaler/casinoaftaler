import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';
import { seoRoutes } from './src/lib/seoRoutes';

const SITE_URL = 'https://casinoaftaler.dk';
const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');

function parseSitemap(xml) {
  const urls = [...xml.matchAll(/<url>\s*<loc>(.*?)<\/loc>\s*<lastmod>(.*?)<\/lastmod>\s*<changefreq>(.*?)<\/changefreq>\s*<priority>(.*?)<\/priority>\s*<\/url>/gs)];
  return new Map(urls.map(([, loc, lastmod, changefreq, priority]) => [loc, { lastmod, changefreq, priority }]));
}

function getAudit() {
  const sitemap = parseSitemap(sitemapXml);
  const expected = new Map(seoRoutes.map((route) => {
    const loc = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
    return [loc, {
      lastmod: `${route.lastmod}T12:00:00+01:00`,
      changefreq: route.changefreq,
      priority: String(route.priority),
    }];
  }));

  const diffs = [];
  const missing = [];
  const extra = [];

  for (const [loc, route] of expected.entries()) {
    const sitemapEntry = sitemap.get(loc);
    if (!sitemapEntry) {
      missing.push({ loc, seoLastmod: route.lastmod, sitemapLastmod: null });
      continue;
    }

    if (
      sitemapEntry.lastmod !== route.lastmod ||
      sitemapEntry.changefreq !== route.changefreq ||
      sitemapEntry.priority !== route.priority
    ) {
      diffs.push({
        loc,
        seoLastmod: route.lastmod,
        sitemapLastmod: sitemapEntry.lastmod,
        seoChangefreq: route.changefreq,
        sitemapChangefreq: sitemapEntry.changefreq,
        seoPriority: route.priority,
        sitemapPriority: sitemapEntry.priority,
      });
    }
  }

  for (const [loc, sitemapEntry] of sitemap.entries()) {
    if (!expected.has(loc)) {
      extra.push({ loc, seoLastmod: null, sitemapLastmod: sitemapEntry.lastmod });
    }
  }

  return {
    diffCount: diffs.length + missing.length + extra.length,
    diffs,
    missing,
    extra,
  };
}

describe('sitemap audit', () => {
  it('matches seoRoutes 1:1 and reports any mismatch details', () => {
    const audit = getAudit();
    if (audit.diffCount > 0) {
      console.log(JSON.stringify(audit, null, 2));
    }
    expect(audit.diffCount).toBe(0);
  });
});
