import { useState } from "react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import BlogCard from "@/components/BlogCard";
import { blogPosts, blogCategories } from "@/data/blog";

export default function Blog() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = blogPosts
    .filter((p) => active === "All" || p.category === active)
    .filter((p) => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()));

  const featured = blogPosts[0];

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-wide">
          <FadeIn>
            <div className="text-center mb-10">
              <h1 className="font-heading text-4xl font-bold text-foreground">Blog</h1>
              <p className="mt-2 text-muted-foreground">Tips, guides, and insights for Shopify merchants.</p>
            </div>
          </FadeIn>

          {/* Featured */}
          <FadeIn delay={0.1}>
            <div className="mb-12">
              <BlogCard post={featured} />
            </div>
          </FadeIn>

          {/* Filters */}
          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2 flex-wrap">
                {blogCategories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActive(c)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      active === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-lg border border-input bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-64"
              />
            </div>
          </FadeIn>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.08}>
                <BlogCard post={post} />
              </FadeIn>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No posts found.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
