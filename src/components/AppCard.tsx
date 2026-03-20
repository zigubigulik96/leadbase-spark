import { Link } from "react-router-dom";
import { Star, Package } from "lucide-react";
import type { App } from "@/data/apps";

export default function AppCard({ app }: { app: App }) {
  return (
    <div className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-hover hover:-translate-y-0.5">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary overflow-hidden">
          {app.logo ? (
            <img src={app.logo} alt={`${app.name} logo`} className="h-full w-full object-cover" />
          ) : (
            <Package size={24} />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-semibold text-card-foreground truncate">{app.name}</h3>
          <p className="text-sm text-muted-foreground">{app.tagline}</p>
        </div>
      </div>
      <ul className="mb-5 space-y-1.5">
        {app.features.slice(0, 3).map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
            {f}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {app.rating > 0 && (
            <>
              <Star size={14} className="fill-accent text-accent" />
              <span className="font-medium text-card-foreground">{app.rating}</span>
              <span>·</span>
            </>
          )}
          <span>{app.merchants} merchants</span>
        </div>
        <Link
          to={`/apps/${app.slug}`}
          className="text-sm font-semibold text-primary hover:underline"
        >
          View App →
        </Link>
      </div>
    </div>
  );
}
