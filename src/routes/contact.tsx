import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "./index";
import { Button } from "@/components/ui/button";
import {
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Building2,
  HeadphonesIcon,
} from "lucide-react";
import { buildHead } from "@/lib/seo";
import { buildGraph } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";

export const Route = createFileRoute("/contact")({
  head: () => {
    const title = "Contact Us";
    const description =
      "Have questions about funding? Reach out to our team of business loan experts. Fast responses, no obligation, 100% confidential.";
    return buildHead({
      title,
      description,
      path: "/contact",
      schema: buildGraph({ title, description, path: "/contact", pageType: "ContactPage" }),
    });
  },
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {/* Spacer for fixed Header so the section content does not slide under it. */}
      <div aria-hidden className="h-16" />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-[color:var(--brand-sand)]/30">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[color:var(--brand-gold)] opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center fade-in-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-gold)]/40 bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--brand-gold)]">
              <MessageSquare className="h-3.5 w-3.5" />
              Responds in under 1 hour
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Let's talk{" "}
              <span className="text-[color:var(--brand-gold)]">funding</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Questions, custom scenarios, or ready to apply? Our funding specialists are
              standing by. No scripts, no pressure, just straight answers.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[color:var(--brand-gold)]" /> 100% confidential
              </span>
              <span className="text-border">·</span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[color:var(--brand-gold)]" /> Soft pull only
              </span>
              <span className="text-border">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[color:var(--brand-gold)]" /> 24-hour decisions
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact channels */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              icon: Phone,
              title: "Call us",
              value: SITE_CONFIG.phone,
              sub: `Serving ${SITE_CONFIG.areaCodes.join(" / ")} · Mon-Fri, 8am-8pm ET`,
              href: SITE_CONFIG.phoneHref,
            },
            {
              icon: HeadphonesIcon,
              title: "Live chat",
              value: "Chat with a specialist",
              sub: "Available 24/7 on this site",
              href: "#",
            },
          ].map((c, i) => (
            <a
              key={c.title}
              href={c.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[color:var(--brand-gold)]/50 hover:shadow-xl fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-gold)] to-transparent opacity-70" />
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--brand-gold)]/15 text-[color:var(--brand-gold)]">
                <c.icon className="h-6 w-6" />
              </div>
              <div className="text-sm font-medium text-muted-foreground">{c.title}</div>
              <div className="mt-1 text-xl font-semibold text-foreground">{c.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{c.sub}</div>
              <ArrowRight className="absolute right-5 top-5 h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </section>

      {/* Info cards */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--brand-gold)]/15 text-[color:var(--brand-gold)]">
              <Building2 className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">
              {SITE_CONFIG.hasPublicOffice ? "Headquarters" : "Service area"}
            </h3>
            {SITE_CONFIG.hasPublicOffice ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {SITE_CONFIG.address.streetAddress}
                <br />
                {SITE_CONFIG.address.addressLocality}, {SITE_CONFIG.address.addressRegion}{" "}
                {SITE_CONFIG.address.postalCode}
              </p>
            ) : (
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {SITE_CONFIG.areasServed.map((area) => (
                  <li key={area} className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 text-[color:var(--brand-gold)]" />
                    {area}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--brand-gold)]/15 text-[color:var(--brand-gold)]">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">Business hours</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <li className="flex justify-between"><span>Mon-Fri</span><span>8am-8pm ET</span></li>
              <li className="flex justify-between"><span>Saturday</span><span>10am-4pm ET</span></li>
              <li className="flex justify-between"><span>Sunday</span><span>Closed</span></li>
            </ul>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg"
            style={{ backgroundImage: "var(--gradient-hero)" }}
          >
            <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-gold)] to-transparent opacity-70" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">Next step</span>
            <h3 className="mt-2 text-lg font-semibold">Ready to apply?</h3>
            <p className="mt-2 text-sm text-white/80">
              Skip the back-and-forth. Pre-qualify in 60 seconds with no impact on
              your credit.
            </p>
            <Button
              asChild
              className="mt-4 w-full bg-[color:var(--brand-gold)] hover:bg-[color:var(--brand-gold-hover)] text-[color:var(--accent-success-foreground)]"
            >
              <Link to="/apply-now">
                Apply Now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}