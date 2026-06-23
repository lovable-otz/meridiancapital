import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
const siteLogoUrl = "/meridiancapitllogo.png";
const heroVideoUrl = "/miami-bg-video.mp4";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildHead } from "@/lib/seo";
import { buildGraph, faqNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Banknote,
  Building2,
  Truck,
  Stethoscope,
  UtensilsCrossed,
  ShoppingBag,
  Factory,
  Home,
  Briefcase,
  Cpu,
  Globe,
  Star,
  PhoneCall,
  CheckCircle2,
  Lock,
  Users,
  TrendingUp,
  FileText,
  HandCoins,
  CreditCard,
  Wrench,
  Receipt,
  LineChart,
  Sparkles,
  Menu,
  MapPin,
  Calculator as CalcIcon,
  HelpCircle,
  BookOpen,
  Scissors,
  Hotel,
  Car,
  Dumbbell,
  Hammer,
  Pizza,
  Smile,
  Leaf,
  Tractor,
} from "lucide-react";

type MegaItemProps = Readonly<{
  icon: LucideIcon;
  label: string;
  desc: string;
  href?: string;
  slug?: string;
  homeHash?: string;
}>;

const CITY = "Miami";
const STATE = "Florida";
const CITY_STATE = `${CITY}, FL`;

const HOME_FAQS = [
  {
    q: "How does the pre-qualification process work?",
    a: `Share a few details about your ${CITY} business and we compare your file against our lender network with a soft credit pull. You see the products you actually qualify for in minutes - no commitment, no impact to your credit.`,
  },
  {
    q: "What's the timeline from application to funding?",
    a: `Initial decisions for ${CITY} files land in 1-2 business days. Most approved deals wire in 3-7 business days, with faster turn-around on short-term loans and revenue-based advances.`,
  },
  {
    q: `Which industries do you work with in ${CITY}?`,
    a: `We fund hospitality groups, restaurants, retail, professional services, healthcare, construction, logistics and ecommerce operators across ${CITY_STATE} and the surrounding metro.`,
  },
  {
    q: "What credit score and operating history are required?",
    a: "Partner lenders typically look for 580+ FICO and at least 9 months in business. SBA-backed programs usually expect 650+ and two or more years of operating history.",
  },
  {
    q: "What loan amounts are available?",
    a: `Funding ranges from $15,000 working capital advances up to $7,000,000 SBA and commercial real estate loans, structured to fit ${CITY} operators across industries and stages.`,
  },
  {
    q: "Will pre-qualifying affect my credit score?",
    a: "No. We use a soft credit inquiry to match you with lenders - your personal and business credit scores are untouched. A hard pull only happens once you accept a specific lender's terms.",
  },
] as const;

export const Route = createFileRoute("/")({
  head: () => {
    const title = `Business Loans in ${CITY_STATE}`;
    const description = `Fast business funding in ${CITY_STATE}. Compare SBA loans, business line of credit, equipment financing, working capital and same-day business loans from trusted ${CITY} lenders. Pre-qualify in minutes, no impact on credit.`;
    return buildHead({
      title,
      description,
      path: "/",
      schema: buildGraph({
        title,
        description,
        path: "/",
        extraNodes: [faqNode({ path: "/", faqs: HOME_FAQS })],
      }),
    });
  },
  component: Index,
});

function Index() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <div aria-hidden className="h-16" />
        <Hero />
        <TrustRow />
        <WhyUs />
        <CityIntro />
        <CityHubCTA />
        <LoanTypes />
        <HowItWorks />
        <Industries />
        <SuccessStories />
        <CityData />
        <Security />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- Scroll Reveal ---------------- */
function useScrollReveal() {
  useEffect(() => {
    if (globalThis.window === undefined) return;
    const sections = Array.from(document.querySelectorAll("main > section"));
    const targets: Element[] = [];
    sections.forEach((section) => {
      // Mark direct children (skip absolutely-positioned decorative shapes)
      Array.from(section.children).forEach((child) => {
        const el = child as HTMLElement;
        if (el.classList.contains("pointer-events-none")) return;
        if (el.tagName === "SVG") return;
        // Stagger children inside the wrapper for a nicer effect
        const inner = Array.from(el.children).filter(
          (c) => !(c as HTMLElement).classList.contains("pointer-events-none"),
        ) as HTMLElement[];
        if (inner.length > 1 && inner.length <= 8) {
          inner.forEach((c, i) => {
            c.classList.add("reveal");
            if (i > 0 && i <= 5) c.classList.add(`reveal-delay-${i}`);
            targets.push(c);
          });
        } else {
          el.classList.add("reveal");
          targets.push(el);
        }
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
}

/* ---------------- Header ---------------- */

const LOAN_GROUPS: {
  heading: string;
  items: MegaItemProps[];
}[] = [
  {
    heading: "Working Capital & Credit",
    items: [
      { icon: HandCoins, label: "Small Business Loans", desc: "Compare every funding product in one place", slug: "small-business-loans" },
      { icon: CreditCard, label: "Business Line of Credit", desc: "Revolving credit, draw what you need", slug: "business-line-of-credit" },
      { icon: LineChart, label: "Working Capital Loans", desc: "Cover payroll, inventory, seasonal gaps", slug: "working-capital-loans" },
      { icon: Sparkles, label: "Same-Day Business Loans", desc: "Funded in as little as 24 hours", slug: "same-day-business-loans" },
      { icon: Clock, label: "Short-Term Business Loans", desc: "Fast funding, 3-24 month terms", slug: "short-term-business-loans" },
      { icon: ShieldCheck, label: "Unsecured Business Loans", desc: "No collateral, no UCC blanket", slug: "unsecured-business-loans" },
      { icon: Banknote, label: "Merchant Cash Advance", desc: "Advance against future card sales", slug: "merchant-cash-advance" },
      { icon: Banknote, label: "Revenue Based Financing", desc: "Repay as a % of monthly revenue", slug: "revenue-based-financing" },
    ],
  },
  {
    heading: "SBA & Term Loans",
    items: [
      { icon: FileText, label: "SBA Loans", desc: "Government-backed funding programs", slug: "sba-loans" },
      { icon: FileText, label: "SBA 7(a) Loan", desc: "The SBA's flagship working capital loan", slug: "sba-7a-loan" },
      { icon: Briefcase, label: "Business Acquisition Loans", desc: "Buy an existing Miami business", slug: "business-acquisition-loans" },
      { icon: FileText, label: "SBA Loan for Franchise", desc: "Franchise-approved SBA financing", slug: "sba-loan-for-franchise" },
      { icon: Sparkles, label: "Startup Business Loans", desc: "Funding for new Miami ventures", slug: "startup-business-loans" },
      { icon: HandCoins, label: "Women-Owned Business Funding", desc: "Capital for women-owned businesses", slug: "women-owned-business-funding" },
      { icon: ShieldCheck, label: "SBA Express for Veterans", desc: "Fast-track for veteran owners", slug: "sba-express-loan-for-veterans" },
      { icon: HandCoins, label: "SBA Loan for Daycare", desc: "Childcare facility financing", slug: "sba-loan-for-daycare" },
    ],
  },
  {
    heading: "Equipment & Receivables",
    items: [
      { icon: Wrench, label: "Equipment Financing", desc: "Finance machinery, vehicles & tools", slug: "equipment-financing" },
      { icon: Truck, label: "Trucking Business Loans", desc: "Owner-operators to fleet expansion", slug: "trucking-business-loans" },
      { icon: Hammer, label: "Commercial Construction Loan", desc: "Ground-up & renovation projects", slug: "commercial-construction-loan" },
      { icon: Receipt, label: "Invoice Factoring", desc: "Turn invoices into cash today", slug: "invoice-factoring" },
      { icon: Receipt, label: "Accounts Receivable Financing", desc: "Revolving line against open A/R", slug: "accounts-receivable-financing" },
      { icon: Factory, label: "Manufacturing Equipment Financing", desc: "CNC, packaging & production lines", slug: "manufacturing-equipment-financing" },
      { icon: Tractor, label: "Agriculture Equipment Financing", desc: "Tractors, harvesters & implements", slug: "agriculture-equipment-financing" },
      { icon: Leaf, label: "Landscaping Equipment Financing", desc: "Mowers, trucks and trailers", slug: "landscaping-equipment-financing" },
    ],
  },
];

const INDUSTRY_GROUPS: {
  heading: string;
  items: MegaItemProps[];
}[] = [
  {
    heading: "Healthcare & Professional",
    items: [
      { icon: Stethoscope, label: "Medical Practice Loans", desc: "Funding for clinics & physician groups", slug: "medical-practice-loans" },
      { icon: Smile, label: "Dental Practice Loans", desc: "Equipment, expansion and acquisition", slug: "dental-practice-loans" },
      { icon: Briefcase, label: "Professional Services", desc: "Law, accounting, consulting firms", href: "/industry/professional-services" },
      { icon: HandCoins, label: "SBA Loan for Daycare", desc: "Childcare facility financing", slug: "sba-loan-for-daycare" },
    ],
  },
  {
    heading: "Hospitality & Retail",
    items: [
      { icon: UtensilsCrossed, label: "Restaurant Loans", desc: "Fit-out, expansion and equipment", slug: "restaurant-loans" },
      { icon: Pizza, label: "Food Truck Financing", desc: "Mobile food business funding", slug: "food-truck-financing" },
      { icon: Hotel, label: "Hotel Loans", desc: "Property acquisition & renovation", slug: "hotel-loans" },
      { icon: ShoppingBag, label: "Retail Business Loans", desc: "Inventory and storefront capital", slug: "retail-business-loans" },
      { icon: Scissors, label: "Salon Business Loans", desc: "Beauty & wellness expansion", slug: "salon-business-loans" },
      { icon: Dumbbell, label: "Loan for Gym Business", desc: "Equipment and build-out", slug: "loan-for-gym-business" },
    ],
  },
  {
    heading: "Trades, Auto & Agriculture",
    items: [
      { icon: Hammer, label: "Commercial Construction Loan", desc: "Ground-up and renovation projects", slug: "commercial-construction-loan" },
      { icon: Leaf, label: "Landscaping Equipment Financing", desc: "Mowers, trucks and trailers", slug: "landscaping-equipment-financing" },
      { icon: Car, label: "Auto Repair Shop Financing", desc: "Bays, lifts and diagnostics", slug: "auto-repair-shop-financing" },
      { icon: Tractor, label: "Agriculture Equipment Financing", desc: "Tractors and farm machinery", slug: "agriculture-equipment-financing" },
      { icon: Tractor, label: "Farm Credit Financing", desc: "Operating lines for farms", slug: "farm-credit-financing" },
      { icon: Globe, label: "Ecommerce Business Funding", desc: "Inventory and ad spend capital", slug: "ecommerce-business-funding" },
    ],
  },
  {
    heading: "Specialty & Brokers",
    items: [
      { icon: MapPin, label: "Business Lenders Near Me", desc: "Local lender access for Miami", slug: "business-lenders-near-me" },
      { icon: Briefcase, label: "Business Loan Broker", desc: "We shop our network for you", slug: "business-loan-broker" },
      { icon: Building2, label: "Commercial Loan Broker", desc: "Brokered CRE & business deals", slug: "commercial-loan-broker" },
    ],
  },
];

const SERVICE_AREAS: { region: string; suburbs: { name: string; slug: string }[] }[] = [
  {
    region: "Downtown & Financial",
    suburbs: [
      { name: "Brickell", slug: "brickell" },
      { name: "Downtown Miami", slug: "downtown-miami" },
    ],
  },
  {
    region: "Creative & Cultural",
    suburbs: [
      { name: "Wynwood", slug: "wynwood" },
      { name: "Design District", slug: "design-district" },
      { name: "Little Havana", slug: "little-havana" },
    ],
  },
  {
    region: "Bayfront & Luxury",
    suburbs: [
      { name: "Coconut Grove", slug: "coconut-grove" },
      { name: "Coral Gables", slug: "coral-gables" },
      { name: "Edgewater & Midtown", slug: "edgewater" },
      { name: "Aventura", slug: "aventura" },
    ],
  },
  {
    region: "International & Logistics",
    suburbs: [
      { name: "Doral", slug: "doral" },
    ],
  },
];

function MegaItem({
  icon: Icon,
  label,
  desc,
  href,
  slug,
  homeHash,
}: MegaItemProps) {
  const itemClass = "flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-secondary";
  const inner = (
    <>
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[color:var(--brand-blue)]/10 text-[color:var(--brand-blue)]">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{desc}</span>
      </span>
    </>
  );
  if (homeHash) {
    return (
      <NavigationMenuLink asChild>
        <Link to="/" hash={homeHash} className={itemClass}>
          {inner}
        </Link>
      </NavigationMenuLink>
    );
  }
  if (slug) {
    return (
      <NavigationMenuLink asChild>
        <Link
          to="/pillar/$slug"
          params={{ slug }}
          className={itemClass}
        >
          {inner}
        </Link>
      </NavigationMenuLink>
    );
  }
  return (
    <NavigationMenuLink asChild>
      <a
        href={href ?? "#"}
        className={itemClass}
      >
        {inner}
      </a>
    </NavigationMenuLink>
  );
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-white/90 text-foreground backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <a href="/" className="flex items-center gap-2 font-semibold">
          <img src={siteLogoUrl} alt={SITE_CONFIG.name} className="h-9 w-auto" />
          <span className="sr-only">{SITE_CONFIG.name}</span>
          <span className="ml-2 hidden rounded-full border border-border bg-secondary px-2 py-0.5 text-xs text-muted-foreground sm:inline">
            {CITY_STATE}
          </span>
        </a>

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:flex lg:!max-w-none lg:flex-1 lg:justify-center">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-secondary focus:bg-secondary data-[state=open]:bg-secondary">Loan Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light w-[900px] max-w-[100vw] max-h-[calc(100vh-5rem)] overflow-auto bg-popover p-6 text-popover-foreground">
                  <div className="grid grid-cols-3 gap-6">
                    {LOAN_GROUPS.map((g) => (
                      <div key={g.heading}>
                        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-blue)]">
                          {g.heading}
                        </div>
                        <div className="space-y-1">
                          {g.items.map((it) => (
                            <MegaItem key={it.label} {...it} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-secondary/60 p-4">
                    <div className="text-sm">
                      <div className="font-semibold">Not sure which loan fits?</div>
                      <div className="text-muted-foreground">
                        Get matched in 60 seconds, soft credit pull only.
                      </div>
                    </div>
                    <Button asChild size="sm" className="bg-[image:var(--gradient-cta)] text-[color:var(--accent-success-foreground)]">
                      <a href={SITE_CONFIG.phoneHref}>
                        <PhoneCall className="h-4 w-4" /> Call {SITE_CONFIG.phone}
                      </a>
                    </Button>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-secondary focus:bg-secondary data-[state=open]:bg-secondary">Industries</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light w-[1100px] max-w-[100vw] max-h-[calc(100vh-5rem)] overflow-auto bg-popover p-6 text-popover-foreground">
                  <div className="grid grid-cols-4 gap-6">
                    {INDUSTRY_GROUPS.map((g) => (
                      <div key={g.heading}>
                        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-blue)]">
                          {g.heading}
                        </div>
                        <div className="space-y-1">
                          {g.items.map((it) => (
                            <MegaItem key={it.label} {...it} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-secondary focus:bg-secondary data-[state=open]:bg-secondary">Service Areas</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light w-[760px] max-w-[100vw] max-h-[calc(100vh-5rem)] overflow-auto bg-popover p-6 text-popover-foreground">
                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-[color:var(--brand-blue)]" />
                    Funding businesses across the greater {CITY_STATE} metro
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-3">
                    {SERVICE_AREAS.map((sa) => (
                      <div key={sa.region}>
                        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-blue)]">
                          {sa.region}
                        </div>
                        <ul className="space-y-1.5">
                          {sa.suburbs.map((s) => (
                            <li key={s.slug}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to="/miami/$suburb"
                                  params={{ suburb: s.slug }}
                                  className="block rounded px-2 py-1 text-sm text-foreground/80 hover:bg-secondary hover:text-foreground"
                                >
                                  {s.name}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-secondary focus:bg-secondary data-[state=open]:bg-secondary">Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light w-[520px] max-w-[100vw] max-h-[calc(100vh-5rem)] overflow-auto bg-popover p-4 text-popover-foreground">
                  <div className="grid gap-1">
                    <MegaItem icon={BookOpen} label="How It Works" desc="Our 4-step funding process" homeHash="how" />
                    <MegaItem icon={Star} label="Success Stories" desc="Real Miami businesses we funded" homeHash="stories" />
                    <MegaItem icon={HelpCircle} label="FAQs" desc="Answers to common funding questions" homeHash="faq" />
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-white/10 focus:bg-white/10`}>
                <Link to="/contact">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="hidden bg-[image:var(--gradient-cta)] text-[color:var(--accent-success-foreground)] shadow-[var(--shadow-elegant)] hover:opacity-95 sm:inline-flex"
            asChild
          >
            <a href={SITE_CONFIG.phoneHref}>
              <PhoneCall className="h-4 w-4" /> Call {SITE_CONFIG.phone}
            </a>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm overflow-y-auto p-0">
              <SheetHeader className="border-b border-border px-5 py-4 text-left">
                <SheetTitle className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[image:var(--gradient-primary)] text-primary-foreground">
                    <HandCoins className="h-3.5 w-3.5" />
                  </span>
                  {SITE_CONFIG.name} · {CITY_STATE}
                </SheetTitle>
              </SheetHeader>
              <div className="px-3 py-3">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="loans">
                    <AccordionTrigger className="px-2 text-base font-semibold">Loan Products</AccordionTrigger>
                    <AccordionContent>
                      {LOAN_GROUPS.map((g) => (
                        <div key={g.heading} className="mb-3">
                          <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-blue)]">
                            {g.heading}
                          </div>
                          <ul className="mt-1">
                            {g.items.map((it) => (
                              <li key={it.label}>
                                <SheetClose asChild>
                                  {it.slug ? (
                                    <Link
                                      to="/pillar/$slug"
                                      params={{ slug: it.slug }}
                                      className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary"
                                    >
                                      {it.label}
                                    </Link>
                                  ) : (
                                    <a href={it.href ?? "#"} className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary">
                                      {it.label}
                                    </a>
                                  )}
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="ind">
                    <AccordionTrigger className="px-2 text-base font-semibold">Industries</AccordionTrigger>
                    <AccordionContent>
                      {INDUSTRY_GROUPS.map((g) => (
                        <div key={g.heading} className="mb-3">
                          <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-blue)]">
                            {g.heading}
                          </div>
                          <ul className="mt-1">
                            {g.items.map((it) => (
                              <li key={it.label}>
                                <SheetClose asChild>
                                  {it.slug ? (
                                    <Link
                                      to="/pillar/$slug"
                                      params={{ slug: it.slug }}
                                      className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary"
                                    >
                                      {it.label}
                                    </Link>
                                  ) : (
                                    <a href={it.href ?? "#"} className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary">
                                      {it.label}
                                    </a>
                                  )}
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="areas">
                    <AccordionTrigger className="px-2 text-base font-semibold">Service Areas</AccordionTrigger>
                    <AccordionContent>
                      {SERVICE_AREAS.map((sa) => (
                        <div key={sa.region} className="mb-3">
                          <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-blue)]">
                            {sa.region}
                          </div>
                          <div className="mt-1 flex flex-wrap gap-1.5 px-2">
                            {sa.suburbs.map((s) => (
                              <SheetClose asChild key={s.slug}>
                                <Link
                                  to="/miami/$suburb"
                                  params={{ suburb: s.slug }}
                                  className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground"
                                >
                                  {s.name}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="res">
                    <AccordionTrigger className="px-2 text-base font-semibold">Resources</AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {[
                          { label: "How It Works", hash: "how" },
                          { label: "Success Stories", hash: "stories" },
                          { label: "FAQs", hash: "faq" },
                        ].map((l) => (
                          <li key={l.label}>
                            <SheetClose asChild>
                              <Link to="/" hash={l.hash} className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary">
                                {l.label}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-4 space-y-2 border-t border-border px-2 pt-4">
                  <a href={SITE_CONFIG.phoneHref} className="flex items-center gap-2 text-sm font-medium">
                    <PhoneCall className="h-4 w-4 text-[color:var(--brand-blue)]" /> {SITE_CONFIG.phone}
                  </a>
                  <SheetClose asChild>
                    <Button asChild className="w-full bg-[image:var(--gradient-cta)] text-[color:var(--accent-success-foreground)]">
                      <a href={SITE_CONFIG.phoneHref}>
                        <PhoneCall className="h-4 w-4" /> Call {SITE_CONFIG.phone}
                      </a>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ backgroundImage: "var(--gradient-hero)" }}
    >
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src={heroVideoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, oklch(0.22 0.05 215 / 0.72), oklch(0.16 0.04 215 / 0.88))" }}
        aria-hidden="true"
      />
      {/* Deco glamour: sunburst behind headline + horizon arches + diamond grid wash */}
      <SunShape className="pointer-events-none absolute -top-24 -right-24 h-[28rem] w-[28rem] text-[color:var(--brand-gold)] opacity-35" />
      <SunShape className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 text-[color:var(--brand-coral)] opacity-20" />
      <DotGrid className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 text-[color:var(--brand-gold)]" opacity={0.07} />
      <OceanWaves className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full text-[color:var(--brand-gold)] md:h-44" />
      {/* Top deco pinstripe */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-gold)]/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-1 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-gold)]/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-10 md:py-28">
        <h1 className="mt-6 text-4xl font-bold leading-[1.04] tracking-tight md:text-6xl lg:text-[5rem]">
          Capital that closes at{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, oklch(0.85 0.13 85), oklch(0.78 0.13 85), oklch(0.72 0.17 30))" }}
          >
            Miami pace.
          </span>
          <span className="block text-[color:var(--brand-gold)]/85 text-sm font-medium tracking-[0.4em] uppercase mt-4 md:text-base">
            Business loans · SBA · Commercial real estate
          </span>
        </h1>

        {/* Gold deco divider with diamond ornament */}
        <div className="mt-6 flex items-center gap-3" aria-hidden="true">
          <span className="h-px w-12 bg-[color:var(--brand-gold)]/70" />
          <DiamondMark className="h-2.5 w-2.5 text-[color:var(--brand-gold)]" />
          <span className="h-px w-24 bg-[color:var(--brand-gold)]/40" />
          <DiamondMark className="h-2 w-2 text-[color:var(--brand-gold)]/70" />
          <span className="h-px flex-1 max-w-xs bg-gradient-to-r from-[color:var(--brand-gold)]/30 to-transparent" />
        </div>

        <p className="mt-6 max-w-xl text-lg text-white/85 md:text-xl">
          Business loans, SBA financing and commercial real estate capital,
          built around Brickell operators, Coral Gables practices, Wynwood
          founders and Doral logistics. Term sheets in as little as{" "}
          <strong className="text-[color:var(--brand-gold)]">24 hours</strong>.
        </p>

        <ul className="mt-7 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-2.5 text-sm text-white/85 sm:grid-cols-2">
          {[
            "No impact on credit score",
            "75+ lender network",
            "Bilingual EN/ES specialists",
            "Funding from $5K to $5M",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2.5">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[color:var(--brand-gold)]/40 bg-white/5">
                <CheckCircle2 className="h-3 w-3 text-[color:var(--brand-gold)]" />
              </span>
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            size="lg"
            asChild
            className="group relative w-full overflow-hidden bg-[image:var(--gradient-cta)] text-[color:var(--accent-success-foreground)] shadow-[var(--shadow-glow)] hover:opacity-95 sm:w-auto"
          >
            <Link to="/apply-now">
              Get My Loan Options
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full border-[color:var(--brand-gold)]/50 bg-transparent text-white hover:bg-[color:var(--brand-gold)]/15 hover:text-white sm:w-auto"
          >
            <Link to="/apply-now">Talk to a Banker</Link>
          </Button>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.18em] text-white/65">
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3 w-3 text-[color:var(--brand-gold)]" /> 256-bit SSL
          </span>
          <DiamondMark className="h-1.5 w-1.5 text-[color:var(--brand-gold)]/60" />
          <span>Soft credit pull</span>
          <DiamondMark className="h-1.5 w-1.5 text-[color:var(--brand-gold)]/60" />
          <span>No obligation</span>
        </div>
      </div>
    </section>
  );
}

/** Small diamond ornament used inline in dividers and uppercase chip text. */
function DiamondMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" className={className} aria-hidden="true">
      <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
    </svg>
  );
}


/* ---------------- Decorative SVG shapes - Miami Art Deco + tropical ---------------- */

/**
 * OceanWaves → Art Deco horizon arches.
 * Three concentric arches across the width, evocative of MiMo grille work and
 * the curved façades on Lincoln Road and Ocean Drive.
 */
function OceanWaves({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={{ opacity: 0.3 }}
    >
      <path d="M0 200 Q 600 30 1200 200" opacity="0.85" />
      <path d="M0 200 Q 600 75 1200 200" opacity="0.65" />
      <path d="M0 200 Q 600 120 1200 200" opacity="0.45" />
      <path d="M0 200 Q 600 165 1200 200" opacity="0.3" />
    </svg>
  );
}

/**
 * SunShape → Art Deco sunburst.
 * Thin radial rays from a small center disk, in the SoBe / Bacardi Tower spirit.
 * Replaces the previous solid radial-gradient circle.
 */
function SunShape({ className }: Readonly<{ className?: string }>) {
  const rays = Array.from({ length: 28 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 28;
    return {
      x1: 100 + Math.cos(angle) * 22,
      y1: 100 + Math.sin(angle) * 22,
      x2: 100 + Math.cos(angle) * (i % 2 === 0 ? 96 : 80),
      y2: 100 + Math.sin(angle) * (i % 2 === 0 ? 96 : 80),
    };
  });
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.65"
      >
        {rays.map((r, i) => (
          <line key={`deco-ray-${i}`} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
        ))}
      </g>
      <circle cx="100" cy="100" r="14" fill="currentColor" opacity="0.45" />
      <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

/**
 * PalmLeaf → Monstera leaf silhouette.
 * (Currently unused in the layout, kept exported for future placement.)
 */
function PalmLeaf({ className }: Readonly<{ className?: string }>) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="currentColor">
      <g transform="rotate(-12 100 100)">
        <path d="M100 18 C 55 28 30 65 28 115 C 28 162 60 188 100 182 C 140 188 172 162 172 115 C 170 65 145 28 100 18 Z" />
        {/* Vein */}
        <rect x="98.5" y="40" width="3" height="140" rx="1.5" opacity="0.45" />
        {/* Monstera-style perforations (white-ish to suggest cutouts against the body) */}
        <g fill="#ffffff" opacity="0.55">
          <ellipse cx="68" cy="78" rx="9" ry="14" />
          <ellipse cx="132" cy="78" rx="9" ry="14" />
          <ellipse cx="62" cy="118" rx="11" ry="16" />
          <ellipse cx="138" cy="118" rx="11" ry="16" />
          <ellipse cx="72" cy="158" rx="7" ry="11" />
          <ellipse cx="128" cy="158" rx="7" ry="11" />
        </g>
      </g>
    </svg>
  );
}

/**
 * WavyLines → Art Deco grille (chevron stripes).
 * Replaces the horizontal wavy lines with stacked chevrons, the signature
 * Art Deco "speed lines" motif found across Miami Beach building facades.
 */
function WavyLines({
  className,
  color = "currentColor",
  opacity = 0.18,
}: Readonly<{
  className?: string;
  color?: string;
  opacity?: number;
}>) {
  const rows = Array.from({ length: 8 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
      style={{ opacity }}
    >
      {rows.map((i) => {
        const y = 25 + i * 20;
        return (
          <path
            key={`chevron-${i}`}
            d={`M 20 ${y + 12} L 200 ${y - 6} L 380 ${y + 12}`}
          />
        );
      })}
    </svg>
  );
}

/**
 * DotGrid → Miami diamond grid.
 * Rhombus tessellation, the Art Deco terrazzo / breeze-block pattern.
 */
function DotGrid({
  className,
  color = "currentColor",
  opacity = 0.2,
}: Readonly<{
  className?: string;
  color?: string;
  opacity?: number;
}>) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <pattern id="diamondgrid-pat" width="22" height="22" patternUnits="userSpaceOnUse">
          <path
            d="M 11 1 L 21 11 L 11 21 L 1 11 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.9"
          />
          <circle cx="11" cy="11" r="0.9" fill={color} />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#diamondgrid-pat)" />
    </svg>
  );
}

/**
 * BlobShape → Stylized monstera/banana leaf.
 * Tropical, lush, slightly off-axis - a Miami botanical accent for hero corners
 * and background flourishes.
 */
function BlobShape({
  className,
  color = "currentColor",
  opacity = 0.1,
}: Readonly<{
  className?: string;
  color?: string;
  opacity?: number;
}>) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" style={{ opacity }} fill={color}>
      <g transform="rotate(-18 100 100)">
        {/* Leaf body */}
        <path d="M100 22 C 58 32 32 70 30 118 C 28 162 62 186 100 180 C 138 186 172 162 170 118 C 168 70 142 32 100 22 Z" />
        {/* Central vein */}
        <rect x="98.5" y="40" width="3" height="142" rx="1.4" opacity="0.55" />
        {/* Side veins suggesting monstera splits */}
        <g stroke={color} strokeWidth="1.6" fill="none" opacity="0.65">
          <path d="M100 70 Q 78 78 56 92" />
          <path d="M100 70 Q 122 78 144 92" />
          <path d="M100 110 Q 72 120 46 136" />
          <path d="M100 110 Q 128 120 154 136" />
          <path d="M100 150 Q 80 156 64 170" />
          <path d="M100 150 Q 120 156 136 170" />
        </g>
      </g>
    </svg>
  );
}

/**
 * RingShape → Art Deco fan.
 * A half-fan composed of alternating radial wedges, the classic
 * "Florida sunset" deco motif (think the lobby of the Delano).
 */
function RingShape({
  className,
  color = "currentColor",
  opacity = 0.2,
}: Readonly<{
  className?: string;
  color?: string;
  opacity?: number;
}>) {
  const wedges = Array.from({ length: 11 }, (_, i) => {
    const start = Math.PI + (i * Math.PI) / 11;
    const end = Math.PI + ((i + 1) * Math.PI) / 11;
    const r = 88;
    return {
      x1: 100 + Math.cos(start) * r,
      y1: 100 + Math.sin(start) * r,
      x2: 100 + Math.cos(end) * r,
      y2: 100 + Math.sin(end) * r,
      filled: i % 2 === 0,
    };
  });
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" style={{ opacity }}>
      <g>
        {wedges.map((w, i) => (
          <path
            key={`fan-${i}`}
            d={`M 100 100 L ${w.x1} ${w.y1} A 88 88 0 0 1 ${w.x2} ${w.y2} Z`}
            fill={w.filled ? color : "none"}
            stroke={color}
            strokeWidth="1.1"
          />
        ))}
      </g>
      {/* Centerpiece */}
      <circle cx="100" cy="100" r="6" fill={color} />
      <path
        d="M 12 100 A 88 88 0 0 1 188 100"
        fill="none"
        stroke={color}
        strokeWidth="1.4"
      />
    </svg>
  );
}

/* ---------------- Trust Row ---------------- */
function TrustRow() {
  const items = [
    { icon: Star, value: `${SITE_CONFIG.stats.reviewsRating}/5`, label: `${SITE_CONFIG.stats.reviewsCount} reviews`, stars: true },
    { icon: Users, value: SITE_CONFIG.stats.businessesFunded, label: "Businesses funded" },
    { icon: HandCoins, value: SITE_CONFIG.stats.loansFacilitated, label: "Loans facilitated" },
    { icon: ShieldCheck, value: "Bank-Level", label: "Secure & encrypted" },
  ];
  const badges = SITE_CONFIG.trustBadges;
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {items.map((i) => (
              <div key={i.label} className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-[color:var(--brand-blue)]">
                  <i.icon className={`h-4 w-4 ${i.stars ? "fill-amber-400 text-amber-400" : ""}`} />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold tracking-tight text-foreground">{i.value}</span>
                  <span className="block text-[11px] text-muted-foreground">{i.label}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="hidden h-8 w-px bg-border lg:block" aria-hidden="true" />
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-medium text-muted-foreground">
            {badges.map((b) => (
              <span key={b} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-[color:var(--accent-success)]" />
                {b}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          There are <strong className="font-semibold text-foreground">{SITE_CONFIG.featuredStat.value}</strong> {SITE_CONFIG.featuredStat.claim}. <a
            href={SITE_CONFIG.featuredStat.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Source: {SITE_CONFIG.featuredStat.sourceName}
          </a>.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Why us ---------------- */
function WhyUs() {
  const cards = [
    {
      icon: Clock,
      title: "Fast Decisions",
      desc: `Pre-qualify in minutes. Same-day funding available for qualified ${CITY} files.`,
      stat: "< 72 hrs",
      statLabel: "Average funding time",
    },
    {
      icon: Banknote,
      title: "Flexible Funding",
      desc: "From $15,000 working capital to $7,000,000 SBA acquisitions - sized to the deal.",
      stat: "$15K-$7M",
      statLabel: "Funding range",
    },
    {
      icon: ShieldCheck,
      title: "Transparent Terms",
      desc: "Clear APR disclosure, no prepayment penalties, no hidden fees, no surprises.",
      stat: "0 hidden fees",
      statLabel: "Clear pricing, every deal",
    },
    {
      icon: PhoneCall,
      title: "Dedicated Banker",
      desc: `A ${CITY}-based banker who reviews your file, packages it, and shops 75+ lenders for you.`,
      stat: "1:1 advisor",
      statLabel: "Brickell-based team",
    },
    {
      icon: Users,
      title: "Local Expertise",
      desc: `Brickell, Wynwood, Coral Gables, Doral - bilingual EN/ES underwriting that knows the submarket.`,
      stat: "75+",
      statLabel: "Lending partners",
    },
    {
      icon: Briefcase,
      title: "Every Industry",
      desc: "Hospitality, healthcare, real estate, logistics, professional services and more.",
      stat: "All sectors",
      statLabel: "Tailored programs",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-[color:var(--brand-sand)]/40 py-20 text-foreground md:py-24">
      {/* Background diamond grid wash */}
      <DotGrid
        className="pointer-events-none absolute inset-0 h-full w-full text-[color:var(--brand-gold)]"
        opacity={0.08}
      />
      <RingShape
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 text-[color:var(--brand-gold)]"
        opacity={0.15}
      />
      <RingShape
        className="pointer-events-none absolute -right-20 -bottom-10 h-64 w-64 rotate-180 text-[color:var(--brand-coral)]"
        opacity={0.12}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Centered Art Deco heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 text-[color:var(--brand-gold)]">
            <span className="h-px w-16 bg-[color:var(--brand-gold)]/60" />
            <DiamondMark className="h-2.5 w-2.5" />
            <span className="text-xs font-semibold uppercase tracking-[0.32em]">
              The Meridian Edge
            </span>
            <DiamondMark className="h-2.5 w-2.5" />
            <span className="h-px w-16 bg-[color:var(--brand-gold)]/60" />
          </div>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Why Miami operators choose us
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Built for {CITY_STATE} businesses - fast decisions, transparent terms,
            and a banker who actually knows the difference between a Brickell deal
            and a Doral deal.
          </p>
        </div>

        {/* 3x2 Art Deco grid of feature cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title, desc, stat, statLabel }, i) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-[color:var(--brand-gold)]/20 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--brand-gold)]/60 hover:shadow-[var(--shadow-elegant)]"
            >
              {/* Top gold pinstripe */}
              <span
                className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-gold)] to-transparent opacity-70"
                aria-hidden="true"
              />
              {/* Bottom gold pinstripe */}
              <span
                className="pointer-events-none absolute inset-x-7 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-gold)]/40 to-transparent"
                aria-hidden="true"
              />
              {/* Corner deco diamonds */}
              <DiamondMark className="pointer-events-none absolute left-3 top-3 h-1.5 w-1.5 text-[color:var(--brand-gold)]/60" />
              <DiamondMark className="pointer-events-none absolute right-3 top-3 h-1.5 w-1.5 text-[color:var(--brand-gold)]/60" />
              <DiamondMark className="pointer-events-none absolute left-3 bottom-3 h-1.5 w-1.5 text-[color:var(--brand-gold)]/60" />
              <DiamondMark className="pointer-events-none absolute right-3 bottom-3 h-1.5 w-1.5 text-[color:var(--brand-gold)]/60" />
              {/* Sunburst behind icon on hover */}
              <SunShape
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 text-[color:var(--brand-gold)] opacity-0 transition-opacity duration-500 group-hover:opacity-30"
              />

              <div className="relative">
                <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
                  No. {String(i + 1).padStart(2, "0")}
                </span>

                <div className="mt-4 flex items-center gap-3">
                  <span
                    className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl text-[color:var(--brand-gold-foreground)]"
                    style={{ background: "var(--gradient-cta)" }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="text-3xl font-bold leading-none text-[color:var(--primary)]">
                    {stat}
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {desc}
                </p>

                <div className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
                  <DiamondMark className="h-1.5 w-1.5 text-[color:var(--brand-gold)]" />
                  {statLabel}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom deco divider */}
        <div className="mt-14 flex items-center justify-center gap-3 text-[color:var(--brand-gold)]/70" aria-hidden="true">
          <span className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-[color:var(--brand-gold)]/50" />
          <DiamondMark className="h-2 w-2" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">M · C</span>
          <DiamondMark className="h-2 w-2" />
          <span className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-[color:var(--brand-gold)]/50" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- City Intro (SEO) ---------------- */
function CityIntro() {
  const neighborhoods = [
    "Brickell", "Wynwood", "Little Havana", "Coconut Grove",
    "Coral Gables", "Design District", "Downtown Miami", "Edgewater", "Doral", "Aventura",
  ];
  const uses = ["Expansion", "Payroll", "Inventory", "Equipment", "Marketing", "Cash Flow"];
  return (
    <section className="relative overflow-hidden bg-secondary/40 py-10 sm:py-20">
      <WavyLines
        className="pointer-events-none absolute -bottom-6 -left-10 h-40 w-[28rem] text-[color:var(--brand-blue)]"
        opacity={0.18}
      />
      <DotGrid
        className="pointer-events-none absolute right-6 top-6 h-32 w-32 text-[color:var(--brand-blue)]"
        opacity={0.22}
      />
      <BlobShape
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 text-[color:var(--brand-blue)]"
        opacity={0.08}
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Business Loans for {CITY} Companies
          </h2>
          <p className="mt-4 text-muted-foreground">
            Whether you operate in {neighborhoods.slice(0, 5).join(", ")} or anywhere across
            Miami-Dade County and South Florida, our lending network helps local businesses secure the capital
            they need to grow. From <strong>SBA 7(a) loans</strong> and{" "}
            <strong>business lines of credit</strong> to <strong>equipment financing</strong>,{" "}
            <strong>working capital loans</strong> and <strong>invoice factoring</strong>,
            we connect {CITY} owners with the right funding product, fast.
          </p>
          <p className="mt-4 text-muted-foreground">
            Our marketplace works with short-term lenders, SBA preferred banks, equipment
            financiers and merchant cash advance providers, so you can compare{" "}
            <strong>fast business loans</strong>, <strong>startup business loans</strong>{" "}
            and <strong>same-day business funding</strong> in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {neighborhoods.map((n) => (
              <span
                key={n}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">Common uses of funding</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            What {CITY} business owners typically finance with us.
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-3">
            {uses.map((u) => (
              <li
                key={u}
                className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-[color:var(--accent-success)]" /> {u}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- City Hub CTA ---------------- */
function CityHubCTA() {
  const highlights = [
    "10 neighborhoods & adjacent cities",
    "38 loan programs mapped locally",
    "Direct links to every suburb × service page",
  ];
  return (
    <section className="relative overflow-hidden py-10 sm:py-20">
      <BlobShape
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 text-[color:var(--brand-blue)]"
        opacity={0.08}
      />
      <DotGrid
        className="pointer-events-none absolute right-10 bottom-10 h-32 w-32 text-[color:var(--brand-blue)]"
        opacity={0.18}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className="overflow-hidden rounded-3xl border border-border p-6 text-white sm:p-8 md:p-14"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                <MapPin className="h-3.5 w-3.5" /> Explore the Miami Hub
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Every neighborhood. Every loan program. One directory.
              </h2>
              <p className="mt-3 max-w-xl text-white/80">
                Jump into the Miami city hub to browse all suburbs we serve and the
                services available in each. Every combination opens its own locally written page.
              </p>
              <ul className="mt-6 space-y-2">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-[color:var(--accent-success)]" /> {h}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-white text-[color:var(--primary)] hover:bg-white/90 sm:w-auto"
                >
                  <Link to="/miami">
                    Visit the Miami Hub <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <Link to="/apply-now">Apply Now</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur sm:p-6">
              <div className="text-xs uppercase tracking-wider text-white/70">Inside the hub</div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-white/10 p-2.5 sm:p-4">
                  <div className="text-base font-bold sm:text-2xl">9</div>
                  <div className="mt-1 whitespace-nowrap text-[9px] uppercase tracking-wide text-white/70 sm:text-[11px] sm:tracking-wider">Suburbs</div>
                </div>
                <div className="rounded-xl bg-white/10 p-2.5 sm:p-4">
                  <div className="text-base font-bold sm:text-2xl">32</div>
                  <div className="mt-1 whitespace-nowrap text-[9px] uppercase tracking-wide text-white/70 sm:text-[11px] sm:tracking-wider">Programs</div>
                </div>
                <div className="rounded-xl bg-white/10 p-2.5 sm:p-4">
                  <div className="text-base font-bold sm:text-2xl">70+</div>
                  <div className="mt-1 whitespace-nowrap text-[9px] uppercase tracking-wide text-white/70 sm:text-[11px] sm:tracking-wider">Local Pages</div>
                </div>
              </div>
              <Link
                to="/miami"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-white hover:underline"
              >
                Browse the full directory <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Loan Types ---------------- */
function LoanTypes() {
  const loans = [
    { icon: FileText, title: "SBA Loans", tagline: "From 8.5% APR", desc: "SBA 7(a) and 504 - the lowest rates and longest terms available to Miami small businesses.", popular: true },
    { icon: LineChart, title: "Working Capital Loans", tagline: "Funded in 24 hrs", desc: "Cover payroll, inventory and seasonal gaps with capital sized to your real cash cycle.", popular: true },
    { icon: CreditCard, title: "Business Line of Credit", tagline: "From 9.9% APR", desc: "Revolving capital you draw when you need it. Only pay interest on what you use.", popular: false },
    { icon: Wrench, title: "Equipment Financing", tagline: "From 6.99%", desc: "Equipment serves as collateral. Easy approvals for trucking, construction and medical.", popular: false },
    { icon: Home, title: "Commercial Real Estate", tagline: "Up to 25-yr amort.", desc: "SBA 504 and conventional CRE for Brickell, Wynwood, Doral and the Miami corridor.", popular: false },
    { icon: Receipt, title: "Invoice Factoring & AR", tagline: "Same-day cash", desc: "Turn outstanding invoices into liquidity. Built for PortMiami and MIA cargo flows.", popular: false },
  ];
  return (
    <section id="loans" className="relative overflow-hidden bg-background py-20 md:py-24">
      {/* Deco background flourishes */}
      <RingShape className="pointer-events-none absolute -left-32 top-10 h-80 w-80 text-[color:var(--brand-gold)]" opacity={0.1} />
      <SunShape className="pointer-events-none absolute -right-28 bottom-16 h-72 w-72 text-[color:var(--brand-coral)]" />
      <DotGrid className="pointer-events-none absolute inset-0 h-full w-full text-[color:var(--brand-gold)]" opacity={0.05} />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Deco heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 text-[color:var(--brand-gold)]">
            <span className="h-px w-12 bg-[color:var(--brand-gold)]/60" />
            <DiamondMark className="h-2.5 w-2.5" />
            <span className="text-xs font-semibold uppercase tracking-[0.32em]">Capital Menu</span>
            <DiamondMark className="h-2.5 w-2.5" />
            <span className="h-px w-12 bg-[color:var(--brand-gold)]/60" />
          </div>
          <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Loan programs for {CITY}, FL
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg">
            Every major funding product, compared through one soft-pull application.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loans.map(({ icon: Icon, title, tagline, desc, popular }, i) => (
            <Link
              to="/apply-now"
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-[color:var(--brand-gold)]/25 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--brand-gold)]/70 hover:shadow-[var(--shadow-elegant)]"
            >
              {/* POPULAR gold ribbon */}
              {popular && (
                <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[color:var(--brand-gold)] to-[oklch(0.70_0.16_50)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-gold-foreground)] shadow-sm">
                  <Sparkles className="h-2.5 w-2.5" /> Popular
                </div>
              )}

              {/* Top gold pinstripe */}
              <span className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-gold)] to-transparent opacity-70" />
              {/* Corner diamonds */}
              <DiamondMark className="pointer-events-none absolute left-3 top-3 h-1.5 w-1.5 text-[color:var(--brand-gold)]/70" />
              <DiamondMark className="pointer-events-none absolute left-3 bottom-3 h-1.5 w-1.5 text-[color:var(--brand-gold)]/70" />
              <DiamondMark className="pointer-events-none absolute right-3 bottom-3 h-1.5 w-1.5 text-[color:var(--brand-gold)]/70" />

              {/* Number + icon row */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
                  No. {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-[color:var(--brand-gold-foreground)] shadow-sm" style={{ background: "var(--gradient-cta)" }}>
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                {title}
              </h3>
              <div className="mt-1.5 text-sm font-medium text-[color:var(--brand-gold)]">
                {tagline}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>

              <div className="mt-6 flex items-center justify-between border-t border-[color:var(--brand-gold)]/20 pt-4">
                <span className="text-sm font-semibold text-[color:var(--primary)] transition-colors group-hover:text-[color:var(--brand-gold)]">
                  Get pre-qualified
                </span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--brand-gold)]/40 text-[color:var(--brand-gold)] transition-all group-hover:bg-[color:var(--brand-gold)] group-hover:text-[color:var(--brand-gold-foreground)]">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works (Art Deco numbered timeline) ---------------- */
function HowItWorks() {
  const steps = [
    { numeral: "I",   title: "Complete Application", desc: "Tell us about your business in 60 seconds. Soft pull only." },
    { numeral: "II",  title: "Get Matched",          desc: "We package your file and shop 75+ lenders for you." },
    { numeral: "III", title: "Compare Offers",       desc: "Review rates, terms and monthly payments side by side." },
    { numeral: "IV",  title: "Receive Funding",      desc: "Sign and get funded - often in as little as 24 hours." },
  ];
  return (
    <section id="how" className="relative overflow-hidden bg-[color:var(--primary)] py-20 text-white md:py-28">
      {/* Deco background */}
      <DotGrid className="pointer-events-none absolute inset-0 h-full w-full text-white" opacity={0.06} />
      <RingShape className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 text-[color:var(--brand-gold)]" opacity={0.18} />
      <RingShape className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rotate-180 text-[color:var(--brand-coral)]" opacity={0.15} />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 text-[color:var(--brand-gold)]">
            <span className="h-px w-12 bg-[color:var(--brand-gold)]/60" />
            <DiamondMark className="h-2.5 w-2.5" />
            <span className="text-xs font-semibold uppercase tracking-[0.32em]">The Process</span>
            <DiamondMark className="h-2.5 w-2.5" />
            <span className="h-px w-12 bg-[color:var(--brand-gold)]/60" />
          </div>
          <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Funding made simple
          </h2>
          <p className="mt-5 text-white/75 md:text-lg">
            Four steps from first call to wired funds. No surprises, no scripts.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Connecting deco line (desktop only) */}
          <div
            className="pointer-events-none absolute top-12 hidden h-px md:block"
            style={{
              left: "12.5%",
              right: "12.5%",
              background:
                "repeating-linear-gradient(to right, color-mix(in oklab, var(--brand-gold) 60%, transparent) 0 8px, transparent 8px 16px)",
            }}
            aria-hidden="true"
          />

          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((s, i) => (
              <li key={s.numeral} className="relative flex flex-col items-center text-center">
                {/* Roman numeral medallion */}
                <div className="relative">
                  <span
                    className="absolute inset-0 -m-3 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, color-mix(in oklab, var(--brand-gold) 30%, transparent) 0%, transparent 70%)",
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-[color:var(--brand-gold)] bg-[color:var(--primary)] shadow-[0_0_24px_color-mix(in_oklab,var(--brand-gold)_40%,transparent)]"
                  >
                    {/* Inner ring */}
                    <span className="absolute inset-1.5 rounded-full border border-[color:var(--brand-gold)]/40" aria-hidden="true" />
                    <span
                      className="bg-clip-text font-serif text-3xl font-bold tracking-wide text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg, oklch(0.92 0.13 85), oklch(0.65 0.16 50))",
                      }}
                    >
                      {s.numeral}
                    </span>
                  </div>
                </div>

                {/* Step number (small) */}
                <div className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
                  <DiamondMark className="h-1.5 w-1.5" />
                  Step {String(i + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-white/70">
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Footer mini-deco divider */}
        <div className="mt-16 flex items-center justify-center gap-3 text-[color:var(--brand-gold)]/70" aria-hidden="true">
          <DiamondMark className="h-1.5 w-1.5" />
          <span className="h-px w-24 bg-[color:var(--brand-gold)]/50" />
          <DiamondMark className="h-1.5 w-1.5" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Industries (Art Deco tiles + monstera accents) ---------------- */
function Industries() {
  const inds = [
    { icon: Home,             label: "Real Estate",         slug: "real-estate",          micro: "CRE · 1031 · Bridge" },
    { icon: UtensilsCrossed,  label: "Hospitality",         slug: "restaurants",          micro: "Hotels · Restaurants" },
    { icon: Stethoscope,      label: "Healthcare",          slug: "healthcare",           micro: "Med-spa · Dental · MD" },
    { icon: Briefcase,        label: "Professional",        slug: "professional-services",micro: "Law · Accounting" },
    { icon: Truck,            label: "Logistics",           slug: "transportation",       micro: "PortMiami · MIA" },
    { icon: Building2,        label: "Construction",        slug: "construction",         micro: "GC · Subs · Yards" },
    { icon: ShoppingBag,      label: "Retail & Luxury",     slug: "retail",               micro: "Aventura · D.D." },
    { icon: Factory,          label: "Manufacturing",       slug: "manufacturing",        micro: "Doral · Medley" },
    { icon: Cpu,              label: "Technology",          slug: "technology",           micro: "SaaS · Fintech" },
    { icon: Globe,            label: "E-Commerce",          slug: "e-commerce",           micro: "DTC · Cross-border" },
  ];
  return (
    <section id="industries" className="relative overflow-hidden bg-[color:var(--brand-sand)]/30 py-20 md:py-24">
      {/* Monstera accents + deco */}
      <BlobShape className="pointer-events-none absolute -left-20 -top-12 h-80 w-80 text-[color:var(--brand-gold)]" opacity={0.14} />
      <BlobShape className="pointer-events-none absolute -right-24 -bottom-16 h-96 w-96 -scale-x-100 text-[color:var(--brand-coral)]" opacity={0.12} />
      <DotGrid className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 text-[color:var(--brand-gold)]" opacity={0.06} />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 text-[color:var(--brand-gold)]">
            <span className="h-px w-12 bg-[color:var(--brand-gold)]/60" />
            <DiamondMark className="h-2.5 w-2.5" />
            <span className="text-xs font-semibold uppercase tracking-[0.32em]">Sectors</span>
            <DiamondMark className="h-2.5 w-2.5" />
            <span className="h-px w-12 bg-[color:var(--brand-gold)]/60" />
          </div>
          <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Industries we fund in {CITY}
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg">
            Specialty programs for the sectors that drive Miami-Dade - built by bankers who know each one cold.
          </p>
        </div>

        {/* 2-row by 5-col feature tiles */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {inds.map(({ icon: Icon, label, slug, micro }) => (
            <Link
              key={slug}
              to="/industry/$slug"
              params={{ slug }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[color:var(--brand-gold)]/25 bg-card p-5 transition-all hover:-translate-y-1 hover:border-[color:var(--brand-gold)]/70 hover:shadow-[var(--shadow-elegant)]"
            >
              {/* Top gold pinstripe */}
              <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-gold)] to-transparent opacity-70" />
              {/* Hover monstera accent */}
              <BlobShape
                className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 text-[color:var(--brand-gold)] opacity-0 transition-opacity duration-500 group-hover:opacity-30"
              />
              {/* Corner diamond */}
              <DiamondMark className="pointer-events-none absolute right-3 top-3 h-1.5 w-1.5 text-[color:var(--brand-gold)]/60" />

              <span
                className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl text-[color:var(--brand-gold-foreground)] shadow-sm transition-transform group-hover:scale-110"
                style={{ background: "var(--gradient-cta)" }}
              >
                <Icon className="h-5 w-5" />
              </span>

              <h3 className="relative mt-4 text-base font-semibold tracking-tight">
                {label}
              </h3>
              <p className="relative mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
                {micro}
              </p>

              <span className="relative mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--brand-gold)] opacity-0 transition-opacity group-hover:opacity-100">
                Explore <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA below grid */}
        <div className="mt-12 flex flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-center sm:gap-6">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
            <DiamondMark className="h-1.5 w-1.5" />
            38 loan programs · 10 neighborhoods
            <DiamondMark className="h-1.5 w-1.5" />
          </div>
          <Button
            asChild
            size="lg"
            className="bg-[image:var(--gradient-cta)] text-[color:var(--accent-success-foreground)] shadow-[var(--shadow-glow)]"
          >
            <Link to="/miami" className="flex flex-row items-center gap-2">
              <span>Browse the Miami directory</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Calculator ---------------- */
function Calculator() {
  const [amount, setAmount] = useState(100_000);
  const [term, setTerm] = useState(60); // months
  const [rate, setRate] = useState(10.5); // %

  const { monthly, total, interest } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = term;
    const m = amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const t = m * n;
    return { monthly: m, total: t, interest: t - amount };
  }, [amount, term, rate]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <section id="calculator" className="relative overflow-hidden bg-background py-20 md:py-24">
      <DotGrid className="pointer-events-none absolute inset-0 h-full w-full text-[color:var(--brand-gold)]" opacity={0.06} />
      <SunShape className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 text-[color:var(--brand-gold)] opacity-25" />

      {/* Heading */}
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="flex items-center justify-center gap-3 text-[color:var(--brand-gold)]">
          <span className="h-px w-12 bg-[color:var(--brand-gold)]/60" />
          <DiamondMark className="h-2.5 w-2.5" />
          <span className="text-xs font-semibold uppercase tracking-[0.32em]">The Numbers</span>
          <DiamondMark className="h-2.5 w-2.5" />
          <span className="h-px w-12 bg-[color:var(--brand-gold)]/60" />
        </div>
        <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
          Estimate your {CITY} business loan
        </h2>
        <p className="mt-5 text-muted-foreground md:text-lg">
          Adjust amount, term and rate. Real offers from our lender network may price lower based on your business profile.
        </p>
      </div>

      <div className="relative mx-auto mt-14 grid min-w-0 max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[1.1fr_1fr]">
        {/* Sliders panel - deco frame */}
        <div className="relative overflow-hidden rounded-3xl border border-[color:var(--brand-gold)]/40 bg-card p-6 shadow-[var(--shadow-elegant)] sm:p-8">
          {/* Frame pinstripes */}
          <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-gold)] to-transparent" />
          <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-gold)]/50 to-transparent" />
          <DiamondMark className="pointer-events-none absolute left-3 top-3 h-2 w-2 text-[color:var(--brand-gold)]" />
          <DiamondMark className="pointer-events-none absolute right-3 top-3 h-2 w-2 text-[color:var(--brand-gold)]" />
          <DiamondMark className="pointer-events-none absolute left-3 bottom-3 h-2 w-2 text-[color:var(--brand-gold)]" />
          <DiamondMark className="pointer-events-none absolute right-3 bottom-3 h-2 w-2 text-[color:var(--brand-gold)]" />

          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
            <TrendingUp className="h-3 w-3" /> Adjust your terms
          </div>

          <div className="mt-8 space-y-8">
            <Field label="Loan amount" value={fmt(amount)}>
              <Slider
                value={[amount]}
                min={5000}
                max={1_000_000}
                step={5000}
                onValueChange={(v) => setAmount(v[0] ?? amount)}
              />
            </Field>
            <Field label="Term" value={`${term} months`}>
              <Slider
                value={[term]}
                min={6}
                max={120}
                step={6}
                onValueChange={(v) => setTerm(v[0] ?? term)}
              />
            </Field>
            <Field label="Interest rate" value={`${rate.toFixed(1)}%`}>
              <Slider
                value={[rate]}
                min={5}
                max={30}
                step={0.5}
                onValueChange={(v) => setRate(v[0] ?? rate)}
              />
            </Field>
          </div>
        </div>

        {/* Result panel - Art Deco poster */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-[color:var(--brand-gold)] bg-[color:var(--primary)] p-6 text-white shadow-[var(--shadow-glow)] sm:p-8">
          {/* Sunburst behind the headline number */}
          <SunShape className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 text-[color:var(--brand-gold)] opacity-40" />
          {/* Inner gold frame */}
          <span className="pointer-events-none absolute inset-3 rounded-2xl border border-[color:var(--brand-gold)]/40" />
          <DiamondMark className="pointer-events-none absolute left-5 top-5 h-2 w-2 text-[color:var(--brand-gold)]" />
          <DiamondMark className="pointer-events-none absolute right-5 top-5 h-2 w-2 text-[color:var(--brand-gold)]" />
          <DiamondMark className="pointer-events-none absolute left-5 bottom-5 h-2 w-2 text-[color:var(--brand-gold)]" />
          <DiamondMark className="pointer-events-none absolute right-5 bottom-5 h-2 w-2 text-[color:var(--brand-gold)]" />

          <div className="relative">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
              <DiamondMark className="h-1.5 w-1.5" /> Your estimate
            </div>

            {/* Hero monthly payment number */}
            <div className="mt-6 text-center">
              <div className="text-[11px] uppercase tracking-[0.32em] text-white/70">Monthly payment</div>
              <div
                className="mt-2 bg-clip-text font-serif text-5xl font-bold tracking-tight text-transparent sm:text-6xl"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, oklch(0.95 0.13 85), oklch(0.72 0.16 50))",
                }}
              >
                {fmt(monthly)}
              </div>
              <div className="mt-3 flex items-center justify-center gap-3" aria-hidden="true">
                <span className="h-px w-12 bg-[color:var(--brand-gold)]/60" />
                <DiamondMark className="h-1.5 w-1.5 text-[color:var(--brand-gold)]" />
                <span className="h-px w-12 bg-[color:var(--brand-gold)]/60" />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">Total cost</div>
                <div className="mt-1.5 text-lg font-semibold">{fmt(total)}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">Interest paid</div>
                <div className="mt-1.5 text-lg font-semibold">{fmt(interest)}</div>
              </div>
            </div>

            <Button
              size="lg"
              asChild
              className="mt-7 w-full bg-[image:var(--gradient-cta)] text-[color:var(--accent-success-foreground)] shadow-[var(--shadow-glow)]"
            >
              <Link to="/apply-now">
                Get real offers in {CITY} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-white/55">
              Estimate only · Real terms set by lender at close
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, children }: Readonly<{ label: string; value: string; children: React.ReactNode }>) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <Label className="text-sm">{label}</Label>
        <span className="text-sm font-semibold text-[color:var(--brand-blue)]">{value}</span>
      </div>
      {children}
    </div>
  );
}

/* ---------------- Success Stories ---------------- */
function SuccessStories() {
  const stories = [
    { name: "Brickell Avenue Wealth Advisors", amount: "$1,400,000", result: "Funded a partner buy-in and Brickell office build-out.", type: "SBA 7(a) Loan" },
    { name: "Calle Ocho Cafetería Group", amount: "$320,000", result: "Acquired second location plus working capital for opening.", type: "SBA 7(a) + Working Capital" },
    { name: "NW 25th Freight Forwarders", amount: "$2,100,000", result: "Purchased a Doral flex warehouse and added two reefer trucks.", type: "SBA 504 + Equipment" },
  ];
  return (
    <section id="stories" className="relative overflow-hidden px-6 py-10 sm:py-20">
      <WavyLines className="pointer-events-none absolute -top-6 right-10 h-44 w-[26rem] text-[color:var(--brand-blue)]" />
      <BlobShape className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 text-[color:var(--brand-blue)]" />
      <DotGrid className="pointer-events-none absolute -bottom-6 right-1/4 h-36 w-36 text-[color:var(--brand-blue)]" />
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {CITY} Businesses We've Funded
        </h2>
        <p className="mt-4 text-muted-foreground">
          Real outcomes from local owners in our funding network.
        </p>
      </div>
      <div className="relative mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-3">
        {stories.map((s) => (
          <div key={s.name} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-1 text-[color:var(--accent-success)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={`star-${s.name}-${i}`} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <h3 className="mt-4 text-lg font-semibold">{s.name}</h3>
            <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{s.type}</div>
            <div className="mt-4 text-3xl font-bold text-[color:var(--brand-blue)]">{s.amount}</div>
            <p className="mt-2 text-sm text-muted-foreground">{s.result}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- City Data ---------------- */
function CityData() {
  return (
    <section className="relative overflow-hidden bg-secondary/40 py-10 sm:py-20">
      <RingShape className="pointer-events-none absolute -left-16 -top-10 h-64 w-64 text-[color:var(--brand-blue)]" />
      <WavyLines className="pointer-events-none absolute right-0 bottom-6 h-40 w-[24rem] text-[color:var(--brand-blue)]" />
      <DotGrid className="pointer-events-none absolute left-1/4 -bottom-6 h-36 w-36 text-[color:var(--brand-blue)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Why Businesses in {CITY} Need Flexible Financing
        </h2>
        <p className="mt-5 text-muted-foreground">
          From freight forwarders at PortMiami and MIA cargo to restaurants on Calle Ocho, medical
          practices in Aventura and Coral Gables, and contractors expanding across Doral and the
          industrial corridor. Growing labor costs, equipment upgrades,
          inventory demands, seasonal fluctuations and new contracts often require quick access to
          capital. Our lending marketplace helps {CITY_STATE} businesses secure{" "}
          <strong>SBA loans</strong>, <strong>business lines of credit</strong> and{" "}
          <strong>working capital</strong> tailored to local market conditions.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-6 text-left md:grid-cols-4">
          {[
            { k: "$15K-$7M", v: "Funding range" },
            { k: "72 hrs", v: "Fastest funding" },
            { k: "580+", v: "Minimum FICO" },
            { k: "9 mo+", v: "Time in business" },
          ].map((s) => (
            <div key={s.v} className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xl font-bold text-[color:var(--primary)] sm:text-2xl">{s.k}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Security ---------------- */
function Security() {
  const items = [
    { icon: Lock, title: "SSL Secured" },
    { icon: ShieldCheck, title: "Bank-Level Encryption" },
    { icon: Users, title: "Privacy Protected" },
    { icon: CheckCircle2, title: "Licensed Lending Partners" },
  ];
  return (
    <section className="relative overflow-hidden px-6 py-16">
      <DotGrid className="pointer-events-none absolute -top-4 left-10 h-32 w-32 text-[color:var(--brand-blue)]" />
      <WavyLines className="pointer-events-none absolute -bottom-6 right-10 h-32 w-80 text-[color:var(--brand-blue)]" />
      <div className="relative mx-auto grid max-w-7xl gap-6 rounded-2xl border border-border bg-card p-8 md:grid-cols-4">
        {items.map(({ icon: Icon, title }) => (
          <div key={title} className="flex items-center gap-3">
            <Icon className="h-6 w-6 text-[color:var(--accent-success)]" />
            <span className="text-sm font-medium">{title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQSection() {
  return (
    <section id="faq" className="relative overflow-hidden px-6 py-10 sm:py-20">
      <BlobShape className="pointer-events-none absolute -left-24 top-10 h-80 w-80 text-[color:var(--brand-blue)]" />
      <RingShape className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 text-[color:var(--brand-blue)]" />
      <WavyLines className="pointer-events-none absolute right-1/4 -top-6 h-32 w-[22rem] text-[color:var(--brand-blue)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Frequently asked questions</h2>
        <p className="mt-4 text-muted-foreground">
          Everything {CITY} business owners want to know before applying.
        </p>
      </div>
      <Accordion type="single" collapsible className="relative mx-auto mt-10 max-w-4xl">
        {HOME_FAQS.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base font-medium">
              {f.q}
            </AccordionTrigger>
            <AccordionContent forceMount className="text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */
function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-10 sm:py-20 text-white"
      style={{ backgroundImage: "var(--gradient-hero)" }}
    >
      <WavyLines
        className="pointer-events-none absolute -top-6 left-0 h-48 w-[36rem] text-white"
        opacity={0.14}
      />
      <RingShape
        className="pointer-events-none absolute -right-16 -bottom-10 h-80 w-80 text-white"
        opacity={0.15}
      />
      <DotGrid
        className="pointer-events-none absolute left-1/4 bottom-6 h-32 w-32 text-white"
        opacity={0.15}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
          Ready to explore your loan options in {CITY}?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Get matched with lenders serving businesses in {CITY_STATE}. No impact on credit.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            asChild
            className="bg-[image:var(--gradient-cta)] text-[color:var(--accent-success-foreground)] shadow-[var(--shadow-glow)]"
          >
            <a href="#apply">
              Get Started <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <Link to="/apply-now">Apply Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="border-t border-border bg-[color:var(--brand-sand)] text-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <img src={siteLogoUrl} alt={SITE_CONFIG.name} className="h-9 w-auto" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            A business funding marketplace serving {CITY_STATE} and the rest of South Florida.
          </p>
          <address className="mt-4 not-italic space-y-1 text-sm text-muted-foreground">
            <div className="font-semibold text-foreground">{SITE_CONFIG.name}</div>
            {SITE_CONFIG.hasPublicOffice ? (
              <div>
                {SITE_CONFIG.address.streetAddress}
                <br />
                {SITE_CONFIG.address.addressLocality}, {SITE_CONFIG.address.addressRegion}{" "}
                {SITE_CONFIG.address.postalCode}
              </div>
            ) : (
              <div>Serving {SITE_CONFIG.areasServed.join(" · ")}</div>
            )}
            <div>
              <a href={SITE_CONFIG.phoneHref} className="hover:text-foreground">
                {SITE_CONFIG.phone}
              </a>
            </div>
            {SITE_CONFIG.license.state && SITE_CONFIG.license.licenseNumber && (
              <div className="pt-1 text-xs">
                {SITE_CONFIG.license.state} license #{SITE_CONFIG.license.licenseNumber}
              </div>
            )}
          </address>
        </div>
        <FooterCol
          title="Loan Products"
          links={[
            { label: "SBA Loans", href: "/pillar/sba-loans" },
            { label: "SBA 7(a) Loan", href: "/pillar/sba-7a-loan" },
            { label: "Business Line of Credit", href: "/pillar/business-line-of-credit" },
            { label: "Working Capital Loans", href: "/pillar/working-capital-loans" },
            { label: "Equipment Financing", href: "/pillar/equipment-financing" },
            { label: "Invoice Factoring", href: "/pillar/invoice-factoring" },
            { label: "Merchant Cash Advance", href: "/pillar/merchant-cash-advance" },
          ]}
        />
        <FooterCol
          title="Industries"
          links={[
            { label: "Construction", href: "/industry/construction" },
            { label: "Healthcare", href: "/industry/healthcare" },
            { label: "Restaurants & Hospitality", href: "/industry/restaurants" },
            { label: "Transportation & Logistics", href: "/industry/transportation" },
            { label: "Real Estate", href: "/industry/real-estate" },
            { label: "Professional Services", href: "/industry/professional-services" },
            { label: "E-Commerce", href: "/industry/e-commerce" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { label: "Apply Now", href: "/apply-now" },
            { label: "Contact", href: "/contact" },
            { label: "Miami Hub", href: "/miami" },
            { label: "Brickell · Downtown · Aventura", href: "/miami" },
            { label: `Call ${SITE_CONFIG.phone}`, href: SITE_CONFIG.phoneHref },
          ]}
        />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl space-y-3 px-6 py-6 text-xs text-muted-foreground">
          <p className="text-foreground">
            <strong>Important disclosures.</strong> {SITE_CONFIG.name} is not a
            lender. We operate a lender-matching marketplace and earn referral
            fees when borrowers fund through partners in our network. Loan
            terms, rates, and approval are decided solely by the lending
            partner. The information on this site is for general educational
            purposes only and is not financial, tax, legal, or investment
            advice. Consult a qualified professional before making borrowing
            decisions.
          </p>
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} {SITE_CONFIG.name}, {CITY_STATE}. All rights reserved.</p>
            <p>
              Reviewed by{" "}
              <a
                href={SITE_CONFIG.author.profileUrl}
                rel="author"
                className="font-medium text-foreground hover:underline"
              >
                {SITE_CONFIG.author.name}
              </a>
              , {SITE_CONFIG.author.title} ({SITE_CONFIG.author.credentials}).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: Readonly<{ title: string; links: Array<{ label: string; href: string }> }>) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
