import { useState } from "react";
import { Mail, Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      storeUrl: formData.get("storeUrl"),
      needs: formData.get("needs"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
    };

    try {
      const response = await fetch("http://localhost:3001/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("Failed to submit quote");
      }
    } catch (error) {
      console.error("Error submitting quote", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-tight">
          <FadeIn>
            <div className="text-center mb-12">
              <h1 className="font-heading text-4xl font-bold text-foreground">Contact Lead Base</h1>
              <p className="mt-2 text-muted-foreground">Tell us about your project and we'll get back to you within 24 hours.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <FadeIn delay={0.1}>
                {submitted ? (
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
                    <h2 className="font-heading text-2xl font-bold text-foreground">Thank you!</h2>
                    <p className="mt-2 text-muted-foreground">We've received your message and will get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                        <input required name="name" type="text" className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                        <input required name="email" type="email" className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Store URL</label>
                      <input type="text" name="storeUrl" className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">What do you need? *</label>
                      <textarea required name="needs" rows={4} className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Describe what you need help with..." />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Budget Range</label>
                        <select name="budget" className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                          <option value="">Select...</option>
                          <option>Under $500</option>
                          <option>$500 – $2,000</option>
                          <option>$2,000 – $5,000</option>
                          <option>$5,000+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Timeline</label>
                        <select name="timeline" className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                          <option value="">Select...</option>
                          <option>ASAP</option>
                          <option>1–2 weeks</option>
                          <option>1 month</option>
                          <option>Flexible</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </FadeIn>
            </div>

            <div>
              <FadeIn delay={0.2}>
                <div className="space-y-6">
                  <div className="rounded-xl border border-border bg-card p-5 shadow-card">
                    <Mail size={20} className="text-primary mb-2" />
                    <h3 className="font-heading text-sm font-semibold text-card-foreground">Email Us</h3>
                    <p className="mt-1 text-sm text-muted-foreground">hello@leadbase.dev</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-5 shadow-card">
                    <Calendar size={20} className="text-primary mb-2" />
                    <h3 className="font-heading text-sm font-semibold text-card-foreground">Book a Call</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Schedule a 15-minute intro call to discuss your project.</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
