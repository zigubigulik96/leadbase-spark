import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ──────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    content: string;
    readingTime: string;
    publishedAt: string; // YYYY-MM-DD
    image?: string;
    isHighlighted: boolean;
    createdAt: string;
}

export type NewBlogPost = Omit<BlogPost, "id" | "createdAt">;

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

export function useBlogPosts(category?: string) {
    return useQuery<BlogPost[]>({
        queryKey: ["blog", category],
        queryFn: () => {
            const url = category && category !== "All"
                ? `/api/blog?category=${encodeURIComponent(category)}`
                : "/api/blog";
            return apiFetch<BlogPost[]>(url);
        },
    });
}

export function useBlogPost(slug: string) {
    return useQuery<BlogPost>({
        queryKey: ["blog", slug],
        queryFn: () => apiFetch<BlogPost>(`/api/blog/${slug}`),
        enabled: Boolean(slug),
    });
}

export function useBlogCategories() {
    return useQuery<string[]>({
        queryKey: ["blog", "categories"],
        queryFn: () => apiFetch<string[]>("/api/blog/categories"),
    });
}

// ──────────────────────────────────────────────────────────────
// Mutation Hooks (require API key)
// ──────────────────────────────────────────────────────────────

export function useCreatePost() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: NewBlogPost) =>
            apiFetch<BlogPost>("/api/blog", {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-api-key": getApiKey() },
                body: JSON.stringify(data),
            }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["blog"] }),
    });
}

export function useUpdatePost() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ slug, data }: { slug: string; data: Partial<NewBlogPost> }) =>
            apiFetch<BlogPost>(`/api/blog/${slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "x-api-key": getApiKey() },
                body: JSON.stringify(data),
            }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["blog"] }),
    });
}

export function useDeletePost() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (slug: string) =>
            apiFetch<void>(`/api/blog/${slug}`, {
                method: "DELETE",
                headers: { "x-api-key": getApiKey() },
            }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["blog"] }),
    });
}
