export interface App {
  slug: string;
  name: string;
  logo?: string;
  tagline: string;
  description: string;
  category: string;
  features: string[];
  rating: number;
  merchants: string;
  pricing: {
    name: string;
    price: string;
    features: string[];
  }[];
  howItWorks: { step: string; description: string }[];
  faqs: { q: string; a: string }[];
}

export const apps: App[] = [
  {
    slug: "conversion-boost",
    name: "Conversion Boost",
    tagline: "Turn browsers into buyers with smart urgency tools",
    description: "Create countdown timers, stock alerts, and social proof notifications that drive urgency and increase conversion rates by up to 25%.",
    category: "Conversion",
    features: [
      "Countdown timers on product & cart pages",
      "Low-stock alerts with real-time inventory sync",
      "Recent purchase notifications",
      "A/B testing built in",
      "Mobile-optimized widgets",
      "No code required — installs in 60 seconds",
    ],
    rating: 4.9,
    merchants: "2,400+",
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
    features: [
      "AI-powered product recommendations",
      "Post-purchase upsell pages",
      "Cart drawer cross-sells",
      "Revenue analytics dashboard",
      "Customizable offer templates",
      "Works with Shopify checkout extensibility",
    ],
    rating: 4.8,
    merchants: "1,800+",
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
    features: [
      "Automated review request emails",
      "Photo and video reviews",
      "SEO-rich review snippets",
      "Review carousel widget",
      "Import reviews from other platforms",
      "Customizable display themes",
    ],
    rating: 4.7,
    merchants: "3,100+",
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
    features: [
      "Real-time cart value tracking",
      "Geo-targeted thresholds",
      "Fully customizable design",
      "Multiple bar styles",
      "Celebration animation on goal reached",
      "Works with all themes",
    ],
    rating: 4.9,
    merchants: "4,200+",
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
    features: [
      "Automated SEO audit reports",
      "One-click meta tag optimization",
      "Bulk alt text generation",
      "Structured data (JSON-LD) injection",
      "Broken link detection",
      "Sitemap management",
    ],
    rating: 4.6,
    merchants: "1,500+",
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

export const categories = ["All", "Marketing", "Conversion", "Operations"];

export function getAppBySlug(slug: string): App | undefined {
  return apps.find((a) => a.slug === slug);
}
