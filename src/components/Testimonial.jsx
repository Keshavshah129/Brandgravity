import React from 'react';

export default function Testimonial() {
    return (
        <section className="testimonial section-padding transition-section wipe-section">
            <div className="container">
                <div className="testimonial-slider reveal-fade">
                    <div className="quote-icon">"</div>
                    <h3 className="quote-text">
                        BrandGravity completely transformed our online presence. Our conversion rates
                        doubled in the first three months, and the new brand identity perfectly captures our vision.
                    </h3>
                    <div className="quote-author">
                        <p className="author-name">Sumit Jha</p>
                        <p className="author-role">CMO at Nova Tech</p>
                        <div className="stars">★★★★★</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
