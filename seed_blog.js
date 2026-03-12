import { insforge } from './src/lib/insforge.js';

const blogPosts = [
    {
        title: "Future of Digital Branding in 2026",
        category: "Branding",
        date: "March 10, 2026",
        image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
        excerpt: "How AI and immersive experiences are redefining how brands connect with humans."
    },
    {
        title: "Performance Ads: Beyond the Algorithm",
        category: "Marketing",
        date: "March 05, 2026",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        excerpt: "Mastering the art of psychological triggers in a data-driven advertising world."
    },
    {
        title: "The Glassmorphism Aesthetic Trend",
        category: "Design",
        date: "Feb 28, 2026",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        excerpt: "Why the frosted glass look remains the pinnacle of premium digital interfaces."
    }
];

async function seedBlog() {
    console.log("Seeding blog posts to InsForge...");
    try {
        const { data, error } = await insforge.database
            .from('blog_posts')
            .insert(blogPosts);

        if (error) {
            console.error("Error seeding blog posts:", error);
        } else {
            console.log("Successfully seeded blog posts:", data);
        }
    } catch (e) {
        console.error("Exception during seeding:", e);
    }
}

seedBlog();
