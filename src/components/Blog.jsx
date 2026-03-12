import React from 'react';

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: "Future of Digital Branding in 2026",
            category: "Branding",
            date: "March 10, 2026",
            image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
            excerpt: "How AI and immersive experiences are redefining how brands connect with humans."
        },
        {
            id: 2,
            title: "Performance Ads: Beyond the Algorithm",
            category: "Marketing",
            date: "March 05, 2026",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
            excerpt: "Mastering the art of psychological triggers in a data-driven advertising world."
        },
        {
            id: 3,
            title: "The Glassmorphism Aesthetic Trend",
            category: "Design",
            date: "Feb 28, 2026",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
            excerpt: "Why the frosted glass look remains the pinnacle of premium digital interfaces."
        }
    ];

    return (
        <section className="blog-section wipe-section" id="blog">
            <div className="container">
                <div className="section-header reveal-on-scroll">
                    <span className="section-tagline">Insights</span>
                    <h2 className="section-title">Latest from <span className="text-gradient">Journal</span></h2>
                </div>

                <div className="blog-grid">
                    {blogPosts.map((post) => (
                        <article key={post.id} className="blog-card reveal-on-scroll">
                            <div className="blog-image-wrapper">
                                <img src={post.image} alt={post.title} className="blog-image" />
                                <div className="blog-category">{post.category}</div>
                            </div>
                            <div className="blog-content">
                                <div className="blog-date">{post.date}</div>
                                <h3 className="blog-title">{post.title}</h3>
                                <p className="blog-excerpt">{post.excerpt}</p>
                                <a href={`#blog-${post.id}`} className="blog-link">
                                    Read More
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="7" y1="17" x2="17" y2="7"></line>
                                        <polyline points="7 7 17 7 17 17"></polyline>
                                    </svg>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
