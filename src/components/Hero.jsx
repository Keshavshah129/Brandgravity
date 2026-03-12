import React from 'react';

export default function Hero() {
    return (
        <section className="hero wipe-section dark-section" id="hero">
            <div className="container hero-content">
                <div className="hero-left reveal-fade">
                    <p className="hero-subtext">Creative Agency<br />Focusing on Digital<br />Growth &amp; Innovation.</p>
                </div>
                <div className="hero-center">
                    <h1 className="hero-title">
                        <span className="reveal-text">We build</span>
                        <span className="reveal-text indent-1 creative-text">Brands</span>
                        <span className="reveal-text indent-2">That dominate</span>
                        <span className="reveal-text indent-3">Digital.</span>
                    </h1>
                </div>
                <div className="hero-bottom reveal-fade" style={{ transitionDelay: '0.3s' }}>
                    <a href="#work" className="btn-oval" data-magnetic>
                        <span className="btn-text">View Projects</span>
                        <span className="btn-bg"></span>
                    </a>
                </div>
            </div>
            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
            </div>
        </section>
    );
}
