import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../db/index.js";
import { blogPosts } from "../db/schema.js";
import { eq, desc, ne } from "drizzle-orm";
import { apiKeyHook } from "../middleware/apiKey.js";

const BlogPostSchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    excerpt: z.string().min(1),
    category: z.string().min(1),
    content: z.string().min(1),
    readingTime: z.string().min(1),
    publishedAt: z.string().min(1), // YYYY-MM-DD
    image: z.string().nullable().optional(),
    isHighlighted: z.boolean().optional().default(false),
});

export async function blogRoutes(fastify: FastifyInstance) {
    // GET /api/blog/categories — must be BEFORE /:slug
    fastify.get("/blog/categories", async () => {
        const rows = await db
            .selectDistinct({ category: blogPosts.category })
            .from(blogPosts)
            .orderBy(blogPosts.category);
        return ["All", ...rows.map((r) => r.category)];
    });

    // GET /api/blog?category=X
    fastify.get<{ Querystring: { category?: string } }>("/blog", async (req) => {
        const { category } = req.query;
        if (category && category !== "All") {
            return db
                .select()
                .from(blogPosts)
                .where(eq(blogPosts.category, category))
                .orderBy(desc(blogPosts.publishedAt));
        }
        return db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
    });

    // GET /api/blog/:slug
    fastify.get<{ Params: { slug: string } }>("/blog/:slug", async (req, reply) => {
        const [post] = await db
            .select()
            .from(blogPosts)
            .where(eq(blogPosts.slug, req.params.slug));
        if (!post) return reply.status(404).send({ error: "Post not found" });
        return post;
    });

    // POST /api/blog [protected]
    fastify.post("/blog", { preHandler: [apiKeyHook] }, async (req, reply) => {
        const parsed = BlogPostSchema.safeParse(req.body);
        if (!parsed.success) {
            return reply.status(400).send({ error: "Validation failed", details: parsed.error.flatten() });
        }
        if (parsed.data.isHighlighted) {
            await db.update(blogPosts).set({ isHighlighted: false });
        }
        const [created] = await db.insert(blogPosts).values(parsed.data).returning();
        return reply.status(201).send(created);
    });

    // PUT /api/blog/:slug [protected]
    fastify.put<{ Params: { slug: string } }>(
        "/blog/:slug",
        { preHandler: [apiKeyHook] },
        async (req, reply) => {
            const parsed = BlogPostSchema.partial().safeParse(req.body);
            if (!parsed.success) {
                return reply.status(400).send({ error: "Validation failed", details: parsed.error.flatten() });
            }
            if (parsed.data.isHighlighted) {
                await db.update(blogPosts).set({ isHighlighted: false }).where(ne(blogPosts.slug, req.params.slug));
            }
            const [updated] = await db
                .update(blogPosts)
                .set(parsed.data)
                .where(eq(blogPosts.slug, req.params.slug))
                .returning();
            if (!updated) return reply.status(404).send({ error: "Post not found" });
            return updated;
        }
    );

    // DELETE /api/blog/:slug [protected]
    fastify.delete<{ Params: { slug: string } }>(
        "/blog/:slug",
        { preHandler: [apiKeyHook] },
        async (req, reply) => {
            const [deleted] = await db
                .delete(blogPosts)
                .where(eq(blogPosts.slug, req.params.slug))
                .returning();
            if (!deleted) return reply.status(404).send({ error: "Post not found" });
            return reply.status(204).send();
        }
    );
}
