import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import BlogCard from "@/components/BlogCard";
import { useBlogPost, useBlogPosts } from "@/hooks/useBlog";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = useBlogPost(slug || "");
  const { data: allPosts = [] } = useBlogPosts();

  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  // Simple markdown-to-html for ## headings and paragraphs
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith("## ")) {
        return <h2 key={i} className="font-heading text-xl font-bold text-foreground mt-8 mb-3">{trimmed.slice(3)}</h2>;
      }
      if (trimmed.startsWith("### ")) {
        return <h3 key={i} className="font-heading text-lg font-semibold text-foreground mt-6 mb-2">{trimmed.slice(4)}</h3>;
      }
      if (trimmed.startsWith("- ")) {
        return <li key={i} className="text-muted-foreground ml-4 list-disc">{trimmed.slice(2)}</li>;
      }
      return <p key={i} className="text-muted-foreground leading-relaxed mb-3">{trimmed}</p>;
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="section-padding">
          <div className="container-tight space-y-4 animate-pulse">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-8 w-full rounded-lg bg-muted" />
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="mt-8 space-y-3">
              {[...Array(6)].map((_, i) => <div key={i} className="h-4 rounded bg-muted" />)}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isError || !post) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground">Post not found</h1>
          <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">← Back to Blog</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="section-padding">
        <div className="container-tight">
          <FadeIn>
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">{post.category}</span>
              <span>{post.publishedAt}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
              <span>·</span>
              <span>By Lead Base</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground leading-tight text-balance">
              {post.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            {post.image && (
              <div className="mt-8 rounded-2xl overflow-hidden border border-border">
                <img src={post.image} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
              </div>
            )}
            <div className="mt-8 border-t border-border pt-8">
              {renderContent(post.content)}
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.2}>
            <div className="mt-12 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="font-heading text-lg font-semibold text-foreground">Need help implementing this?</p>
              <p className="mt-1 text-sm text-muted-foreground">Our team can handle the technical work for you.</p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Contact Lead Base
              </Link>
            </div>
          </FadeIn>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-wide">
            <FadeIn>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Related Posts</h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((p, i) => (
                <FadeIn key={p.slug} delay={i * 0.1}>
                  <BlogCard post={p} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
