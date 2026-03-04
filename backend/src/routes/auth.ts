import type { FastifyInstance } from "fastify";
import { apiKeyHook } from "../middleware/apiKey.js";

export async function authRoutes(fastify: FastifyInstance) {
    // POST /api/auth/verify [protected]
    fastify.post("/auth/verify", { preHandler: [apiKeyHook] }, async (req, reply) => {
        return reply.status(200).send({ success: true });
    });
}
