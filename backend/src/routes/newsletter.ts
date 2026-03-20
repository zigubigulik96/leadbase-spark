import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../db/index.js";
import { newsletterSubscribers } from "../db/schema.js";

const SubscribeSchema = z.object({
    email: z.string().email(),
});

export async function newsletterRoutes(app: FastifyInstance) {
    app.post("/newsletter/subscribe", async (request, reply) => {
        try {
            const result = SubscribeSchema.safeParse(request.body);
            if (!result.success) {
                return reply.code(400).send({ error: "Invalid email" });
            }

            const { email } = result.data;

            // Upsert / ignore if already exists
            await db.insert(newsletterSubscribers)
                .values({ email })
                .onConflictDoNothing({ target: newsletterSubscribers.email });

            return reply.send({ success: true });
        } catch (error) {
            console.error("Error subscribing to newsletter:", error);
            return reply.code(500).send({ error: "Failed to subscribe" });
        }
    });
}
