import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { ArrowRight, MapPin, Banknote, Briefcase, Building2 } from "lucide-react";
import { Header, Footer } from "./index";
import { Button } from "@/components/ui/button";
import { MONEY_PILLARS, VERTICAL_PILLARS, TOP_MONEY_PILLARS } from "@/lib/pillars-data";
import { SUBURBS } from "@/lib/suburbs-data";
import { buildHead } from "@/lib/seo";
import { buildGraph } from "@/lib/seo-schema";

export const Route = createFileRoute("/miami")({
  head: ({ matches, match }) => {
    if (matches[matches.length - 1]?.routeId !== match.routeId) return {};
    const title = "Miami Business Loans Hub";
    const description =
      "The complete Miami, FL business funding directory covering 38 loan programs, 10 neighborhoods and adjacent cities served, from Brickell to Aventura.";
    return buildHead({
      title,
      description,
      path: "/miami",
      schema: buildGraph({ title, description, path: "/miami", pageType: "CollectionPage" }),
    });
  },
  component: MiamiHub,
});

function MiamiHub() {
  // Only render the hub UI when we're on the index leaf (no child route matched).
  const matches = useMatches();
  const isLeaf = matches[matches.length - 1]?.routeId === "/miami";
  if (!isLeaf) return <Outlet />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden border-b border-border py-20 text-white"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <div className="mx-auto max-w-7xl px-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <MapPin className="h-3.5 w-3.5" /> Miami, FL · 10 neighborhoods · 38 loan programs
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
              Miami Business Loans
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              The complete Meridian Capital directory for Miami, FL: every loan program we
              broker, mapped to every neighborhood and adjacent city we serve.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-[image:var(--gradient-cta)] text-[color:var(--accent-success-foreground)]">
                <Link to="/apply-now">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link to="/">Back to home</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Neighborhoods & adjacent cities</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Each location has a dedicated page with local landmarks, sample businesses we fund,
                and the eight most popular loan programs for that neighborhood.
              </p>
            </div>
            <span className="hidden text-xs uppercase tracking-wider text-muted-foreground md:block">
              {SUBURBS.length} locations
            </span>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SUBURBS.map((s) => (
              <Link
                key={s.slug}
                to="/miami/$suburb"
                params={{ suburb: s.slug }}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-[color:var(--brand-blue)]/40 hover:shadow-[var(--shadow-elegant)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.county}</div>
                    <h3 className="mt-1 text-lg font-semibold">{s.name}</h3>
                  </div>
                  <MapPin className="h-5 w-5 shrink-0 text-[color:var(--brand-blue)]" />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{s.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--brand-blue)] group-hover:underline">
                  Explore {s.name} <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Money pillars */}
        <PillarGrid
          title="Money pillars, general business financing"
          subtitle="The 18 core funding programs we broker for Miami businesses."
          icon={Banknote}
          pillars={MONEY_PILLARS}
        />

        {/* Suburb × Services matrix */}
        <SuburbServicesMatrix />

        {/* Vertical pillars */}
        <PillarGrid
          title="Vertical pillars, industry-specific funding"
          subtitle="20 industry-specialized lending programs for Miami operators."
          icon={Briefcase}
          pillars={VERTICAL_PILLARS}
          alt
        />
      </main>
      <Footer />
    </div>
  );
}

function PillarGrid({
  title,
  subtitle,
  icon: Icon,
  pillars,
  alt,
}: {
  title: string;
  subtitle: string;
  icon: typeof Banknote;
  pillars: typeof MONEY_PILLARS;
  alt?: boolean;
}) {
  return (
    <section className={`${alt ? "bg-secondary/40" : ""} border-t border-border/60 py-20`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: "var(--gradient-primary)" }}>
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
            <p className="mt-1 text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
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
  );
}

function SuburbServicesMatrix() {
  return (
    <section className="border-t border-border/60 bg-card/30 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-start gap-4">
          <span
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Building2 className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Services by neighborhood
            </h2>
            <p className="mt-1 max-w-2xl text-muted-foreground">
              Every neighborhood we serve, mapped to the eight money pillars
              Miami owners ask for most. Click any combination to open a
              dedicated, locally written page.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {SUBURBS.map((s) => (
            <div
              key={s.slug}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {s.county}
                  </div>
                  <Link
                    to="/miami/$suburb"
                    params={{ suburb: s.slug }}
                    className="mt-0.5 inline-flex items-center gap-1 text-lg font-semibold hover:text-[color:var(--brand-blue)]"
                  >
                    {s.name} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>
                </div>
                <MapPin className="h-5 w-5 shrink-0 text-[color:var(--brand-blue)]" />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {TOP_MONEY_PILLARS.map((p) => (
                  <Link
                    key={p.slug}
                    to="/miami/$suburb/$pillar"
                    params={{ suburb: s.slug, pillar: p.slug }}
                    className="group inline-flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm transition-colors hover:border-[color:var(--brand-blue)]/50 hover:bg-secondary"
                  >
                    <span className="truncate">{p.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[color:var(--brand-blue)] opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>ZIPs: {s.zips.join(", ")}</span>
                <Link
                  to="/miami/$suburb"
                  params={{ suburb: s.slug }}
                  className="font-medium text-[color:var(--brand-blue)] hover:underline"
                >
                  View {s.name} hub →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}