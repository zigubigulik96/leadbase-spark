import type { FastifyRequest, FastifyReply } from "fastify";

export async function apiKeyHook(req: FastifyRequest, reply: FastifyReply) {
    const key = req.headers["x-api-key"];
    if (!key || key !== process.env.API_KEY) {
        return reply.status(401).send({ error: "Unauthorized: invalid or missing x-api-key header" });
    }
}
