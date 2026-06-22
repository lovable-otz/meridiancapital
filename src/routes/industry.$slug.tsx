import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIndustry, INDUSTRIES, type Service } from "@/lib/industries-data";
import { Header, Footer } from "./index";
import { buildHead } from "@/lib/seo";
import { buildGraph, serviceNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";
import { INDUSTRY_BODIES } from "@/lib/industries-content";

export const Route = createFileRoute("/industry/$slug")({
  head: ({ params }) => {
    const ind = getIndustry(params.slug);
    const title = ind ? `${ind.label} Business Financing` : "Industry Financing";
    const description = ind?.intro ?? "Specialized business financing for your industry.";
    const path = `/industry/${params.slug}`;
    return buildHead({
      title,
      description,
      path,
      schema: buildGraph({
        title,
        description,
        path,
        extraNodes: ind
          ? [serviceNode({ path, name: `${ind.label} Business Financing`, description, serviceType: ind.label })]
          : [],
      }),
    });
  },
  loader: ({ params }) => {
    if (!getIndustry(params.slug)) throw notFound();
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Industry not found</h1>
      <p className="mt-3 text-muted-foreground">We don't have a page for that industry yet.</p>
      <Button asChild className="mt-6">
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <Button onClick={reset} className="mt-6">Try again</Button>
    </div>
  ),
  component: IndustryPage,
});

function IndustryPage() {
  const { slug } = Route.useParams();
  const industry = getIndustry(slug)!;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [industry.slug]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
      {/* Breadcrumb */}
      <div className="border-b border-border/60 bg-card/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-sm">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <span className="text-muted-foreground">Industries / <span className="text-foreground font-medium">{industry.label}</span></span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "28px 28px",
            color: "var(--brand-blue)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--gradient-primary)" }}
        />
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-[color:var(--brand-blue)]" />
            Industry-specific financing
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            {industry.label} Financing
          </h1>
          <p className="mt-3 text-xl font-medium text-[color:var(--brand-blue)]">{industry.hero}</p>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">{industry.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/apply-now">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={SITE_CONFIG.phoneHref}><Phone className="mr-2 h-4 w-4" /> Talk to a specialist</a>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[color:var(--brand-blue)]" /> Soft credit pull</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[color:var(--brand-blue)]" /> 24-hour decisions</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[color:var(--brand-blue)]" /> 75+ lender network</span>
          </div>
        </div>
      </section>

      {/* Miami industry context */}
      {INDUSTRY_BODIES[industry.slug] && (
        <section className="border-t border-border/60 bg-card/30">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {industry.label} financing for Miami businesses
            </h2>
            {INDUSTRY_BODIES[industry.slug].map((p, i) => (
              <p key={i} className="mt-4 text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Services list — uniform card grid */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Financing built for {industry.label.toLowerCase()}
          </h2>
          <p className="mt-4 text-muted-foreground">
            Browse the programs we structure most often for {industry.label.toLowerCase()} operators. Every option starts with a soft credit pull.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industry.services.map((svc: Service) => {
            const SIcon = svc.icon;
            return (
              <article
                key={svc.slug}
                className="group flex min-w-0 flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-[color:var(--brand-blue)]/40 hover:shadow-[var(--shadow-elegant)]"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[color:var(--brand-blue)]/10 text-[color:var(--brand-blue)]">
                  <SIcon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{svc.title}</h3>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{svc.tagline}</p>
                <p className="mt-3 text-sm text-foreground/80">{svc.description}</p>
                <ul className="mt-4 space-y-2">
                  {svc.bullets.map((b: string) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[color:var(--brand-blue)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--brand-blue)]/10 px-3 py-1 text-xs font-semibold text-[color:var(--brand-blue)]">
                  {svc.highlight}
                </div>
                <div className="mt-auto pt-5">
                  <Button asChild size="sm" className="w-full">
                    <Link to="/apply-now">
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Other industries */}
      <section className="border-t border-border/60 bg-card/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Explore other industries</h2>
              <p className="mt-2 text-muted-foreground">Specialized programs across every sector we serve.</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/">View all</Link>
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {INDUSTRIES.filter((i) => i.slug !== industry.slug).slice(0, 10).map((i) => {
              const I = i.icon;
              return (
                <Link
                  key={i.slug}
                  to="/industry/$slug"
                  params={{ slug: i.slug }}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-[color:var(--brand-blue)]/40 hover:shadow-[var(--shadow-elegant)]"
                >
                  <I className="h-6 w-6 text-[color:var(--brand-blue)] transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">{i.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-primary)" }}
        />
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to fund your next move?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Get matched with the right {industry.label.toLowerCase()} program in minutes. Soft credit pull, no obligation.
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