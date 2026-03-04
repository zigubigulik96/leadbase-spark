import { useParams, Link } from "react-router-dom";
import { ArrowRight, Star, CheckCircle2, Package, MessageSquare } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { useApp } from "@/hooks/useApps";

export default function AppDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: app, isLoading, isError } = useApp(slug || "");

  if (isLoading) {
    return (
      <Layout>
        <div className="section-padding">
          <div className="container-tight space-y-6 animate-pulse">
            <div className="h-16 w-16 rounded-2xl bg-muted" />
            <div className="h-8 w-64 rounded-lg bg-muted" />
            <div className="h-4 w-96 rounded bg-muted" />
          </div>
        </div>
      </Layout>
    );
  }

  if (isError || !app) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground">App not found</h1>
          <Link to="/apps" className="mt-4 inline-block text-primary hover:underline">← Back to Apps</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-muted/30">
        <div className="container-tight">
          <FadeIn>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/apps" className="hover:text-foreground">Apps</Link>
              <span>/</span>
              <span className="text-foreground">{app.name}</span>
            </div>
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Package size={32} />
              </div>
              <div>
                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">{app.name}</h1>
                <p className="mt-2 text-lg text-muted-foreground">{app.tagline}</p>
                <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Star size={14} className="fill-accent text-accent" /> {app.rating}</span>
                  <span>·</span>
                  <span>{app.merchants} merchants</span>
                </div>
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <a href="#" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 gap-2">
                    Install on Shopify <ArrowRight size={16} />
                  </a>
                  <Link to="/contact" className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm hover:bg-muted">
                    Request Demo
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding">
        <div className="container-tight">
          <FadeIn>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">{app.description}</p>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-muted/30">
        <div className="container-tight">
          <FadeIn>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Features</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-4">
            {app.features.map((f, i) => (
              <FadeIn key={f} delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-card-foreground">{f}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding">
        <div className="container-tight">
          <FadeIn>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">How It Works</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {app.howItWorks.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading font-bold text-sm">
                    {i + 1}
                  </div>
                  <h3 className="mt-3 font-heading text-base font-semibold text-foreground">{step.step}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-muted/30">
        <div className="container-tight">
          <FadeIn>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">Pricing</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6">
            {app.pricing.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 0.1}>
                <div className={`rounded-xl border p-6 text-center ${i === 1 ? "border-primary bg-card shadow-hover" : "border-border bg-card shadow-card"}`}>
                  <h3 className="font-heading text-lg font-semibold text-card-foreground">{tier.name}</h3>
                  <p className="mt-2 font-heading text-3xl font-bold text-foreground">{tier.price}</p>
                  <ul className="mt-5 space-y-2 text-left">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof placeholder */}
      <section className="section-padding">
        <div className="container-tight">
          <FadeIn>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">What Merchants Say</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { name: "Sarah M.", store: "Bloom & Co", text: `${app.name} increased our conversion rate by 18% in the first month. Setup took 5 minutes.` },
              { name: "James R.", store: "Peak Outdoors", text: `Clean, fast, and it just works. The team behind it is responsive and genuinely helpful.` },
            ].map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <MessageSquare size={20} className="text-primary mb-3" />
                  <p className="text-sm text-muted-foreground italic leading-relaxed">"{t.text}"</p>
                  <p className="mt-3 text-sm font-medium text-card-foreground">{t.name} · {t.store}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/30">
        <div className="container-tight">
          <FadeIn>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">FAQ</h2>
          </FadeIn>
          <div className="space-y-4">
            {app.faqs.map((faq, i) => (
              <FadeIn key={faq.q} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-card p-5 shadow-card">
                  <h3 className="font-heading text-sm font-semibold text-card-foreground">{faq.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section-padding bg-primary">
        <div className="container-tight text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl font-bold text-primary-foreground">Need customization?</h2>
            <p className="mt-2 text-primary-foreground/80 text-sm">We can build custom features or integrations for your store.</p>
            <Link to="/contact" className="mt-5 inline-flex items-center justify-center rounded-lg bg-card text-foreground px-6 py-3 text-sm font-semibold shadow-sm hover:opacity-90">
              Contact Lead Base
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
