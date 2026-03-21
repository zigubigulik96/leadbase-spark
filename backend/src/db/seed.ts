import "dotenv/config";
import { db } from "./index.js";
import { apps, blogPosts } from "./schema.js";

// ──────────────────────────────────────────────────────────────
// Static data (migrated from src/data/apps.ts & blog.ts)
// ──────────────────────────────────────────────────────────────

const seedApps = [
    {
        slug: "conversion-boost",
        name: "Conversion Boost",
        tagline: "Turn browsers into buyers with smart urgency tools",
        description: "Create countdown timers, stock alerts, and social proof notifications that drive urgency and increase conversion rates by up to 25%.",
        category: "Conversion",
        rating: 4.9,
        merchants: "2,400+",
        features: [
            "Countdown timers on product & cart pages",
            "Low-stock alerts with real-time inventory sync",
            "Recent purchase notifications",
            "A/B testing built in",
            "Mobile-optimized widgets",
            "No code required — installs in 60 seconds",
        ],
        pricing: [
            { name: "Starter", price: "Free", features: ["1 timer widget", "Up to 500 sessions/mo", "Basic analytics"] },
            { name: "Pro", price: "$19/mo", features: ["Unlimited widgets", "A/B testing", "Priority support", "Advanced analytics"] },
            { name: "Enterprise", price: "$49/mo", features: ["Everything in Pro", "Custom branding", "Dedicated account manager", "API access"] },
        ],
        howItWorks: [
            { step: "Install", description: "Add the app from the Shopify App Store in one click." },
            { step: "Configure", description: "Choose your widgets and customize the look and feel." },
            { step: "Launch", description: "Go live instantly — no theme code changes needed." },
            { step: "Optimize", description: "Use built-in analytics to refine and improve." },
        ],
        faqs: [
            { q: "Will this slow down my store?", a: "No. Our widgets load asynchronously and add less than 20ms to page load." },
            { q: "Does it work with my theme?", a: "Yes — Conversion Boost works with all Shopify themes, including custom ones." },
            { q: "Can I cancel anytime?", a: "Absolutely. No contracts, cancel from your Shopify admin." },
        ],
    },
    {
        slug: "smart-upsell",
        name: "Smart Upsell",
        tagline: "Increase AOV with intelligent product recommendations",
        description: "Use AI-powered recommendations to show the right upsell and cross-sell offers at the perfect moment in the customer journey.",
        category: "Marketing",
        rating: 4.8,
        merchants: "1,800+",
        features: [
            "AI-powered product recommendations",
            "Post-purchase upsell pages",
            "Cart drawer cross-sells",
            "Revenue analytics dashboard",
            "Customizable offer templates",
            "Works with Shopify checkout extensibility",
        ],
        pricing: [
            { name: "Starter", price: "Free", features: ["50 upsell impressions/mo", "1 offer template", "Basic reporting"] },
            { name: "Pro", price: "$29/mo", features: ["Unlimited impressions", "AI recommendations", "A/B testing", "Priority support"] },
            { name: "Enterprise", price: "$79/mo", features: ["Everything in Pro", "Custom logic rules", "Dedicated support", "API access"] },
        ],
        howItWorks: [
            { step: "Install", description: "One-click install from the Shopify App Store." },
            { step: "Set up offers", description: "Create upsell and cross-sell offers with our visual editor." },
            { step: "AI learns", description: "Our AI analyzes purchase patterns to optimize recommendations." },
            { step: "Grow revenue", description: "Watch your average order value increase." },
        ],
        faqs: [
            { q: "How does the AI work?", a: "It analyzes your store's purchase history and browsing patterns to predict the best offers." },
            { q: "Does it support Shopify Plus?", a: "Yes, including checkout extensibility for Plus merchants." },
            { q: "What's the typical AOV increase?", a: "Merchants see an average 15–30% increase in AOV within the first month." },
        ],
    },
    {
        slug: "quick-reviews",
        name: "Quick Reviews",
        tagline: "Collect and display reviews that build trust and drive sales",
        description: "Automate review collection with post-purchase emails and display beautiful, SEO-rich review widgets on your product pages.",
        category: "Marketing",
        rating: 4.7,
        merchants: "3,100+",
        features: [
            "Automated review request emails",
            "Photo and video reviews",
            "SEO-rich review snippets",
            "Review carousel widget",
            "Import reviews from other platforms",
            "Customizable display themes",
        ],
        pricing: [
            { name: "Starter", price: "Free", features: ["50 review requests/mo", "Basic widget", "Email support"] },
            { name: "Pro", price: "$15/mo", features: ["Unlimited requests", "Photo reviews", "SEO snippets", "Custom branding"] },
            { name: "Enterprise", price: "$39/mo", features: ["Everything in Pro", "Video reviews", "API access", "Priority support"] },
        ],
        howItWorks: [
            { step: "Install", description: "Add Quick Reviews to your store in seconds." },
            { step: "Automate", description: "Set up post-purchase email sequences." },
            { step: "Display", description: "Add review widgets to your product pages." },
            { step: "Grow trust", description: "Watch social proof drive more conversions." },
        ],
        faqs: [
            { q: "Can I import existing reviews?", a: "Yes, from Judge.me, Loox, Yotpo, and CSV files." },
            { q: "Are reviews indexed by Google?", a: "Yes — we add structured data for rich snippets in search results." },
            { q: "Can customers add photos?", a: "Yes, on Pro and Enterprise plans." },
        ],
    },
    {
        slug: "shipping-bar",
        name: "Shipping Bar Pro",
        tagline: "Motivate bigger carts with a dynamic free shipping bar",
        description: "Show a progress bar that updates in real-time as customers add items, encouraging them to hit the free shipping threshold.",
        category: "Conversion",
        rating: 4.9,
        merchants: "4,200+",
        features: [
            "Real-time cart value tracking",
            "Geo-targeted thresholds",
            "Fully customizable design",
            "Multiple bar styles",
            "Celebration animation on goal reached",
            "Works with all themes",
        ],
        pricing: [
            { name: "Starter", price: "Free", features: ["1 shipping bar", "Basic customization", "Up to 1,000 sessions/mo"] },
            { name: "Pro", price: "$9/mo", features: ["Unlimited bars", "Geo-targeting", "Advanced styling", "Analytics"] },
            { name: "Enterprise", price: "$29/mo", features: ["Everything in Pro", "A/B testing", "API access", "Priority support"] },
        ],
        howItWorks: [
            { step: "Install", description: "One-click setup from the Shopify App Store." },
            { step: "Set threshold", description: "Define your free shipping minimum and target markets." },
            { step: "Customize", description: "Match the bar to your brand with our visual editor." },
            { step: "Convert", description: "Customers add more to cart to reach free shipping." },
        ],
        faqs: [
            { q: "Can I set different thresholds by country?", a: "Yes — geo-targeting is available on Pro and above." },
            { q: "Does it update in real-time?", a: "Yes, the bar updates instantly as items are added or removed." },
            { q: "Will it affect my site speed?", a: "No — the widget is lightweight and loads asynchronously." },
        ],
    },
    {
        slug: "seo-optimizer",
        name: "SEO Optimizer",
        tagline: "Fix SEO issues and rank higher on Google",
        description: "Automatically scan your store for SEO issues and fix them with one click. Optimize meta tags, alt text, structured data, and page speed.",
        category: "Operations",
        rating: 4.6,
        merchants: "1,500+",
        features: [
            "Automated SEO audit reports",
            "One-click meta tag optimization",
            "Bulk alt text generation",
            "Structured data (JSON-LD) injection",
            "Broken link detection",
            "Sitemap management",
        ],
        pricing: [
            { name: "Starter", price: "Free", features: ["Monthly SEO audit", "10 auto-fixes/mo", "Basic reporting"] },
            { name: "Pro", price: "$24/mo", features: ["Weekly audits", "Unlimited fixes", "Bulk alt text AI", "Priority support"] },
            { name: "Enterprise", price: "$59/mo", features: ["Everything in Pro", "Custom structured data", "API access", "Dedicated support"] },
        ],
        howItWorks: [
            { step: "Install", description: "Add SEO Optimizer and run your first audit." },
            { step: "Review", description: "See a prioritized list of SEO issues." },
            { step: "Fix", description: "Apply fixes with one click or in bulk." },
            { step: "Monitor", description: "Track improvements over time with analytics." },
        ],
        faqs: [
            { q: "Does it support multiple languages?", a: "Yes — meta tags and alt text can be optimized for any language." },
            { q: "Will it conflict with other SEO apps?", a: "No — SEO Optimizer works alongside other tools without conflicts." },
            { q: "How often does it scan?", a: "Weekly on Pro, monthly on Starter. Enterprise gets daily scans." },
        ],
    },
];

const seedBlogPosts = [
    {
        slug: "how-to-increase-shopify-conversion-rate",
        title: "7 Proven Ways to Increase Your Shopify Conversion Rate in 2026",
        excerpt: "Most Shopify stores convert at 1–3%. Here are the specific, actionable changes that push top stores past 4%.",
        category: "Conversion",
        publishedAt: "2026-02-28",
        readingTime: "6 min read",
        content: `<h2>Why Conversion Rate Matters More Than Traffic</h2>
<p>Getting traffic is expensive. Doubling your conversion rate has the same revenue impact as doubling your ad spend — without the extra cost.</p>
<h2>1. Speed Is Non-Negotiable</h2>
<p>Every 100ms of added load time costs you 1% in conversions. Audit your theme, compress images, and remove unused apps.</p>
<h2>2. Social Proof Above the Fold</h2>
<p>Place star ratings, review counts, and trust badges where customers see them before scrolling.</p>
<h2>3. Simplify Your Navigation</h2>
<p>Too many menu items create decision paralysis. Stick to 5–7 top-level links maximum.</p>
<h2>4. Use Urgency (Honestly)</h2>
<p>Countdown timers and low-stock alerts work — but only when they're real. Fake urgency destroys trust.</p>
<h2>5. Optimize Your Product Pages</h2>
<p>High-quality images, clear pricing, benefit-driven descriptions, and prominent Add to Cart buttons.</p>
<h2>6. Reduce Cart Abandonment</h2>
<p>Offer guest checkout, show shipping costs early, and send abandoned cart emails within 1 hour.</p>
<h2>7. A/B Test Everything</h2>
<p>Don't guess. Test headlines, CTAs, images, and layouts. Small changes compound over time.</p>
<h2>Need Help?</h2>
<p>Lead Base specializes in Shopify CRO improvements. We audit your store, identify the biggest opportunities, and implement changes that move the needle.</p>`,
    },
    {
        slug: "shopify-theme-editing-guide",
        title: "The Complete Guide to Shopify Theme Editing Without Breaking Your Store",
        excerpt: "Learn how to safely customize your Shopify theme with best practices from professional Liquid developers.",
        category: "Development",
        publishedAt: "2026-02-15",
        readingTime: "8 min read",
        content: `<h2>Before You Touch Any Code</h2>
<p>Always duplicate your theme before making changes. Work on the copy, test thoroughly, then publish.</p>
<h2>Understanding Shopify's Theme Architecture</h2>
<p>Shopify themes use Liquid, HTML, CSS, and JavaScript. Liquid is the templating language that connects your store data to your frontend.</p>
<h2>Safe Customization Strategies</h2>
<h3>Use Theme Settings First</h3>
<p>Before writing custom code, check if your theme's built-in settings can achieve what you want. Most modern themes are highly configurable.</p>
<h3>CSS-Only Changes</h3>
<p>Many visual changes can be made with CSS alone. This is the safest approach — you're adding styles without modifying template logic.</p>
<h3>Section and Block Development</h3>
<p>For more complex changes, create custom sections. This keeps your code modular and doesn't touch existing templates.</p>
<h2>Common Mistakes to Avoid</h2>
<ul>
  <li>Editing the live theme directly</li>
  <li>Not testing on mobile</li>
  <li>Hardcoding values that should be dynamic</li>
  <li>Ignoring performance impact</li>
  <li>Not backing up before changes</li>
</ul>
<h2>When to Hire a Professional</h2>
<p>If you need structural changes, custom functionality, or performance optimization, working with a Shopify development partner saves time and reduces risk.</p>`,
    },
    {
        slug: "shopify-app-development-2026",
        title: "Building Shopify Apps in 2026: What's Changed and What Matters",
        excerpt: "From checkout extensibility to AI features, here's what Shopify app developers need to know this year.",
        category: "Development",
        publishedAt: "2026-01-30",
        readingTime: "7 min read",
        content: `<h2>The Shopify App Ecosystem in 2026</h2>
<p>Shopify's platform has matured significantly. With over 2 million merchants and a thriving app ecosystem, the opportunities for developers are bigger than ever.</p>
<h2>Key Changes This Year</h2>
<h3>Checkout Extensibility Is Now Standard</h3>
<p>Post-purchase pages, custom checkout UI, and payment customizations are all built on Shopify's extensibility framework.</p>
<h3>AI-Powered Features</h3>
<p>Shopify's Sidekick and Magic features have raised merchant expectations. Apps that leverage AI for recommendations, content generation, and automation are winning.</p>
<h3>Performance Requirements</h3>
<p>Shopify now penalizes slow apps in search rankings. Keep your app's impact under 50ms and you'll stand out.</p>
<h2>Building for Success</h2>
<p>Focus on solving one problem exceptionally well. The most successful Shopify apps are laser-focused on a specific use case.</p>
<h2>Our Approach at Lead Base</h2>
<p>We build every app with three principles: performance first, merchant experience second, and scalability third. Every feature gets tested against real store data before launch.</p>`,
    },
    {
        slug: "free-shipping-bar-strategy",
        title: "How to Use a Free Shipping Bar to Increase Average Order Value",
        excerpt: "A well-configured shipping bar can boost AOV by 15–30%. Here's the strategy behind it.",
        category: "Marketing",
        publishedAt: "2026-01-15",
        readingTime: "5 min read",
        content: `<h2>The Psychology Behind Free Shipping Bars</h2>
<p>Customers hate paying for shipping more than they hate paying more for products. A shipping bar taps into this by showing how close they are to free shipping.</p>
<h2>Setting the Right Threshold</h2>
<p>Your free shipping threshold should be 20–30% above your current average order value. This is the sweet spot that motivates without discouraging.</p>
<h2>Design Best Practices</h2>
<ul>
  <li>Use contrasting colors that stand out</li>
  <li>Show progress with a visual bar</li>
  <li>Celebrate when the threshold is reached</li>
  <li>Keep the message concise</li>
</ul>
<h2>Measuring Success</h2>
<p>Track these metrics before and after implementation: average order value, conversion rate, cart abandonment rate, and free shipping redemption rate.</p>
<h2>Quick Setup</h2>
<p>With Shipping Bar Pro, you can set up a geo-targeted, fully customizable shipping bar in under 5 minutes. No code required.</p>`,
    },
    {
        slug: "liquid-best-practices",
        title: "Shopify Liquid Best Practices: Write Cleaner, Faster Theme Code",
        excerpt: "Professional tips for writing maintainable Liquid code that performs well and is easy to update.",
        category: "Development",
        publishedAt: "2026-01-02",
        readingTime: "9 min read",
        content: `<h2>Why Clean Liquid Code Matters</h2>
<p>Messy Liquid code leads to slow stores, hard-to-debug issues, and expensive maintenance. Clean code pays for itself.</p>
<h2>Core Principles</h2>
<h3>1. Use Snippets for Reusable Components</h3>
<p>Don't repeat yourself. Extract common patterns into snippets and render them with parameters.</p>
<h3>2. Minimize Liquid Logic in Templates</h3>
<p>Complex logic belongs in sections or snippets, not in your main templates. Keep templates clean and readable.</p>
<h3>3. Use Schema Settings</h3>
<p>Let merchants customize through the theme editor instead of hardcoding values. This makes your theme more flexible.</p>
<h3>4. Optimize Loops</h3>
<p>Avoid nested loops when possible. Use Liquid filters to reduce iterations and improve performance.</p>
<h3>5. Cache API Calls</h3>
<p>If you're making API calls in Liquid, cache the results to avoid repeated requests on every page load.</p>
<h2>Performance Tips</h2>
<ul>
  <li>Lazy load images below the fold</li>
  <li>Use responsive images with srcset</li>
  <li>Minimize inline scripts</li>
  <li>Use defer/async for external scripts</li>
</ul>
<h2>Testing Your Code</h2>
<p>Always test on multiple devices, browsers, and with different product catalogs. Edge cases in Shopify are common.</p>`,
    },
];

async function seed() {
    console.log("🌱 Seeding database...\n");

    // Upsert apps
    for (const app of seedApps) {
        await db
            .insert(apps)
            .values(app)
            .onConflictDoNothing();
        console.log(`  ✓ App: ${app.name}`);
    }

    // Upsert blog posts
    for (const post of seedBlogPosts) {
        await db
            .insert(blogPosts)
            .values(post)
            .onConflictDoUpdate({ target: blogPosts.slug, set: post });
        console.log(`  ✓ Blog: ${post.title.slice(0, 50)}...`);
    }

    console.log("\n✅ Seed complete!");
    process.exit(0);
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});
