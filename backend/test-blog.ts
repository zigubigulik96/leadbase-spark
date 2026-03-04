

const API_URL = "http://localhost:3001/api/blog";
const API_KEY = "leadbase-admin-secret-2026";

async function runTests() {
    try {
        console.log("--- Starting Blog API Tests ---");

        // 1. Create a new blog post
        console.log("\n1. POST /api/blog");
        const newPost = {
            slug: "test-post-" + Date.now(),
            title: "Test Post",
            excerpt: "This is a test post.",
            category: "Test",
            content: "Content of the test post.",
            readingTime: "5 min",
            publishedAt: new Date().toISOString().split("T")[0],
        };

        const createRes = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
            },
            body: JSON.stringify(newPost),
        });

        if (!createRes.ok) {
            console.error("Failed to create post", await createRes.text());
        } else {
            console.log("Created successfully!");
            const created = await createRes.json();
            console.log(created);
        }

        // 2. Get categories
        console.log("\n2. GET /api/blog/categories");
        const categoriesRes = await fetch(`${API_URL}/categories`);
        console.log("Categories:", await categoriesRes.json());

        // 3. Get all posts
        console.log("\n3. GET /api/blog");
        const allPostsRes = await fetch(API_URL);
        const allPosts = await allPostsRes.json();
        console.log(`Found ${allPosts.length} posts.`);

        // 4. Get specific post
        console.log(`\n4. GET /api/blog/${newPost.slug}`);
        const singlePostRes = await fetch(`${API_URL}/${newPost.slug}`);
        if (singlePostRes.ok) {
            console.log("Fetched single post:", (await singlePostRes.json()).title);
        } else {
            console.error("Failed to fetch specific post.");
        }

        // 5. Update post
        console.log(`\n5. PUT /api/blog/${newPost.slug}`);
        const updateRes = await fetch(`${API_URL}/${newPost.slug}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
            },
            body: JSON.stringify({ title: "Updated Test Post" }),
        });

        if (updateRes.ok) {
            console.log("Updated title to:", (await updateRes.json()).title);
        } else {
            console.error("Failed to update post.", await updateRes.text());
        }

        // 6. Delete post
        console.log(`\n6. DELETE /api/blog/${newPost.slug}`);
        const deleteRes = await fetch(`${API_URL}/${newPost.slug}`, {
            method: "DELETE",
            headers: { "x-api-key": API_KEY },
        });

        if (deleteRes.ok || deleteRes.status === 204) {
            console.log("Post deleted successfully.");
        } else {
            console.error("Failed to delete post: ", await deleteRes.text());
        }

        console.log("\n--- Tests Completed ---");

    } catch (e) {
        console.error("Test failed with exception:", e);
    }
}

runTests();
