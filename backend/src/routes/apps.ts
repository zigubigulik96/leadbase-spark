import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../db/index.js";
import { apps } from "../db/schema.js";
import { eq, sql } from "drizzle-orm";
import { apiKeyHook } from "../middleware/apiKey.js";

const AppSchema = z.object({
    slug: z.string().min(1),
    name: z.string().min(1),
    tagline: z.string().min(1),
    description: z.string().min(1),
    category: z.string().min(1),
    rating: z.number().min(0).max(5),
    merchants: z.string(),
    features: z.array(z.string()),
    pricing: z.array(
        z.object({
            name: z.string(),
            price: z.string(),
            features: z.array(z.string()),
        })
    ),
    howItWorks: z.array(
        z.object({
            step: z.string(),
            description: z.string(),
        })
    ),
    faqs: z.array(
        z.object({
            q: z.string(),
            a: z.string(),
        })
    ),
});

export async function appsRoutes(fastify: FastifyInstance) {
    // GET /api/apps/categories — must be BEFORE /:slug to avoid capture
    fastify.get("/apps/categories", async () => {
        const rows = await db
            .selectDistinct({ category: apps.category })
            .from(apps)
            .orderBy(apps.category);
        const cats = ["All", ...rows.map((r) => r.category)];
        return cats;
    });

    // GET /api/apps?category=X
    fastify.get<{ Querystring: { category?: string } }>("/apps", async (req) => {
        const { category } = req.query;
        if (category && category !== "All") {
            return db.select().from(apps).where(eq(apps.category, category)).orderBy(apps.createdAt);
        }
        return db.select().from(apps).orderBy(apps.createdAt);
    });

    // GET /api/apps/:slug
    fastify.get<{ Params: { slug: string } }>("/apps/:slug", async (req, reply) => {
        const [app] = await db.select().from(apps).where(eq(apps.slug, req.params.slug));
        if (!app) return reply.status(404).send({ error: "App not found" });
        return app;
    });

    // POST /api/apps [protected]
    fastify.post("/apps", { preHandler: [apiKeyHook] }, async (req, reply) => {
        const parsed = AppSchema.safeParse(req.body);
        if (!parsed.success) {
            return reply.status(400).send({ error: "Validation failed", details: parsed.error.flatten() });
        }
        const { howItWorks, ...rest } = parsed.data;
        const [created] = await db
            .insert(apps)
            .values({ ...rest, howItWorks })
            .returning();
        return reply.status(201).send(created);
    });

    // PUT /api/apps/:slug [protected]
    fastify.put<{ Params: { slug: string } }>(
        "/apps/:slug",
        { preHandler: [apiKeyHook] },
        async (req, reply) => {
            const parsed = AppSchema.partial().safeParse(req.body);
            if (!parsed.success) {
                return reply.status(400).send({ error: "Validation failed", details: parsed.error.flatten() });
            }
            const { howItWorks, ...rest } = parsed.data;
            const updateData = howItWorks !== undefined ? { ...rest, howItWorks } : rest;
            const [updated] = await db
                .update(apps)
                .set(updateData)
                .where(eq(apps.slug, req.params.slug))
                .returning();
            if (!updated) return reply.status(404).send({ error: "App not found" });
            return updated;
        }
    );

    // DELETE /api/apps/:slug [protected]
    fastify.delete<{ Params: { slug: string } }>(
        "/apps/:slug",
        { preHandler: [apiKeyHook] },
        async (req, reply) => {
            const [deleted] = await db
                .delete(apps)
                .where(eq(apps.slug, req.params.slug))
                .returning();
            if (!deleted) return reply.status(404).send({ error: "App not found" });
            return reply.status(204).send();
        }
    );
}
