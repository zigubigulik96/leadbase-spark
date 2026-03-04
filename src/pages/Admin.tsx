import { useState, useEffect, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import {
    Plus, Pencil, Trash2, Shield, PackageOpen, FileText, LogOut,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useApps, useCreateApp, useUpdateApp, useDeleteApp, type App, type NewApp } from "@/hooks/useApps";
import { useBlogPosts, useCreatePost, useUpdatePost, useDeletePost, type BlogPost, type NewBlogPost } from "@/hooks/useBlog";
import { useToast } from "@/hooks/use-toast";

// ──────────────────────────────────────────────────────────────
// API key gate
// ──────────────────────────────────────────────────────────────

function ApiKeyGate({ onUnlock }: { onUnlock: () => void }) {
    const [key, setKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleUnlock = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/verify", {
                method: "POST",
                headers: {
                    "x-api-key": key
                }
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Invalid API key");
            }

            localStorage.setItem("lb_api_key", key);
            onUnlock();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="rounded-2xl border border-border bg-card shadow-hover p-8 w-full max-w-sm text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
                    <Shield size={26} className="text-primary" />
                </div>
                <h1 className="font-heading text-xl font-bold text-foreground">Admin Access</h1>
                <p className="mt-1 text-sm text-muted-foreground">Enter your API key to manage content.</p>
                <div className="mt-6 space-y-3">
                    <Input
                        type="password"
                        placeholder="x-api-key"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter" && key) { handleUnlock(); } }}
                        disabled={loading}
                    />
                    <Button
                        className="w-full"
                        disabled={!key || loading}
                        onClick={handleUnlock}
                    >
                        {loading ? "Verifying..." : "Unlock Admin"}
                    </Button>
                    {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                </div>
                <Link to="/" className="mt-4 inline-block text-xs text-muted-foreground hover:text-foreground">
                    ← Back to site
                </Link>
            </div>
        </div>
    );
}

// ──────────────────────────────────────────────────────────────
// Blog Post Form
// ──────────────────────────────────────────────────────────────

const emptyPost: NewBlogPost = {
    slug: "", title: "", excerpt: "", category: "", content: "",
    readingTime: "", publishedAt: new Date().toISOString().slice(0, 10),
    image: "", isHighlighted: false,
};

function BlogForm({
    initial, onSave, onClose,
}: { initial?: Partial<NewBlogPost>; onSave: (d: NewBlogPost) => void; onClose: () => void }) {
    const [form, setForm] = useState<NewBlogPost>({ ...emptyPost, ...initial });
    const set = (k: keyof NewBlogPost) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((p) => ({ ...p, [k]: e.target.value }));

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check size (e.g. max 4MB to leave room for base64 expansion up to 5MB payload limit)
        if (file.size > 4 * 1024 * 1024) {
            alert("File is too large. Please select an image under 4MB.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setForm((p) => ({ ...p, image: base64String }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Slug *</label>
                    <Input placeholder="my-post-slug" value={form.slug} onChange={set("slug")} />
                </div>
                <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Category *</label>
                    <Input placeholder="Development" value={form.category} onChange={set("category")} />
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-foreground mb-1">Title *</label>
                <Input placeholder="Post title" value={form.title} onChange={set("title")} />
            </div>
            <div>
                <label className="block text-xs font-medium text-foreground mb-1">Excerpt *</label>
                <Textarea rows={2} placeholder="Short summary..." value={form.excerpt} onChange={set("excerpt")} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Published Date *</label>
                    <Input type="date" value={form.publishedAt} onChange={set("publishedAt")} />
                </div>
                <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Reading Time *</label>
                    <Input placeholder="5 min read" value={form.readingTime} onChange={set("readingTime")} />
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-foreground mb-1">Cover Image (Optional)</label>
                <div className="flex items-center gap-4">
                    <Input type="file" accept="image/*" onChange={handleImageUpload} className="flex-1" />
                    {form.image && (
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded border border-border">
                                <img src={form.image} alt="Preview" className="h-full w-full object-cover" />
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-8 px-2 text-xs text-destructive border-destructive/20 hover:bg-destructive/10"
                                onClick={() => setForm(p => ({ ...p, image: "" }))}
                            >
                                <Trash2 size={12} className="mr-1" /> Remove
                            </Button>
                        </div>
                    )}
                </div>
                {form.image && <p className="text-[10px] text-muted-foreground mt-1 truncate">Image uploaded and ready.</p>}
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="highlighted"
                    checked={form.isHighlighted || false}
                    onChange={(e) => setForm((p) => ({ ...p, isHighlighted: e.target.checked }))}
                />
                <label htmlFor="highlighted" className="text-xs font-medium text-foreground">
                    Highlight this post (will un-highlight any previously highlighted post)
                </label>
            </div>
            <div>
                <label className="block text-xs font-medium text-foreground mb-1">Content (Markdown) *</label>
                <Textarea rows={10} placeholder="## Heading&#10;&#10;Your content here..." value={form.content} onChange={set("content")} className="font-mono text-xs" />
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button
                    disabled={!form.slug || !form.title || !form.content}
                    onClick={() => onSave(form)}
                >
                    Save Post
                </Button>
            </DialogFooter>
        </div>
    );
}

// ──────────────────────────────────────────────────────────────
// App Form
// ──────────────────────────────────────────────────────────────

const emptyApp: NewApp = {
    slug: "", name: "", tagline: "", description: "", category: "",
    rating: 4.5, merchants: "0",
    features: [], pricing: [], howItWorks: [], faqs: [],
};

function AppForm({
    initial, onSave, onClose,
}: { initial?: Partial<NewApp>; onSave: (d: NewApp) => void; onClose: () => void }) {
    const [form, setForm] = useState<NewApp>({ ...emptyApp, ...initial });
    const [featuresRaw, setFeaturesRaw] = useState(
        initial?.features ? JSON.stringify(initial.features, null, 2) : "[]"
    );
    const [pricingRaw, setPricingRaw] = useState(
        initial?.pricing ? JSON.stringify(initial.pricing, null, 2) : "[]"
    );
    const [howItWorksRaw, setHowItWorksRaw] = useState(
        initial?.howItWorks ? JSON.stringify(initial.howItWorks, null, 2) : "[]"
    );
    const [faqsRaw, setFaqsRaw] = useState(
        initial?.faqs ? JSON.stringify(initial.faqs, null, 2) : "[]"
    );

    const set = (k: keyof NewApp) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((p) => ({ ...p, [k]: k === "rating" ? Number(e.target.value) : e.target.value }));

    const handleSave = () => {
        try {
            onSave({
                ...form,
                features: JSON.parse(featuresRaw),
                pricing: JSON.parse(pricingRaw),
                howItWorks: JSON.parse(howItWorksRaw),
                faqs: JSON.parse(faqsRaw),
            });
        } catch {
            alert("JSON parse error — check your Features, Pricing, How It Works, or FAQs fields.");
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Slug *</label>
                    <Input placeholder="my-app" value={form.slug} onChange={set("slug")} />
                </div>
                <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Category *</label>
                    <Input placeholder="Conversion" value={form.category} onChange={set("category")} />
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-foreground mb-1">Name *</label>
                <Input placeholder="App Name" value={form.name} onChange={set("name")} />
            </div>
            <div>
                <label className="block text-xs font-medium text-foreground mb-1">Tagline *</label>
                <Input placeholder="Short tagline" value={form.tagline} onChange={set("tagline")} />
            </div>
            <div>
                <label className="block text-xs font-medium text-foreground mb-1">Description *</label>
                <Textarea rows={3} value={form.description} onChange={set("description")} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Rating (0–5)</label>
                    <Input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={set("rating")} />
                </div>
                <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Merchants</label>
                    <Input placeholder='2,400+' value={form.merchants} onChange={set("merchants")} />
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-foreground mb-1">Features (JSON array of strings)</label>
                <Textarea rows={4} className="font-mono text-xs" value={featuresRaw} onChange={(e) => setFeaturesRaw(e.target.value)} />
            </div>
            <div>
                <label className="block text-xs font-medium text-foreground mb-1">Pricing (JSON)</label>
                <Textarea rows={4} className="font-mono text-xs" value={pricingRaw} onChange={(e) => setPricingRaw(e.target.value)} />
            </div>
            <div>
                <label className="block text-xs font-medium text-foreground mb-1">How It Works (JSON)</label>
                <Textarea rows={4} className="font-mono text-xs" value={howItWorksRaw} onChange={(e) => setHowItWorksRaw(e.target.value)} />
            </div>
            <div>
                <label className="block text-xs font-medium text-foreground mb-1">FAQs (JSON)</label>
                <Textarea rows={4} className="font-mono text-xs" value={faqsRaw} onChange={(e) => setFaqsRaw(e.target.value)} />
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button disabled={!form.slug || !form.name} onClick={handleSave}>Save App</Button>
            </DialogFooter>
        </div>
    );
}

// ──────────────────────────────────────────────────────────────
// Blog Posts Tab
// ──────────────────────────────────────────────────────────────

function BlogTab() {
    const { data: posts = [], isLoading } = useBlogPosts();
    const createPost = useCreatePost();
    const updatePost = useUpdatePost();
    const deletePost = useDeletePost();
    const { toast } = useToast();

    const [createOpen, setCreateOpen] = useState(false);
    const [editPost, setEditPost] = useState<BlogPost | null>(null);
    const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

    const handleCreate = async (data: NewBlogPost) => {
        try {
            await createPost.mutateAsync(data);
            setCreateOpen(false);
            toast({ title: "Post created ✓" });
        } catch (e: unknown) {
            toast({ title: "Error", description: (e as Error).message, variant: "destructive" });
        }
    };

    const handleUpdate = async (data: NewBlogPost) => {
        if (!editPost) return;
        try {
            await updatePost.mutateAsync({ slug: editPost.slug, data });
            setEditPost(null);
            toast({ title: "Post updated ✓" });
        } catch (e: unknown) {
            toast({ title: "Error", description: (e as Error).message, variant: "destructive" });
        }
    };

    const handleDelete = async () => {
        if (!deleteSlug) return;
        try {
            await deletePost.mutateAsync(deleteSlug);
            setDeleteSlug(null);
            toast({ title: "Post deleted" });
        } catch (e: unknown) {
            toast({ title: "Error", description: (e as Error).message, variant: "destructive" });
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">{posts.length} posts in database</p>
                <Button size="sm" onClick={() => setCreateOpen(true)}>
                    <Plus size={14} className="mr-1.5" /> New Post
                </Button>
            </div>

            {isLoading ? (
                <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-14 rounded-lg bg-muted animate-pulse" />)}</div>
            ) : posts.length === 0 ? (
                <p className="text-center py-12 text-muted-foreground">No posts yet.</p>
            ) : (
                <div className="space-y-2">
                    {posts.map((post) => (
                        <div key={post.slug} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                            <div>
                                <p className="text-sm font-medium text-card-foreground line-clamp-1">{post.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 mr-2">{post.category}</span>
                                    {post.publishedAt} · {post.readingTime}
                                </p>
                            </div>
                            <div className="flex gap-2 shrink-0 ml-4">
                                <Button size="sm" variant="outline" onClick={() => setEditPost(post)}>
                                    <Pencil size={13} />
                                </Button>
                                <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => setDeleteSlug(post.slug)}>
                                    <Trash2 size={13} />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>New Blog Post</DialogTitle>
                        <DialogDescription>Fill in all fields. Content supports Markdown headings (##, ###) and bullet lists (-).</DialogDescription>
                    </DialogHeader>
                    <BlogForm onSave={handleCreate} onClose={() => setCreateOpen(false)} />
                </DialogContent>
            </Dialog>

            {/* Edit */}
            <Dialog open={!!editPost} onOpenChange={(o) => !o && setEditPost(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Post</DialogTitle>
                        <DialogDescription>Changes are saved immediately to the database.</DialogDescription>
                    </DialogHeader>
                    {editPost && (
                        <BlogForm
                            initial={editPost}
                            onSave={handleUpdate}
                            onClose={() => setEditPost(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete confirmation */}
            <AlertDialog open={!!deleteSlug} onOpenChange={(o) => !o && setDeleteSlug(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this post?</AlertDialogTitle>
                        <AlertDialogDescription>This cannot be undone. The post will be permanently removed from the database.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

// ──────────────────────────────────────────────────────────────
// Apps Tab
// ──────────────────────────────────────────────────────────────

function AppsTab() {
    const { data: apps = [], isLoading } = useApps();
    const createApp = useCreateApp();
    const updateApp = useUpdateApp();
    const deleteApp = useDeleteApp();
    const { toast } = useToast();

    const [createOpen, setCreateOpen] = useState(false);
    const [editApp, setEditApp] = useState<App | null>(null);
    const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

    const handleCreate = async (data: NewApp) => {
        try {
            await createApp.mutateAsync(data);
            setCreateOpen(false);
            toast({ title: "App created ✓" });
        } catch (e: unknown) {
            toast({ title: "Error", description: (e as Error).message, variant: "destructive" });
        }
    };

    const handleUpdate = async (data: NewApp) => {
        if (!editApp) return;
        try {
            await updateApp.mutateAsync({ slug: editApp.slug, data });
            setEditApp(null);
            toast({ title: "App updated ✓" });
        } catch (e: unknown) {
            toast({ title: "Error", description: (e as Error).message, variant: "destructive" });
        }
    };

    const handleDelete = async () => {
        if (!deleteSlug) return;
        try {
            await deleteApp.mutateAsync(deleteSlug);
            setDeleteSlug(null);
            toast({ title: "App deleted" });
        } catch (e: unknown) {
            toast({ title: "Error", description: (e as Error).message, variant: "destructive" });
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">{apps.length} apps in database</p>
                <Button size="sm" onClick={() => setCreateOpen(true)}>
                    <Plus size={14} className="mr-1.5" /> New App
                </Button>
            </div>

            {isLoading ? (
                <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-14 rounded-lg bg-muted animate-pulse" />)}</div>
            ) : apps.length === 0 ? (
                <p className="text-center py-12 text-muted-foreground">No apps yet.</p>
            ) : (
                <div className="space-y-2">
                    {apps.map((app) => (
                        <div key={app.slug} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                            <div>
                                <p className="text-sm font-medium text-card-foreground">{app.name}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 mr-2">{app.category}</span>
                                    ★ {app.rating} · {app.merchants} merchants
                                </p>
                            </div>
                            <div className="flex gap-2 shrink-0 ml-4">
                                <Button size="sm" variant="outline" onClick={() => setEditApp(app)}>
                                    <Pencil size={13} />
                                </Button>
                                <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => setDeleteSlug(app.slug)}>
                                    <Trash2 size={13} />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>New App</DialogTitle>
                        <DialogDescription>Use JSON format for Features, Pricing, How It Works, and FAQs.</DialogDescription>
                    </DialogHeader>
                    <AppForm onSave={handleCreate} onClose={() => setCreateOpen(false)} />
                </DialogContent>
            </Dialog>

            {/* Edit */}
            <Dialog open={!!editApp} onOpenChange={(o) => !o && setEditApp(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit App</DialogTitle>
                        <DialogDescription>Changes are saved immediately to the database.</DialogDescription>
                    </DialogHeader>
                    {editApp && (
                        <AppForm
                            initial={editApp}
                            onSave={handleUpdate}
                            onClose={() => setEditApp(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete */}
            <AlertDialog open={!!deleteSlug} onOpenChange={(o) => !o && setDeleteSlug(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this app?</AlertDialogTitle>
                        <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

// ──────────────────────────────────────────────────────────────
// Admin Page
// ──────────────────────────────────────────────────────────────

export default function Admin() {
    const [unlocked, setUnlocked] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("lb_api_key")) setUnlocked(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("lb_api_key");
        setUnlocked(false);
    };

    if (!unlocked) return <ApiKeyGate onUnlock={() => setUnlocked(true)} />;

    return (
        <Layout>
            <div className="section-padding">
                <div className="container-wide">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                <Shield size={20} className="text-primary" />
                            </div>
                            <div>
                                <h1 className="font-heading text-2xl font-bold text-foreground">Admin</h1>
                                <p className="text-xs text-muted-foreground">Manage your content</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                ← View site
                            </Link>
                            <Button size="sm" variant="outline" onClick={handleLogout}>
                                <LogOut size={13} className="mr-1.5" /> Logout
                            </Button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="blog">
                        <TabsList className="mb-6">
                            <TabsTrigger value="blog" className="flex items-center gap-2">
                                <FileText size={14} /> Blog Posts
                            </TabsTrigger>
                            <TabsTrigger value="apps" className="flex items-center gap-2">
                                <PackageOpen size={14} /> Apps
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="blog">
                            <BlogTab />
                        </TabsContent>
                        <TabsContent value="apps">
                            <AppsTab />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </Layout>
    );
}
