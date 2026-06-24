import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "./index";
import { buildHead } from "@/lib/seo";
import { buildGraph } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";
import { GHLForm } from "@/components/GHLForm";
import {
  CheckCircle2,
  Clock,
  Lock,
  Phone,
  ShieldCheck,
} from "lucide-react";

const CITY = "Miami";
const CITY_STATE = "Miami, FL";

export const Route = createFileRoute("/apply-now")({
  head: () => {
    const title = "Apply Now";
    const description = `Apply for a business loan in ${CITY_STATE}. Soft credit pull only, no impact to your credit score. Get matched with funding programs in 60 seconds.`;
    return buildHead({
      title,
      description,
      path: "/apply-now",
      noindex: true,
      schema: buildGraph({ title, description, path: "/apply-now" }),
    });
  },
  component: ApplyNowPage,
});

function ApplyNowPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {/* Spacer for fixed Header so the section content does not slide under it. */}
      <div aria-hidden className="h-16" />

      <section
        className="relative overflow-hidden border-b border-border py-14 text-white"
        style={{ background: "var(--gradient-hero)" }}
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-gold)] to-transparent opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-gold)]/40 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--brand-gold)] backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" /> Soft pull · No credit impact
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
            Apply for funding in{" "}
            <span className="text-[color:var(--brand-gold)]">minutes.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Tell us about your business and we'll match you with funding programs you actually qualify
            for, across {CITY_STATE} and beyond.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[color:var(--brand-gold)]" /> Funds in 24-72 hrs
            </span>
            <span className="text-white/40">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-[color:var(--brand-gold)]" /> 256-bit SSL secured
            </span>
            <span className="text-white/40">·</span>
            <span>$15K – $7M available</span>
          </div>
        </div>
      </section>

      <main className="mx-auto grid min-w-0 max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <GHLForm />
        </div>

        <aside className="min-w-0 space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-[color:var(--accent-success)]" /> Why it's safe
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[color:var(--accent-success)]" />
                Soft credit pull, never affects your score
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[color:var(--accent-success)]" />
                Bank-level 256-bit encryption
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[color:var(--accent-success)]" />
                No obligation, compare offers freely
              </li>
            </ul>
          </div>
          <div
            className="relative overflow-hidden rounded-2xl p-5 text-white"
            style={{ background: "var(--gradient-hero)" }}
          >
            <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-gold)] to-transparent opacity-70" />
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">By the numbers</div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold text-[color:var(--brand-gold)]">{SITE_CONFIG.stats.businessesFunded}</div>
                <div className="text-white/70">Businesses funded</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[color:var(--brand-gold)]">{SITE_CONFIG.stats.loansFacilitated}</div>
                <div className="text-white/70">Loans facilitated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[color:var(--brand-gold)]">{SITE_CONFIG.stats.reviewsRating}★</div>
                <div className="text-white/70">{SITE_CONFIG.stats.reviewsCount} reviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[color:var(--brand-gold)]">{SITE_CONFIG.stats.fastestFundingHours}</div>
                <div className="text-white/70">Fastest funding</div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-secondary/40 p-5 text-sm">
            <div className="font-semibold">Need help?</div>
            <p className="mt-1 text-muted-foreground">
              Talk to a {CITY} funding advisor.
            </p>
            <a
              href={SITE_CONFIG.phoneHref}
              className="mt-3 inline-flex items-center gap-2 font-semibold text-[color:var(--brand-gold)] hover:underline"
            >
              <Phone className="h-4 w-4" /> {SITE_CONFIG.phone}
            </a>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
