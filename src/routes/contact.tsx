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

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center fade-in-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <MessageSquare className="h-3.5 w-3.5" />
              We typically respond in under 1 hour
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Let's talk{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
                funding
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Questions, custom scenarios, or ready to apply? Our funding specialists are
              standing by. No scripts, no pressure, just straight answers.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" /> 100% confidential
              </span>
              <span className="text-border">•</span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Soft pull only
              </span>
              <span className="text-border">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" /> 24-hour decisions
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
              sub: "Mon-Fri, 8am-8pm ET",
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
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
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
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
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
                    <MapPin className="mt-0.5 h-3.5 w-3.5 text-primary" />
                    {area}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
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
            className="rounded-2xl border border-primary/30 p-6 text-primary-foreground shadow-lg"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            <h3 className="text-lg font-semibold">Ready to apply?</h3>
            <p className="mt-2 text-sm opacity-90">
              Skip the back-and-forth. Pre-qualify in 60 seconds with no impact on
              your credit.
            </p>
            <Button asChild variant="secondary" className="mt-4 w-full">
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