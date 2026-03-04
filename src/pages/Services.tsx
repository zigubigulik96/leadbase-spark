import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Clock, FileText, Palette, Code2, Gauge, BarChart3 } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";

const themeServices = [
  "Layout & spacing adjustments",
  "Typography & color changes",
  "Custom CSS styling",
  "Section reordering & visibility",
  "Mobile responsiveness fixes",
  "Bug fixes & browser compatibility",
];

const customServices = [
  "Custom Liquid sections & blocks",
  "Product page enhancements",
  "Collection & landing page templates",
  "Mega menus & navigation",
  "Performance optimization",
  "CRO-focused improvements",
];

const packages = [
  {
    name: "Quick Fix",
    price: "From $150",
    turnaround: "1–2 business days",
    features: ["Single task or bug fix", "Up to 2 hours of work", "One round of revisions", "QA on desktop & mobile"],
  },
  {
    name: "Growth Package",
    price: "From $500",
    turnaround: "3–5 business days",
    features: ["2–4 customizations", "Up to 8 hours of work", "Two rounds of revisions", "Performance audit included"],
    popular: true,
  },
  {
    name: "Custom Build",
    price: "Custom quote",
    turnaround: "1–3 weeks",
    features: ["Full sections & templates", "Custom Liquid development", "Unlimited revisions", "Ongoing support available"],
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding">
        <div className="container-tight text-center">
          <FadeIn>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground text-balance">
              Shopify theme edits and custom template development
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From quick CSS fixes to full custom section builds — we deliver clean, fast, conversion-focused Shopify development.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Theme Editing */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <div className="flex items-center gap-3 mb-4">
                <Palette size={24} className="text-primary" />
                <h2 className="font-heading text-2xl font-bold text-foreground">Theme Editing</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Small tasks, handled fast. Whether it's a spacing fix, a styling change, or a layout tweak — we deliver pixel-perfect results with fast turnaround.
              </p>
              <ul className="space-y-3">
                {themeServices.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-primary shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-3 mb-4">
                <Code2 size={24} className="text-primary" />
                <h2 className="font-heading text-2xl font-bold text-foreground">Custom Template Development</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Need something your theme can't do? We build custom sections, blocks, and full page templates in Liquid — optimized for performance and conversions.
              </p>
              <ul className="space-y-3">
                {customServices.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-primary shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-padding">
        <div className="container-wide">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground">Service Packages</h2>
              <p className="mt-2 text-muted-foreground">Choose what fits your needs — or request a custom quote.</p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <FadeIn key={pkg.name} delay={i * 0.1}>
                <div className={`rounded-xl border p-7 h-full flex flex-col ${pkg.popular ? "border-primary shadow-hover" : "border-border shadow-card"} bg-card`}>
                  {pkg.popular && (
                    <span className="inline-block self-start rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary mb-3">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-heading text-xl font-semibold text-card-foreground">{pkg.name}</h3>
                  <p className="mt-1 font-heading text-2xl font-bold text-foreground">{pkg.price}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                    <Clock size={12} /> {pkg.turnaround}
                  </div>
                  <ul className="mt-5 space-y-2 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 w-full"
                  >
                    Request a Quote
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* What we need */}
      <section className="section-padding bg-muted/30">
        <div className="container-tight">
          <FadeIn>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">What We Need From You</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: FileText, text: "A description of what you want changed or built" },
                { icon: Palette, text: "Design references or screenshots (if applicable)" },
                { icon: Gauge, text: "Access to your Shopify store (collaborator invite)" },
                { icon: BarChart3, text: "Timeline and priority expectations" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-card">
                  <item.icon size={18} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding">
        <div className="container-tight text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Our Process</h2>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {["Audit", "Plan", "Build", "QA", "Launch"].map((s, i) => (
                <span key={s} className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">{s}</span>
                  {i < 4 && <ArrowRight size={14} className="text-muted-foreground/50" />}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-tight text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-primary-foreground">Ready to improve your store?</h2>
            <p className="mt-3 text-primary-foreground/80">Tell us what you need and we'll send a quote within 24 hours.</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-card text-foreground px-6 py-3 text-sm font-semibold shadow-sm hover:opacity-90"
            >
              Request a Quote
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
