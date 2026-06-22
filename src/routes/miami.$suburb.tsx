import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, MapPin, Phone, Sparkles } from "lucide-react";
import { Header, Footer } from "./index";
import { Button } from "@/components/ui/button";
import { getSuburb, type Suburb } from "@/lib/suburbs-data";
import { TOP_MONEY_PILLARS, VERTICAL_PILLARS } from "@/lib/pillars-data";
import { buildHead } from "@/lib/seo";
import { buildGraph, placeNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";
import { SUBURB_BODIES } from "@/lib/suburbs-content";

export const Route = createFileRoute("/miami/$suburb")({
  head: ({ params, matches, match }) => {
    if (matches[matches.length - 1]?.routeId !== match.routeId) return {};
    const s = getSuburb(params.suburb);
    const title = s ? `Business Loans in ${s.name}, FL` : "Miami Neighborhood";
    const description = s?.intro?.slice(0, 158) ?? "Miami neighborhood business funding.";
    const path = `/miami/${params.suburb}`;
    return buildHead({
      title,
      description,
      path,
      schema: buildGraph({
        title,
        description,
        path,
        extraNodes: s ? [placeNode({ path, name: `${s.name}, FL` })] : [],
      }),
    });
  },
  loader: ({ params }) => {
    const suburb = getSuburb(params.suburb);
    if (!suburb) throw notFound();
    return { suburb } as { suburb: Suburb };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Neighborhood not found</h1>
      <Button asChild className="mt-6"><Link to="/miami">Back to hub</Link></Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <Button onClick={reset} className="mt-6">Try again</Button>
    </div>
  ),
  component: SuburbPage,
});

function SuburbPage() {
  const { suburb } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <div className="border-b border-border/60 bg-card/30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-sm">
            <Link to="/miami" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Miami hub
            </Link>
            <span className="text-muted-foreground">
              {suburb.county} · <span className="font-medium text-foreground">{suburb.name}</span>
            </span>
          </div>
        </div>

        <section className="relative overflow-hidden border-b border-border/60">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
          <div className="mx-auto max-w-4xl px-6 py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-[color:var(--brand-blue)]" />
              {suburb.county} · ZIP {suburb.zips.join(", ")}
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
              Business Loans in {suburb.name}, FL
            </h1>
            <p className="mt-3 text-xl font-medium text-[color:var(--brand-blue)]">{suburb.tagline}</p>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">{suburb.intro}</p>
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

        {/* Local context */}
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold tracking-tight">Local landmarks we know</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Our {suburb.name} advisors work directly with operators across these areas.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {suburb.landmarks.map((l: string) => (
                <li key={l} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/80">{l}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold tracking-tight">Industries we fund here</h2>
            <ul className="mt-5 space-y-3">
              {suburb.industries.map((i: string) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <Building2 className="h-4 w-4 text-[color:var(--brand-blue)]" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Miami suburb context */}
        {SUBURB_BODIES[suburb.slug] && (
          <section className="border-t border-border/60">
            <div className="mx-auto max-w-4xl px-6 py-16">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Business funding in {suburb.name}
              </h2>
              {SUBURB_BODIES[suburb.slug].map((p, i) => (
                <p key={i} className="mt-4 text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Sample businesses */}
        <section className="border-t border-border/60 bg-secondary/40">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {suburb.name} businesses Meridian Capital works with
            </h2>
            <p className="mt-2 text-muted-foreground">Representative case studies: composite profiles of real funding outcomes.</p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {suburb.sampleBusinesses.map((b: { name: string; type: string; useCase: string }) => (
                <div key={b.name} className="rounded-2xl border border-border bg-card p-6">
                  <div className="text-xs uppercase tracking-wider text-[color:var(--brand-blue)]">{b.type}</div>
                  <h3 className="mt-2 text-lg font-semibold">{b.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{b.useCase}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top 8 money pillars for this suburb */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Top loan programs for {suburb.name}
          </h2>
          <p className="mt-2 text-muted-foreground">
            The eight money pillars most relevant for {suburb.name} business owners.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOP_MONEY_PILLARS.map((p) => (
              <Link
                key={p.slug}
                to="/miami/$suburb/$pillar"
                params={{ suburb: suburb.slug, pillar: p.slug }}
                className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-[color:var(--brand-blue)]/40 hover:shadow-[var(--shadow-elegant)]"
              >
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{p.tagline}</div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[color:var(--brand-blue)] group-hover:underline">
                  {p.title} in {suburb.name} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Industry pillars */}
        <section className="border-t border-border/60 bg-card/40">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Industry-specific programs</h2>
            <p className="mt-2 text-muted-foreground">
              See vertical pillar pages tailored to your industry, all 20 programs are available
              across {suburb.name}.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {VERTICAL_PILLARS.slice(0, 9).map((p) => (
                <Link
                  key={p.slug}
                  to="/pillar/$slug"
                  params={{ slug: p.slug }}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-[color:var(--brand-blue)]/40 hover:shadow-sm"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{p.title}</div>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">{p.tagline}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[color:var(--brand-blue)] opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "var(--gradient-primary)" }} />
          <div className="relative mx-auto max-w-5xl px-6 py-20 text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Funding {suburb.name} businesses, fast
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              Get matched with the right program for your {suburb.name} business in minutes. Soft credit pull, no obligation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/apply-now">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
                <a href={SITE_CONFIG.phoneHref}><Phone className="mr-2 h-4 w-4" /> Call now</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}