// Briarcliff Advances - SEO pillar pages for Miami, FL.
// 14 Money Pillars + 14 Vertical Pillars = 28 total.

export type PillarKind = "money" | "vertical";

export type Pillar = {
  slug: string;
  title: string;
  kind: PillarKind;
  tagline: string;
  description: string;
  bullets: string[];
  highlight: string;
  /** Approximate national monthly search volume - used for SEO ordering. */
  volume?: number;
};

export const MONEY_PILLARS: Pillar[] = [
  {
    slug: "sba-loans",
    title: "SBA Loans",
    kind: "money",
    tagline: "Government-backed funding for Miami businesses",
    description:
      "SBA 7(a) and 504 loans offer some of the lowest rates and longest terms available to Miami small businesses, backed by the U.S. Small Business Administration through a network of SBA Preferred lenders active across South Florida.",
    bullets: ["Up to $5,000,000", "Terms up to 25 years on real estate", "10% down typical on acquisitions"],
    highlight: "From 8.5% APR",
    volume: 500000,
  },
  {
    slug: "business-line-of-credit",
    title: "Business Line of Credit",
    kind: "money",
    tagline: "Revolving credit, draw funds when you need them",
    description:
      "Keep capital ready for inventory swings, payroll cycles, or opportunity buys at PortMiami and MIA cargo. Only pay interest on what you draw.",
    bullets: ["Lines from $25K-$500K", "Same-day draws", "Soft-pull pre-qualification"],
    highlight: "From 9.9% APR",
    volume: 50000,
  },
  {
    slug: "working-capital-loans",
    title: "Working Capital Loans",
    kind: "money",
    tagline: "Cover payroll, inventory and seasonal gaps",
    description:
      "Operating capital sized to your monthly revenue and bridged to your real cash cycle, built for Miami restaurants, hospitality groups, retailers and service businesses.",
    bullets: ["$10K-$2M", "Daily, weekly or monthly payments", "No collateral options"],
    highlight: "Funded in 24 hrs",
    volume: 50000,
  },
  {
    slug: "short-term-business-loans",
    title: "Short Term Business Loans",
    kind: "money",
    tagline: "Fast funding with 3-24 month terms",
    description:
      "Bridge a slow season, fund a marketing push, or jump on a purchase order with short-term loans built around predictable fixed payments tailored to Miami's tourism and trade cycles.",
    bullets: ["3-24 month terms", "Funded same week", "No prepayment penalty"],
    highlight: "$10K-$1M",
    volume: 50000,
  },
  {
    slug: "sba-7a-loan",
    title: "SBA 7(a) Loan",
    kind: "money",
    tagline: "The SBA's flagship working capital program",
    description:
      "Miami's most popular SBA program, with flexible use of proceeds for working capital, equipment, acquisition or refinance across Brickell, Coral Gables and South Florida.",
    bullets: ["Up to $5M", "Up to 10-year working capital terms", "Real estate up to 25 years"],
    highlight: "From 8.5% APR",
    volume: 50000,
  },
  {
    slug: "small-business-loans",
    title: "Small Business Loans",
    kind: "money",
    tagline: "Funding tailored to Miami small businesses",
    description:
      "Compare every major small business loan product (term loans, lines of credit, SBA, equipment, factoring and more) through a single soft-pull application sized for South Florida operators.",
    bullets: ["$5K-$5M", "75+ lender network", "Soft credit pull only"],
    highlight: "Funded in 24 hrs",
  },
  {
    slug: "merchant-cash-advance",
    title: "Merchant Cash Advance",
    kind: "money",
    tagline: "Capital based on future card sales",
    description:
      "An advance against your future card and platform revenue, funded quickly and repaid as a small percentage of daily sales. Popular among South Beach hospitality and Aventura retail.",
    bullets: ["24-hour funding", "Bad credit considered", "No fixed payments"],
    highlight: "$10K-$1M",
  },
  {
    slug: "unsecured-business-loans",
    title: "Unsecured Business Loans",
    kind: "money",
    tagline: "No collateral required",
    description:
      "Cash-flow underwritten loans with no UCC blanket lien or hard collateral, for established Miami businesses with consistent revenue: Brickell professional services, Coral Gables practices, Wynwood agencies.",
    bullets: ["Up to $500K", "Terms 1-5 years", "Funded in 1-3 days"],
    highlight: "Soft pull pre-qual",
  },
  {
    slug: "business-acquisition-loans",
    title: "Business Acquisition Loans",
    kind: "money",
    tagline: "Buy an existing Miami business",
    description:
      "SBA-backed acquisition financing for partner buyouts, succession purchases, and bolt-on deals across Miami-Dade - particularly active for second-generation Little Havana and Coral Gables family-business transitions.",
    bullets: ["10% down with SBA 7(a)", "Goodwill financing", "Earn-out friendly"],
    highlight: "Up to $5M",
  },
  {
    slug: "accounts-receivable-financing",
    title: "Accounts Receivable Financing",
    kind: "money",
    tagline: "Borrow against open A/R",
    description:
      "A revolving facility secured by your receivables, perfect for Doral freight forwarders, Miami logistics operators, staffing and B2B service firms with consistent invoice volume.",
    bullets: ["Up to 90% AR advance", "Lines $250K-$20M", "Reporting-friendly"],
    highlight: "Revolving",
  },
  {
    slug: "invoice-factoring",
    title: "Invoice Factoring",
    kind: "money",
    tagline: "Turn outstanding invoices into cash today",
    description:
      "Sell your invoices for immediate liquidity. Non-recourse and recourse options with transparent fee structures, popular among PortMiami drayage, MIA cargo and freight-forwarding operators.",
    bullets: ["Advance rates up to 95%", "Non-recourse available", "24-hour funding"],
    highlight: "Same-day cash",
  },
  {
    slug: "revenue-based-financing",
    title: "Revenue Based Financing",
    kind: "money",
    tagline: "Repay as a % of monthly revenue",
    description:
      "Non-dilutive capital priced as a fixed multiple and repaid as a percentage of monthly revenue. Fits Wynwood SaaS and DTC brands shipping from South Florida 3PLs. No equity, no fixed installments.",
    bullets: ["$50K-$5M", "No equity dilution", "Flexible repayment"],
    highlight: "Pay as you earn",
  },
  {
    slug: "business-loan-broker",
    title: "Business Loan Broker",
    kind: "money",
    tagline: "We shop our network for you",
    description:
      "Independent loan advisors negotiating term sheets across 75+ lenders, then presenting the best two or three options for your Miami business.",
    bullets: ["No fee until close", "Multi-lender negotiation", "One application"],
    highlight: "Compare offers",
  },
  {
    slug: "equipment-financing",
    title: "Equipment Financing",
    kind: "money",
    tagline: "Finance machinery, vehicles & tools",
    description:
      "Use the equipment itself as collateral, preserving working capital for the things financing can't buy. Sized for Miami restaurant kitchens, medical aesthetics in Aventura, and Doral logistics fleets.",
    bullets: ["100% financing available", "Section 179 eligible", "Approvals in 24-48 hrs"],
    highlight: "From 6.99%",
  },
];

export const VERTICAL_PILLARS: Pillar[] = [
  {
    slug: "auto-repair-shop-financing",
    title: "Auto Repair Shop Financing",
    kind: "vertical",
    tagline: "Bays, lifts and diagnostics",
    description:
      "Equipment and real estate financing for independent shops, collision centers and quick-lube operators across Miami-Dade, from Hialeah to Kendall.",
    bullets: ["Lifts, alignment & ADAS", "Real estate purchase", "Up to 7-year terms"],
    highlight: "Rates from 7.5%",
    volume: 500000,
  },
  {
    slug: "dental-practice-loans",
    title: "Dental Practice Loans",
    kind: "vertical",
    tagline: "Equipment, expansion & acquisition",
    description:
      "Finance chairs, CBCT imaging, build-outs or a full practice purchase with structures designed for DSOs and solo practices across Brickell, Coral Gables and Aventura.",
    bullets: ["Chairs, imaging & software", "Practice acquisition", "Refinance existing debt"],
    highlight: "Rates from 7.25%",
    volume: 500,
  },
  {
    slug: "medical-practice-loans",
    title: "Medical Practice Loans",
    kind: "vertical",
    tagline: "Clinics & physician groups",
    description:
      "Acquisition, partner buy-in, expansion and working capital tailored to the rhythms of insurance reimbursements - sized for Miami's dense medical aesthetics, cardiology and primary-care market.",
    bullets: ["Up to 100% project financing", "Terms up to 10 years", "Deferred payment options"],
    highlight: "$50K-$7M",
    volume: 500,
  },
  {
    slug: "restaurant-loans",
    title: "Restaurant Loans",
    kind: "vertical",
    tagline: "Fit-out, expansion & equipment",
    description:
      "Open the second location, refresh the dining room, or weather a slow season with capital structured for Miami hospitality cash flow, from Calle Ocho cafés to Brickell steakhouses.",
    bullets: ["Daily, weekly or monthly payments", "Same-day approvals", "No equity required"],
    highlight: "$25K-$2M",
    volume: 500,
  },
  {
    slug: "trucking-business-loans",
    title: "Trucking Business Loans",
    kind: "vertical",
    tagline: "Owner-operators to fleet expansion",
    description:
      "Capital to add tractors, cover insurance down payments and bridge slow-pay receivables, built for PortMiami drayage and MIA cargo economics.",
    bullets: ["DOT-friendly underwriting", "Factoring + term combos", "Fuel & maintenance reserves"],
    highlight: "Funded in 24 hrs",
  },
  {
    slug: "commercial-construction-loan",
    title: "Commercial Construction Loan",
    kind: "vertical",
    tagline: "Ground-up & renovation projects",
    description:
      "Multi-draw financing aligned to your construction schedule with interest-only periods during the build phase - sized for Miami mixed-use, hospitality and Brickell condo retail builds.",
    bullets: ["Up to 80% LTC", "12-36 month terms", "Convertible to permanent financing"],
    highlight: "$250K-$25M",
  },
  {
    slug: "hotel-loans",
    title: "Hotel Loans",
    kind: "vertical",
    tagline: "Acquisition & PIP renovation",
    description:
      "Capital for flagged and independent properties across South Florida hospitality: acquisitions, brand-mandated PIPs, FF&E and refinances for South Beach, Brickell and Coconut Grove operators.",
    bullets: ["SBA 7(a) & 504", "Bridge to perm", "Up to 90% LTV"],
    highlight: "$500K-$25M",
  },
  {
    slug: "salon-business-loans",
    title: "Salon Business Loans",
    kind: "vertical",
    tagline: "Beauty, wellness & medical aesthetics",
    description:
      "Chair rentals, suite build-outs, product inventory and marketing - plus medical aesthetics financing for the laser, injectables and body-contouring market Miami is known for.",
    bullets: ["Equipment & build-out", "Med-spa & aesthetics", "Suite operators welcome"],
    highlight: "Quick pre-qual",
  },
  {
    slug: "retail-business-loans",
    title: "Retail Business Loans",
    kind: "vertical",
    tagline: "Inventory & storefront capital",
    description:
      "Stock up for the season, open a second location, or refresh your Miami storefront with capital sized to retail cash flow cycles - Aventura Mall to Design District flagships.",
    bullets: ["Seasonal payment structures", "Inventory financing", "POS-integrated underwriting"],
    highlight: "$15K-$1M",
  },
  {
    slug: "ecommerce-business-funding",
    title: "Ecommerce Business Funding",
    kind: "vertical",
    tagline: "Inventory & ad spend capital",
    description:
      "Capital sized to your AOV, repeat rate and marketing payback, purpose-built for Shopify, Amazon and DTC brands shipping out of South Florida fulfillment centers.",
    bullets: ["Integrates with Shopify & Amazon", "Daily or weekly remittance", "Scales with revenue"],
    highlight: "$25K-$3M",
  },
  {
    slug: "manufacturing-equipment-financing",
    title: "Manufacturing Equipment Financing",
    kind: "vertical",
    tagline: "CNC, packaging & production lines",
    description:
      "Finance individual machines or entire production cells with structures aligned to ROI timelines, including soft costs. Active across Doral and Medley light manufacturing.",
    bullets: ["New & used equipment", "Soft costs included", "Step payment options"],
    highlight: "Up to $10M",
  },
  {
    slug: "sba-loan-for-daycare",
    title: "SBA Loan For Daycare",
    kind: "vertical",
    tagline: "Childcare facility financing",
    description:
      "SBA 7(a) and 504 loans for licensed childcare operators across Miami-Dade: real estate, renovation, equipment and working capital in one package.",
    bullets: ["10% down on real estate", "25-year amortization", "Low fixed rates"],
    highlight: "Up to $5M",
  },
  {
    slug: "sba-loan-for-franchise",
    title: "SBA Loan For Franchise",
    kind: "vertical",
    tagline: "Franchise-approved SBA financing",
    description:
      "Long-term fixed financing for Miami franchise owners. Leverage SBA terms to acquire, expand or remodel approved concepts across Miami-Dade and Broward.",
    bullets: ["Up to 10-year terms", "10% down typical", "Low fixed rates"],
    highlight: "Up to $5M",
  },
  {
    slug: "women-owned-business-funding",
    title: "Women Owned Business Funding",
    kind: "vertical",
    tagline: "Capital for women-owned businesses",
    description:
      "Working capital, SBA and microloan programs tailored to certified women-owned businesses across Miami - one of the highest-density Latina-women-owned business markets in the U.S.",
    bullets: ["SBA & microloans", "WBE-friendly underwriting", "$5K-$5M"],
    highlight: "Equity-free",
  },
];

export const PILLARS: Pillar[] = [...MONEY_PILLARS, ...VERTICAL_PILLARS];

/** Top 8 money pillars used to build the suburb x pillar SEO pages (10 suburbs * 8 = 80 pages). */
export const TOP_MONEY_PILLARS: Pillar[] = MONEY_PILLARS.slice(0, 8);

export function getPillar(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}
