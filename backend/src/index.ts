import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { appsRoutes } from "./routes/apps.js";
import { blogRoutes } from "./routes/blog.js";
import { authRoutes } from "./routes/auth.js";
import { newsletterRoutes } from "./routes/newsletter.js";

const app = Fastify({ logger: true, bodyLimit: 5242880 }); // 5MB limit for base64 image uploads

await app.register(cors, {
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

app.register(appsRoutes, { prefix: "/api" });
app.register(blogRoutes, { prefix: "/api" });
app.register(authRoutes, { prefix: "/api" });
app.register(newsletterRoutes, { prefix: "/api" });

// Health check
app.get("/health", async () => ({ status: "ok" }));

const port = Number(process.env.PORT ?? 3001);
await app.listen({ port, host: "0.0.0.0" });
console.log(`\n🚀 Backend listening on http://localhost:${port}\n`);
