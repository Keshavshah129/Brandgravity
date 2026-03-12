import React, { useState } from 'react';
import { insforge } from '../lib/insforge';

export default function Footer() {
    const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error: dbError } = await insforge.database
            .from('enquiries')
            .insert({
                name: formData.name,
                email: formData.email,
                service: formData.service,
                message: formData.message,
            });

        setLoading(false);

        if (dbError) {
            setError('Something went wrong. Please try again or email us directly.');
        } else {
            setSubmitted(true);
            setFormData({ name: '', email: '', service: '', message: '' });
        }
    };


    return (
        <>
            <section className="final-cta section-padding wipe-section" id="contact">
                <div className="container reveal-fade">
                    <div className="cta-box">
                        <div className="cta-glow"></div>
                        <h2 className="cta-title">Ready to scale your brand?</h2>
                        <p className="cta-sub">Fill out the form and we'll get back to you within 24 hours.</p>

                        {submitted ? (
                            <div className="form-success">
                                <span className="form-success-icon">✓</span>
                                <p>Thank you! We'll be in touch very soon.</p>
                            </div>
                        ) : (
                            <form className="enquiry-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="enq-name">Your Name</label>
                                        <input
                                            id="enq-name"
                                            type="text"
                                            name="name"
                                            placeholder="e.g. Rahul Sharma"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="enq-email">Email Address</label>
                                        <input
                                            id="enq-email"
                                            type="email"
                                            name="email"
                                            placeholder="you@company.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="enq-service">Service You're Interested In</label>
                                    <select
                                        id="enq-service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select a service...</option>
                                        <option value="website-dev">Website Development</option>
                                        <option value="performance-marketing">Performance Marketing</option>
                                        <option value="brand-identity">Brand Identity</option>
                                        <option value="social-media">Social Media Management</option>
                                        <option value="other">Other / Not Sure Yet</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="enq-message">Tell us about your project</label>
                                    <textarea
                                        id="enq-message"
                                        name="message"
                                        rows="4"
                                        placeholder="Share any details, goals, or questions..."
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>
                                {error && <p className="form-error">{error}</p>}
                                <button type="submit" className="btn-primary large form-submit-btn" data-magnetic disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Enquiry →'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <footer className="footer section-padding dark-section wipe-section">
                <div className="container text-center">

                    <div className="footer-vision reveal-fade">
                        <h2 className="vision-title">Our Vision</h2>
                        <p className="vision-text">
                            To elevate brands into icons of desire and performance, remembered for their distinction. Embodying
                            the essence of a premium digital growth agency that builds timeless impact.
                        </p>
                    </div>

                    <div className="footer-logo-container reveal-fade">
                        <img src="/brandgravity_logo.png" alt="BrandGravity Logo" className="footer-brand-img" />
                    </div>
                    <h1 className="footer-massive-text footer-massive-text--anim reveal-fade" style={{ transitionDelay: '0.1s' }}>
                        {'BRANDGRAVITY'.split('').map((letter, i) => (
                            <span
                                key={i}
                                className="fall-letter"
                                style={{ animationDelay: `${i * 0.07}s` }}
                            >
                                {letter}
                            </span>
                        ))}
                    </h1>

                    <div className="footer-contact-info reveal-fade" style={{ transitionDelay: '0.2s' }}>
                        <h3 className="contact-title">Contact Info</h3>
                        <div className="contact-methods">
                            <a href="mailto:hello@brandgravity.com" className="contact-link">
                                <span className="icon">&#9993;</span> hello@brandgravity.com
                            </a>
                            <a href="tel:9579725440" className="contact-link">
                                <span className="icon">&#128222;</span> 9579725440
                            </a>
                        </div>
                    </div>

                    <div className="footer-bottom-bar">
                        <p className="copyright">Copyright © BrandGravity. All Rights Reserved.</p>
                        <div className="footer-socials">
                            <a href="#">IG</a>
                            <a href="#">IN</a>
                        </div>
                    </div>

                </div>
            </footer>
        </>
    );
}

