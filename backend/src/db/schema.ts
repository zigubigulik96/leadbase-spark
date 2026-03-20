import { pgTable, text, real, timestamp, uuid, jsonb, boolean } from "drizzle-orm/pg-core";

// ──────────────────────────────────────────────────────────────
// Type helpers for JSON columns
// ──────────────────────────────────────────────────────────────

export interface PricingTier {
    name: string;
    price: string;
    features: string[];
}

export interface HowItWorksStep {
    step: string;
    description: string;
}

export interface Faq {
    q: string;
    a: string;
}

// ──────────────────────────────────────────────────────────────
// Apps
// ──────────────────────────────────────────────────────────────

export const apps = pgTable("apps", {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    logo: text("logo"),
    tagline: text("tagline").notNull(),
    description: text("description").notNull(),
    category: text("category").notNull(),
    rating: real("rating").notNull(),
    merchants: text("merchants").notNull(),
    features: jsonb("features").notNull().$type<string[]>(),
    pricing: jsonb("pricing").notNull().$type<PricingTier[]>(),
    howItWorks: jsonb("how_it_works").notNull().$type<HowItWorksStep[]>(),
    faqs: jsonb("faqs").notNull().$type<Faq[]>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ──────────────────────────────────────────────────────────────
// Blog Posts
// ──────────────────────────────────────────────────────────────

export const blogPosts = pgTable("blog_posts", {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull(),
    category: text("category").notNull(),
    content: text("content").notNull(),
    readingTime: text("reading_time").notNull(),
    publishedAt: text("published_at").notNull(),
    image: text("image"),
    isHighlighted: boolean("is_highlighted").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ──────────────────────────────────────────────────────────────
// Newsletter Subscribers
// ──────────────────────────────────────────────────────────────

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

export type App = typeof apps.$inferSelect;
export type NewApp = typeof apps.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type NewNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;
