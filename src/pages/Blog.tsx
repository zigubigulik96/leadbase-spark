import { useState } from "react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Link } from "react-router-dom";
import BlogCard from "@/components/BlogCard";
import { useBlogPosts, useBlogCategories } from "@/hooks/useBlog";
import NewsletterForm from "@/components/NewsletterForm";

export default function Blog() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const { data: allPosts = [], isLoading } = useBlogPosts();
  const { data: categories = ["All"] } = useBlogCategories();

  const filtered = allPosts
    .filter((p) => {
      if (active === "All") return true;
      return p.category.trim() === active.trim();
    })
    .filter(
      (p) =>
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase())
    );

  const highlightedPost = allPosts.find((p) => p.isHighlighted) || allPosts[0];
  const gridPosts = filtered;

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

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-6 h-40 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {/* Featured / Hero */}
              {highlightedPost && (
                <FadeIn delay={0.1}>
                  <Link
                    to={`/blog/${highlightedPost.slug}`}
                    className="group relative mb-16 block overflow-hidden rounded-3xl border border-border bg-card shadow-lg transition-all hover:shadow-xl"
                  >
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="aspect-[16/10] md:aspect-auto h-full overflow-hidden bg-muted">
                        {highlightedPost.image ? (
                          <img
                            src={highlightedPost.image}
                            alt={highlightedPost.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-primary/5">
                            <span className="text-6xl font-heading font-bold text-primary/10">LB</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                        <div className="flex items-center gap-3 text-sm text-primary mb-4">
                          <span className="font-bold tracking-wider uppercase"> {highlightedPost.isHighlighted ? "Featured" : "Latest"} </span>
                          <span className="h-1 w-1 rounded-full bg-border" />
                          <span className="text-muted-foreground">{highlightedPost.publishedAt}</span>
                        </div>
                        <h2 className="font-heading text-3xl lg:text-5xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                          {highlightedPost.title}
                        </h2>
                        <p className="mt-6 text-lg text-muted-foreground line-clamp-3">
                          {highlightedPost.excerpt}
                        </p>
                        <div className="mt-8 flex items-center gap-4 text-sm font-semibold">
                          <span className="text-primary group-hover:underline">Read Article</span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-muted-foreground">{highlightedPost.readingTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              )}

              {/* Filters */}
              <FadeIn delay={0.15}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-2 flex-wrap">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setActive(c)}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${active === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
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
                {gridPosts.map((post, i) => (
                  <FadeIn key={post.slug} delay={i * 0.08}>
                    <BlogCard post={post} />
                  </FadeIn>
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="text-center text-muted-foreground py-12">No posts found.</p>
              )}

              {/* Newsletter */}
              <FadeIn delay={0.2}>
                <div className="mt-16 rounded-2xl bg-muted/60 border border-border p-8 sm:p-12 text-center">
                  <h2 className="font-heading text-2xl font-bold text-foreground">Stay in the loop</h2>
                  <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                    Get Shopify tips, app updates, and growth strategies delivered to your inbox.
                  </p>
                  <NewsletterForm className="mt-6 max-w-md mx-auto" />
                </div>
              </FadeIn>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
