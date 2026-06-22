import { SITE_CONFIG, absoluteUrl } from "./site-config";

export type PageHead = {
  title: string;
  description: string;
  path: string;
  ogType?: string;
  ogImage?: string;
  noSuffix?: boolean;
  noindex?: boolean;
  schema?: unknown;
};

const SUFFIX = ` | ${SITE_CONFIG.name}`;

export function buildHead(opts: PageHead) {
  const fullTitle =
    opts.noSuffix || opts.title.endsWith(SITE_CONFIG.name)
      ? opts.title
      : `${opts.title}${SUFFIX}`;

  const pageUrl = absoluteUrl(opts.path);
  const imageUrl = absoluteUrl(opts.ogImage ?? SITE_CONFIG.defaultOgImage);
  const ogType = opts.ogType ?? "website";

  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: opts.description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: opts.description },
    { property: "og:type", content: ogType },
    { property: "og:url", content: pageUrl },
    { property: "og:site_name", content: SITE_CONFIG.name },
    { property: "og:image", content: imageUrl },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: opts.description },
    { name: "twitter:image", content: imageUrl },
  ];

  if (opts.noindex) {
    meta.push({ name: "robots", content: "noindex, follow" });
  }

  const links: Array<Record<string, string>> = [
    { rel: "canonical", href: pageUrl },
  ];

  const result: {
    meta: typeof meta;
    links: typeof links;
    scripts?: Array<{ type: string; children: string }>;
  } = { meta, links };

  if (opts.schema) {
    result.scripts = [
      { type: "application/ld+json", children: JSON.stringify(opts.schema) },
    ];
  }

  return result;
}
