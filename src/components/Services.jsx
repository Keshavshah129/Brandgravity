import React, { useState } from 'react';

const servicesData = [
    {
        number: "01",
        title: "Website Development",
        desc: "We build stunning, high-performance websites that load fast and convert visitors into customers.",
        img: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1964&auto=format&fit=crop"
    },
    {
        number: "02",
        title: "Performance Marketing",
        desc: "Data-driven campaigns on Google, Meta & more — engineered to maximize your ROI every rupee spent.",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
        number: "03",
        title: "Brand Identity",
        desc: "Logos, brand systems, and visual languages crafted to make your brand truly unforgettable.",
        img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
    },
    {
        number: "04",
        title: "Social Media Management",
        desc: "Consistent, engaging content strategies that grow your audience and build genuine community.",
        img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop"
    }
];


export default function Services() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <section className="client-logos">
                <div className="marquee">
                    <div className="marquee-content">
                        <span>STELLAR</span>
                        <span>NEXUS LABS</span>
                        <span>AURA SYSTEMS</span>
                        <span>VERTEX GROUP</span>
                        <span>LUMINA TECH</span>
                        <span>OMNICORE</span>

                        <span>STELLAR</span>
                        <span>NEXUS LABS</span>
                        <span>AURA SYSTEMS</span>
                        <span>VERTEX GROUP</span>
                        <span>LUMINA TECH</span>
                        <span>OMNICORE</span>
                    </div>
                </div>
            </section>

            <section className="services section-padding wipe-section" id="services">
                <div className="container">
                    <div className="section-header reveal-fade" style={{ marginBottom: "2rem" }}>
                        <h2 className="section-title">Our Expertise <span className="dot">.</span></h2>
                    </div>

                    <div className="framer-services-container reveal-fade">
                        {/* Left Side: Image Card */}
                        <div className="framer-image-card">
                            <div className="framer-img-wrapper">
                                {servicesData.map((svc, index) => (
                                    <img
                                        key={index}
                                        src={svc.img}
                                        alt={svc.title}
                                        className={index === activeIndex ? "active" : ""}
                                    />
                                ))}
                                <div className="framer-img-gradient"></div>
                                <div className="framer-img-text">
                                    <p>{servicesData[activeIndex].desc}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Service List */}
                        <div className="framer-service-list">
                            {servicesData.map((svc, index) => (
                                <div
                                    key={index}
                                    className={`framer-service-item ${index === activeIndex ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveIndex(index)}
                                >
                                    <div className="framer-service-number">
                                        {'{'}{svc.number}{'}'}
                                    </div>
                                    <h3 className="framer-service-title">{svc.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
