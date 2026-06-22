import { SITE_CONFIG, SITE_URL, absoluteUrl } from "./site-config";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type GraphNode = Record<string, unknown>;

function organizationNode(): GraphNode {
  const node: GraphNode = {
    "@type": "FinancialService",
    "@id": ORG_ID,
    name: SITE_CONFIG.name,
    url: SITE_URL,
    logo: absoluteUrl(SITE_CONFIG.defaultOgImage),
    image: absoluteUrl(SITE_CONFIG.defaultOgImage),
    areaServed: SITE_CONFIG.areasServed,
  };

  if (SITE_CONFIG.legalName) node.legalName = SITE_CONFIG.legalName;
  if (SITE_CONFIG.phone) node.telephone = SITE_CONFIG.phone;
  if (SITE_CONFIG.email) node.email = SITE_CONFIG.email;

  const sameAs = (Object.values(SITE_CONFIG.social) as string[]).filter(
    (v) => v.length > 0,
  );
  if (sameAs.length) node.sameAs = sameAs;

  if (SITE_CONFIG.hasPublicOffice) {
    node.address = {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.addressLocality,
      addressRegion: SITE_CONFIG.address.addressRegion,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.addressCountry,
    };
    node.geo = {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    };
    node.openingHoursSpecification = SITE_CONFIG.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    }));
  }

  return node;
}

function websiteNode(): GraphNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_CONFIG.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

function webPageNode(opts: {
  title: string;
  description: string;
  path: string;
  pageType?: string;
}): GraphNode {
  const url = absoluteUrl(opts.path);
  return {
    "@type": opts.pageType ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    inLanguage: "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
  };
}

export type GraphOpts = {
  title: string;
  description: string;
  path: string;
  pageType?: string;
  extraNodes?: GraphNode[];
};

export function buildGraph(opts: GraphOpts): GraphNode {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      webPageNode(opts),
      ...(opts.extraNodes ?? []),
    ],
  };
}

export function serviceNode(opts: {
  path: string;
  name: string;
  description: string;
  serviceType?: string;
}): GraphNode {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(opts.path)}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    provider: { "@id": ORG_ID },
    areaServed: SITE_CONFIG.areasServed,
  };
}

export function placeNode(opts: { path: string; name: string }): GraphNode {
  return {
    "@type": "Place",
    "@id": `${absoluteUrl(opts.path)}#place`,
    name: opts.name,
    containedInPlace: { "@type": "City", name: "Miami" },
  };
}

export function faqNode(opts: {
  path: string;
  faqs: ReadonlyArray<{ q: string; a: string }>;
}): GraphNode {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(opts.path)}#faq`,
    mainEntity: opts.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
