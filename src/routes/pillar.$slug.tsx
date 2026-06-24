import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { Header, Footer } from "./index";
import { Button } from "@/components/ui/button";
import { getPillar, PILLARS, type Pillar } from "@/lib/pillars-data";
import { PILLAR_BODIES } from "@/lib/pillars-content";
import { SUBURBS } from "@/lib/suburbs-data";
import { buildHead } from "@/lib/seo";
import { buildGraph, serviceNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";

export const Route = createFileRoute("/pillar/$slug")({
  head: ({ params }) => {
    const p = getPillar(params.slug);
    const title = p ? `${p.title} in Miami, FL` : "Loan Program";
    const description =
      p?.description ?? "Miami business financing programs from Briarcliff Advances.";
    const path = `/pillar/${params.slug}`;
    return buildHead({
      title,
      description,
      path,
      schema: buildGraph({
        title,
        description,
        path,
        extraNodes: p
          ? [serviceNode({ path, name: p.title, description: p.description, serviceType: p.title })]
          : [],
      }),
    });
  },
  loader: ({ params }) => {
    const pillar = getPillar(params.slug);
    if (!pillar) throw notFound();
    return { pillar } as { pillar: Pillar };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Loan program not found</h1>
      <Button asChild className="mt-6"><Link to="/miami">Back to hub</Link></Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <Button onClick={reset} className="mt-6">Try again</Button>
    </div>
  ),
  component: PillarPage,
});

function PillarPage() {
  const { pillar } = Route.useLoaderData();
  const related = PILLARS.filter((p) => p.kind === pillar.kind && p.slug !== pillar.slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div aria-hidden className="h-16" />
      <main>
        <div className="border-b border-border/60 bg-card/30">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-sm">
            <Link to="/miami" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Miami hub
            </Link>
            <span className="text-muted-foreground">
              {pillar.kind === "money" ? "Money pillar" : "Vertical pillar"} Â·{" "}
              <span className="font-medium text-foreground">{pillar.title}</span>
            </span>
          </div>
        </div>

        <section className="relative overflow-hidden border-b border-border/60 bg-[color:var(--brand-sand)]/30">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[color:var(--brand-gold)] opacity-20 blur-3xl" />
          <div className="relative mx-auto max-w-4xl px-6 py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-gold)]/40 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--brand-gold)]">
              <Sparkles className="h-3.5 w-3.5" />
              Miami, FL · {pillar.kind === "money" ? "Money pillar" : "Vertical pillar"}
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">{pillar.title} in Miami, FL</h1>
            <p className="mt-3 text-xl font-medium text-[color:var(--brand-gold)]">{pillar.tagline}</p>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">{pillar.description}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {pillar.bullets.map((b: string) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[color:var(--brand-gold)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-gold)]/15 px-3 py-1 text-sm font-semibold text-[color:var(--brand-gold)]">
              {pillar.highlight}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-[color:var(--brand-gold)] hover:bg-[color:var(--brand-gold-hover)] text-[color:var(--accent-success-foreground)]">
                <Link to="/apply-now">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[color:var(--brand-gold)]/50 text-foreground hover:bg-[color:var(--brand-gold)]/10">
                <a href={SITE_CONFIG.phoneHref}><Phone className="mr-2 h-4 w-4" /> {SITE_CONFIG.phone}</a>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[color:var(--brand-gold)]" /> Soft credit pull only</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[color:var(--brand-gold)]" /> 24-hour decisions</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[color:var(--brand-gold)]" /> Florida-licensed lenders</span>
            </div>
          </div>
        </section>

        {/* Miami context */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            {pillar.title} for Miami businesses
          </h2>
          {(PILLAR_BODIES[pillar.slug] ?? []).map((p, i) => (
            <p key={i} className="mt-4 text-muted-foreground">
              {p}
            </p>
          ))}
          <p className="mt-4 text-muted-foreground">
            Every Briarcliff Advances application runs through Florida-licensed lenders. We do one
            soft credit pull, present the matching offers, and let you choose. No fee until close.
          </p>
        </section>

        {/* Neighborhoods */}
        <section className="border-t border-border/60 bg-card/40">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {pillar.title} by Miami neighborhood
            </h2>
            <p className="mt-2 text-muted-foreground">
              Get a page tailored to your specific neighborhood or adjacent city.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SUBURBS.map((s) => (
                <Link
                  key={s.slug}
                  to="/miami/$suburb/$pillar"
                  params={{ suburb: s.slug, pillar: pillar.slug }}
                  className="group flex min-w-0 items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-[color:var(--brand-gold)]/50 hover:shadow-sm"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{pillar.title}, {s.name}</div>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">{s.county}</div>
                  </div>
                  <MapPin className="h-4 w-4 shrink-0 text-[color:var(--brand-gold)]" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Related pillars */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Related {pillar.kind === "money" ? "money" : "industry"} programs
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/pillar/$slug"
                params={{ slug: p.slug }}
                className="group flex min-w-0 items-start justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-[color:var(--brand-gold)]/50 hover:shadow-sm"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold">{p.title}</div>
                  <div className="mt-0.5 truncate text-xs text-muted-foreground">{p.tagline}</div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-[color:var(--brand-gold)] opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}