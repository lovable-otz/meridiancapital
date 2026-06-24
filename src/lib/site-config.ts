// Single source of truth for SITE_URL and business facts.
// Mock/placeholder values OK while INDEXABLE=false. Before flipping
// VITE_INDEXABLE=true, replace every mock value with the real owner data.

const RAW_SITE_URL =
  (import.meta.env?.VITE_SITE_URL as string | undefined) ??
  "https://briarcliffadvances.com";

export const SITE_URL: string = RAW_SITE_URL.replace(/\/+$/, "");

export const INDEXABLE: boolean =
  (import.meta.env?.VITE_INDEXABLE as string | undefined) === "true";

export const SITE_CONFIG = {
  url: SITE_URL,
  indexable: INDEXABLE,

  name: "Briarcliff Advances",
  legalName: "Briarcliff Advances Group, LLC",
  tagline: "Capital for Miami's next chapter",
  defaultDescription:
    "Business funding in Miami, FL. Compare SBA loans, commercial real estate, hospitality and equipment financing, and working capital from trusted Miami and South Florida lenders. Pre-qualify in minutes with no impact on credit.",

  phone: "(305) 555-0182",
  phoneHref: "tel:+13055550182",
  email: "",

  hasPublicOffice: true,
  address: {
    streetAddress: "1110 Brickell Ave",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "33131",
    addressCountry: "US",
  },
  geo: {
    latitude: 25.7617,
    longitude: -80.1918,
  },

  openingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    { dayOfWeek: ["Saturday"], opens: "10:00", closes: "16:00" },
  ],

  license: {
    state: "FL",
    licenseNumber: "FL-CFL-MC-2026-018429",
  },

  areasServed: ["Miami, FL", "Miami-Dade County, FL", "South Florida"],

  social: {
    googleBusinessProfile: "https://www.google.com/maps/place/Briarcliff+Advances+Miami",
    linkedin: "https://www.linkedin.com/company/briarcliff-advances-miami",
    facebook: "https://www.facebook.com/briarcliffadvances",
    twitter: "https://twitter.com/BriarcliffAdvMia",
  },

  defaultOgImage: "/og-default.svg",

  stats: {
    reviewsCount: "1,850+",
    reviewsRating: "4.9",
    businessesFunded: "8,500+",
    loansFacilitated: "$680M+",
    fastestFundingHours: "24h",
  },

  trustBadges: ["Soft Pull Ã‚Â· No Credit Impact"],

  author: {
    name: "Daniela Vargas",
    title: "Head of Capital Markets",
    credentials: "MBA Wharton, 14+ years SBA, CRE and Latin American business financing",
    profileUrl: "https://www.linkedin.com/in/daniela-vargas-briarcliffadvances",
  },

  featuredStat: {
    value: "3.1 million",
    claim: "Florida small businesses driving the third-largest state economy in the U.S.",
    sourceName: "SBA Office of Advocacy Ã¢â‚¬â€ Florida Small Business Profile",
    sourceUrl: "https://advocacy.sba.gov/",
  },

  ghl: {
    formId: "iILOP7GhpUNskBYRNuWk",
    formName: "Loan Application",
    formHeight: 876,
    embedScriptSrc: "https://link.msgsndr.com/js/form_embed.js",
  },
} as const;

export function absoluteUrl(path: string = "/"): string {
  if (!path) return `${SITE_URL}/`;
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  const normalized = withLeading === "/" ? "/" : withLeading.replace(/\/+$/, "");
  return `${SITE_URL}${normalized}`;
}
