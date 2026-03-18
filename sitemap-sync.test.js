import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';
import { seoRoutes } from '../src/lib/seoRoutes';

const SITE_URL = 'https://casinoaftaler.dk';
const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');

function parseSitemap(xml) {
  const urls = [...xml.matchAll(/<url>\s*<loc>(.*?)<\/loc>\s*<lastmod>(.*?)<\/lastmod>\s*<changefreq>(.*?)<\/changefreq>\s*<priority>(.*?)<\/priority>\s*<\/url>/gs)];
  return new Map(urls.map(([, loc, lastmod, changefreq, priority]) => [loc, { lastmod, changefreq, priority }]));
}

describe('sitemap sync', () => {
  it('matches seoRoutes 1:1', () => {
    const sitemap = parseSitemap(sitemapXml);
    const expected = new Map(seoRoutes.map((route) => {
      const loc = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
      return [loc, {
        lastmod: `${route.lastmod}T12:00:00+01:00`,
        changefreq: route.changefreq,
        priority: String(route.priority),
      }];
    }));

    const mismatches = [];

    for (const [loc, route] of expected.entries()) {
      const sitemapEntry = sitemap.get(loc);
      if (!sitemapEntry) {
        mismatches.push(`missing:${loc}`);
        continue;
      }
      if (sitemapEntry.lastmod !== route.lastmod || sitemapEntry.changefreq !== route.changefreq || sitemapEntry.priority !== route.priority) {
        mismatches.push(`diff:${loc}`);
      }
    }

    for (const loc of sitemap.keys()) {
      if (!expected.has(loc)) mismatches.push(`extra:${loc}`);
    }

    expect(mismatches).toEqual([]);
  });
});
