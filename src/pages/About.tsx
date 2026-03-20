import { Target, Sparkles, Zap, Shield } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Link } from "react-router-dom";

const values = [
  { icon: Target, title: "Clarity", desc: "We communicate clearly and set honest expectations." },
  { icon: Sparkles, title: "Quality", desc: "Every line of code is written to last and perform." },
  { icon: Zap, title: "Speed", desc: "We move fast without cutting corners." },
  { icon: Shield, title: "Ownership", desc: "We treat your store like it's our own." },
];

export default function About() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-tight text-center">
          <FadeIn>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground text-balance">
              We help Shopify stores build faster, convert better, and scale safely.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Lead Base is a small, focused team of Shopify developers and product builders. We make apps that solve real problems and offer development services that merchants can rely on.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-tight">
          <FadeIn>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We started Lead Base because we saw too many Shopify merchants struggling with slow development, unreliable freelancers, and apps that hurt performance more than they helped.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We wanted to build the kind of company we'd want to hire — one that writes clean code, communicates proactively, and actually cares about the merchant's success. That's what we do every day.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <FadeIn>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">Our Values</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-card text-center">
                  <v.icon size={28} className="text-primary mx-auto mb-3" />
                  <h3 className="font-heading text-base font-semibold text-card-foreground">{v.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      {/* 
    team placeholder
  
      
      <section className="section-padding bg-muted/30">
        <div className="container-tight text-center">
          <FadeIn>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">The Team</h2>
            <p className="text-muted-foreground mb-8">A small, senior team dedicated to Shopify excellence.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {["Founder & Lead Dev", "Senior Liquid Developer", "Product & Design"].map((role) => (
                <div key={role} className="rounded-xl border border-border bg-card p-5 shadow-card">
                  <div className="h-16 w-16 rounded-full bg-muted mx-auto mb-3" />
                  <p className="text-sm font-medium text-card-foreground">{role}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
*/}
      <section className="section-padding bg-primary">
        <div className="container-tight text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-primary-foreground">Want to work with us?</h2>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-card text-foreground px-6 py-3 text-sm font-semibold shadow-sm hover:opacity-90"
            >
              Get in Touch
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
