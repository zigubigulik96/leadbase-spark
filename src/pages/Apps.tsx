import { useState } from "react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import AppCard from "@/components/AppCard";
import { apps, categories } from "@/data/apps";

export default function Apps() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? apps : apps.filter((a) => a.category === active);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-wide">
          <FadeIn>
            <div className="text-center mb-10">
              <h1 className="font-heading text-4xl font-bold text-foreground">Shopify Apps by Lead Base</h1>
              <p className="mt-2 text-muted-foreground">Tools that help merchants sell more and work less.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    active === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((app, i) => (
              <FadeIn key={app.slug} delay={i * 0.08}>
                <AppCard app={app} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
