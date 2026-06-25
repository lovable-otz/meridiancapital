import { INDEXABLE, absoluteUrl } from "./site-config";
import { INDUSTRIES } from "./industries-data";
import { PILLARS } from "./pillars-data";
import { SUBURBS } from "./suburbs-data";

function collectUrls(): string[] {
  const staticPaths = ["/", "/contact", "/apply-now", "/miami"];
  const industryPaths = INDUSTRIES.map((i) => `/industry/${i.slug}`);
  const pillarPaths = PILLARS.map((p) => `/pillar/${p.slug}`);
  const suburbPaths = SUBURBS.map((s) => `/miami/${s.slug}`);

  return [...staticPaths, ...industryPaths, ...pillarPaths, ...suburbPaths].map(
    absoluteUrl,
  );
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildSitemapXml(): string {
  const urls = collectUrls();
  const body = urls
    .map((u) => `  <url><loc>${escapeXml(u)}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

export function sitemapXmlResponse(): Response {
  // Always return HTTP 200 so the TanStack Start prerender step does not fail
  // during a static build. When the site is not indexable, return an empty but
  // valid <urlset> so no production URLs leak into the build artifact -
  // robots.txt still emits Disallow: / under the same flag.
  const body = INDEXABLE
    ? buildSitemapXml()
    : `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>
`;
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
