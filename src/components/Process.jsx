import React from 'react';

export default function Process() {
    return (
        <section className="process section-padding wipe-section" id="process">
            <div className="container">
                <div className="section-header reveal-fade">
                    <h2 className="section-title">Our Methodology <span className="dot">.</span></h2>
                </div>
                <div className="process-grid">
                    <div className="process-step reveal-fade">
                        <div className="step-num">01</div>
                        <h3 className="step-title">Discover</h3>
                        <p>We dive deep into your brand, audience, and market to find the untapped opportunities.</p>
                    </div>
                    <div className="process-step reveal-fade" style={{ transitionDelay: '0.1s' }}>
                        <div className="step-num">02</div>
                        <h3 className="step-title">Strategy</h3>
                        <p>Formulating a bulletproof roadmap integrating design, tech, and marketing focused on ROI.</p>
                    </div>
                    <div className="process-step reveal-fade" style={{ transitionDelay: '0.2s' }}>
                        <div className="step-num">03</div>
                        <h3 className="step-title">Execute</h3>
                        <p>Deploying high-end creative and technical solutions with uncompromising precision.</p>
                    </div>
                    <div className="process-step reveal-fade" style={{ transitionDelay: '0.3s' }}>
                        <div className="step-num">04</div>
                        <h3 className="step-title">Scale</h3>
                        <p>Iterative optimization and aggressive marketing to transform traffic into sustained revenue.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
