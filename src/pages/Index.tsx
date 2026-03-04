import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Zap, Code2, MessageSquare, Gauge, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import AppCard from "@/components/AppCard";
import BlogCard from "@/components/BlogCard";
import { apps } from "@/data/apps";
import { blogPosts } from "@/data/blog";

const benefits = [
  { icon: ShieldCheck, title: "Shopify Expertise", desc: "Deep knowledge of Liquid, themes, checkout, and the app ecosystem." },
  { icon: Zap, title: "Fast Turnaround", desc: "Most theme edits delivered in 24–48 hours. Apps ship on tight timelines." },
  { icon: Code2, title: "Clean Code", desc: "Maintainable, well-documented code that future developers will thank you for." },
  { icon: Gauge, title: "Performance-Minded", desc: "Every line of code is optimized for speed. Your store stays fast." },
  { icon: MessageSquare, title: "Clear Communication", desc: "You'll always know what's happening, what's next, and when it's done." },
];

const processSteps = ["Audit", "Plan", "Build", "QA", "Launch"];

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding">
        <div className="container-tight text-center">
          <FadeIn>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance leading-[1.1]">
              Shopify apps and theme development that{" "}
              <span className="text-primary">grow your store</span>.
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              Lead Base builds high-performing Shopify apps and delivers fast, reliable theme edits and custom template development.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/apps"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 gap-2"
              >
                View Apps <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-muted"
              >
                Get a Quote
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Apps Preview */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground">Featured Apps</h2>
              <p className="mt-2 text-muted-foreground">Tools built by merchants, for merchants.</p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.slice(0, 3).map((app, i) => (
              <FadeIn key={app.slug} delay={i * 0.1}>
                <AppCard app={app} />
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className="text-center mt-10">
              <Link to="/apps" className="text-sm font-semibold text-primary hover:underline">
                View all apps →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-wide">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground">Services</h2>
              <p className="mt-2 text-muted-foreground">Expert Shopify development, on demand.</p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn>
              <div className="rounded-xl border border-border bg-card p-8 shadow-card h-full">
                <h3 className="font-heading text-xl font-semibold text-card-foreground">Theme Editing</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                  Pixel-perfect changes, fast. Small tasks and quick fixes handled with care and precision.
                </p>
                <ul className="mt-4 space-y-2">
                  {["Layout adjustments", "CSS & styling fixes", "Section customization", "Bug fixes & QA"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={14} className="text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="rounded-xl border border-border bg-card p-8 shadow-card h-full">
                <h3 className="font-heading text-xl font-semibold text-card-foreground">Custom Template Development</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                  Custom sections, blocks, and full templates built in Liquid with performance and CRO in mind.
                </p>
                <ul className="mt-4 space-y-2">
                  {["Custom sections & blocks", "Liquid development", "Performance optimization", "CRO improvements"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={14} className="text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Our process:</span>
              {processSteps.map((s, i) => (
                <span key={s} className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{s}</span>
                  {i < processSteps.length - 1 && <ArrowRight size={12} className="text-muted-foreground/50" />}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Lead Base */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground">Why Lead Base</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <FadeIn key={b.title} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <b.icon size={24} className="text-primary mb-3" />
                  <h3 className="font-heading text-base font-semibold text-card-foreground">{b.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="section-padding">
        <div className="container-wide">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-foreground">From the Blog</h2>
              <p className="mt-2 text-muted-foreground">Tips, guides, and insights for Shopify merchants.</p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.1}>
                <BlogCard post={post} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-primary">
        <div className="container-tight text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-primary-foreground">Tell us what you're building.</h2>
            <p className="mt-3 text-primary-foreground/80">
              Whether it's a new app idea, a theme tweak, or a full custom build — we're here to help.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-card text-foreground px-6 py-3 text-sm font-semibold shadow-sm transition-all hover:opacity-90"
            >
              Contact Lead Base
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
