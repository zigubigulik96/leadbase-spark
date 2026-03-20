import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../db/index.js";
import { quotes } from "../db/schema.js";

const QuoteSchema = z.object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(100),
    storeUrl: z.string().trim().max(255).optional(),
    needs: z.string().trim().min(1).max(2000),
    budget: z.string().trim().max(100).optional(),
    timeline: z.string().trim().max(100).optional(),
});

export async function quotesRoutes(app: FastifyInstance) {
    app.post("/quotes", async (request, reply) => {
        try {
            const result = QuoteSchema.safeParse(request.body);
            if (!result.success) {
                return reply.code(400).send({ error: "Invalid quote data", details: result.error.errors });
            }

            const data = result.data;

            await db.insert(quotes).values({
                name: data.name,
                email: data.email,
                storeUrl: data.storeUrl || null,
                needs: data.needs,
                budget: data.budget || null,
                timeline: data.timeline || null,
            });

            return reply.send({ success: true });
        } catch (error) {
            console.error("Error submitting quote:", error);
            return reply.code(500).send({ error: "Failed to submit quote" });
        }
    });
}
