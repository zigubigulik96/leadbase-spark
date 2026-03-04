import { Link } from "react-router-dom";
import type { BlogPost } from "@/data/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block rounded-xl border border-border bg-card overflow-hidden shadow-card transition-all hover:shadow-hover hover:-translate-y-0.5"
    >
      <div className="aspect-[16/9] bg-muted flex items-center justify-center">
        <span className="text-3xl font-heading font-bold text-muted-foreground/30">LB</span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">{post.category}</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="font-heading text-base font-semibold text-card-foreground leading-snug group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  );
}
