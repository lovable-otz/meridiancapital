import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Phone, Sparkles } from "lucide-react";
import { Header, Footer } from "./index";
import { Button } from "@/components/ui/button";
import { getSuburb, type Suburb } from "@/lib/suburbs-data";
import { getPillar, TOP_MONEY_PILLARS, type Pillar } from "@/lib/pillars-data";
import { buildHead } from "@/lib/seo";
import { buildGraph, serviceNode, placeNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";

export const Route = createFileRoute("/miami/$suburb/$pillar")({
  head: ({ params }) => {
    const s = getSuburb(params.suburb);
    const p = getPillar(params.pillar);
    const title = s && p ? `${p.title} in ${s.name}, FL` : "Miami Loan Program";
    const description =
      s && p
        ? `${p.title} for ${s.name} businesses: ${p.tagline.toLowerCase()}. ${p.highlight}. Soft credit pull only.`
        : "Miami business funding programs.";
    const path = `/miami/${params.suburb}/${params.pillar}`;
    return buildHead({
      title,
      description,
      path,
      schema: buildGraph({
        title,
        description,
        path,
        extraNodes:
          s && p
            ? [
                serviceNode({ path, name: `${p.title} in ${s.name}`, description: p.description, serviceType: p.title }),
                placeNode({ path, name: `${s.name}, FL` }),
              ]
            : [],
      }),
    });
  },
  loader: ({ params }) => {
    const suburb = getSuburb(params.suburb);
    const pillar = getPillar(params.pillar);
    if (!suburb || !pillar) throw notFound();
    return { suburb, pillar } as { suburb: Suburb; pillar: Pillar };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Button asChild className="mt-6"><Link to="/miami">Back to hub</Link></Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <Button onClick={reset} className="mt-6">Try again</Button>
    </div>
  ),
  component: SuburbPillarPage,
});

function SuburbPillarPage() {
  const { suburb, pillar } = Route.useLoaderData();
  const otherPillars = TOP_MONEY_PILLARS.filter((p) => p.slug !== pillar.slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <div className="border-b border-border/60 bg-card/30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-sm">
            <Link
              to="/miami/$suburb"
              params={{ suburb: suburb.slug }}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> {suburb.name}
            </Link>
            <span className="text-muted-foreground">
              {pillar.title} · <span className="font-medium text-foreground">{suburb.name}</span>
            </span>
          </div>
        </div>

        <section className="relative overflow-hidden border-b border-border/60">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
          <div className="mx-auto max-w-4xl px-6 py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-[color:var(--brand-blue)]" />
              {suburb.name}, FL · {suburb.county}
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
              {pillar.title} in {suburb.name}, FL
            </h1>
            <p className="mt-3 text-xl font-medium text-[color:var(--brand-blue)]">{pillar.tagline}</p>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              {pillar.description} For {suburb.name} business owners, this typically means working
              with operators near {suburb.landmarks.slice(0, 2).join(" and ")}: restaurants,{" "}
              {suburb.industries.slice(0, 2).join(" and ").toLowerCase()} and service businesses
              that depend on Miami's year-round foot traffic, Latin American trade and the South Florida economy.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {pillar.bullets.map((b: string) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[color:var(--brand-blue)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-blue)]/10 px-3 py-1 text-sm font-semibold text-[color:var(--brand-blue)]">
              {pillar.highlight}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/apply-now">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={SITE_CONFIG.phoneHref}><Phone className="mr-2 h-4 w-4" /> {SITE_CONFIG.phone}</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Local example */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            A {suburb.name} example
          </h2>
          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <Sparkles className="mt-1 h-5 w-5 text-[color:var(--brand-blue)]" />
              <div>
                <div className="text-xs uppercase tracking-wider text-[color:var(--brand-blue)]">
                  {suburb.sampleBusinesses[0]!.type}
                </div>
                <h3 className="mt-1 text-lg font-semibold">{suburb.sampleBusinesses[0]!.name}</h3>
                <p className="mt-3 text-muted-foreground">
                  A {suburb.sampleBusinesses[0]!.type.toLowerCase()} near {suburb.landmarks[0]} used{" "}
                  {pillar.title.toLowerCase()} for: {suburb.sampleBusinesses[0]!.useCase}. The deal
                  closed with a soft credit pull only, no impact to the owner's personal score.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other pillars for this suburb */}
        <section className="border-t border-border/60 bg-secondary/40">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Other loan programs in {suburb.name}
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {otherPillars.map((p) => (
                <Link
                  key={p.slug}
                  to="/miami/$suburb/$pillar"
                  params={{ suburb: suburb.slug, pillar: p.slug }}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-[color:var(--brand-blue)]/40 hover:shadow-sm"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{p.title}, {suburb.name}</div>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">{p.tagline}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[color:var(--brand-blue)] opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}