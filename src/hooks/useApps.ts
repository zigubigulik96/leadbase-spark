import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ──────────────────────────────────────────────────────────────
// Types (match existing App interface + DB additions)
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

export interface App {
    id: string;
    slug: string;
    name: string;
    logo?: string;
    tagline: string;
    description: string;
    category: string;
    rating: number;
    merchants: string;
    features: string[];
    pricing: PricingTier[];
    howItWorks: HowItWorksStep[];
    faqs: Faq[];
    createdAt: string;
}

export type NewApp = Omit<App, "id" | "createdAt">;

// ──────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────

function getApiKey(): string {
    return localStorage.getItem("lb_api_key") ?? "";
}

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, options);
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? `Request failed: ${res.status}`);
    }
    if (res.status === 204) return undefined as T;
    return res.json();
}

// ──────────────────────────────────────────────────────────────
// Query Hooks
// ──────────────────────────────────────────────────────────────

export function useApps(category?: string) {
    return useQuery<App[]>({
        queryKey: ["apps", category],
        queryFn: () => {
            const url = category && category !== "All"
                ? `/api/apps?category=${encodeURIComponent(category)}`
                : "/api/apps";
            return apiFetch<App[]>(url);
        },
    });
}

export function useApp(slug: string) {
    return useQuery<App>({
        queryKey: ["apps", slug],
        queryFn: () => apiFetch<App>(`/api/apps/${slug}`),
        enabled: Boolean(slug),
    });
}

export function useAppCategories() {
    return useQuery<string[]>({
        queryKey: ["apps", "categories"],
        queryFn: () => apiFetch<string[]>("/api/apps/categories"),
    });
}

// ──────────────────────────────────────────────────────────────
// Mutation Hooks (require API key)
// ──────────────────────────────────────────────────────────────

export function useCreateApp() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: NewApp) =>
            apiFetch<App>("/api/apps", {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-api-key": getApiKey() },
                body: JSON.stringify(data),
            }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["apps"] }),
    });
}

export function useUpdateApp() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ slug, data }: { slug: string; data: Partial<NewApp> }) =>
            apiFetch<App>(`/api/apps/${slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "x-api-key": getApiKey() },
                body: JSON.stringify(data),
            }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["apps"] }),
    });
}

export function useDeleteApp() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (slug: string) =>
            apiFetch<void>(`/api/apps/${slug}`, {
                method: "DELETE",
                headers: { "x-api-key": getApiKey() },
            }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["apps"] }),
    });
}
