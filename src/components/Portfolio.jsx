import React, { useRef, useState } from 'react';

const Portfolio = () => {
    const hoverContainerRef = useRef(null);
    const [hoverImgSrc, setHoverImgSrc] = useState('');
    const [isActive, setIsActive] = useState(false);

    const handleMouseEnter = (src) => {
        setHoverImgSrc(src);
        setIsActive(true);
    };

    const handleMouseMove = (e) => {
        if (!hoverContainerRef.current) return;
        const row = e.currentTarget;
        const rect = row.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        hoverContainerRef.current.style.transform = `translate(calc(-50% + ${x * 50}px), calc(-50% + ${y * 50}px)) scale(1)`;
    };

    const handleMouseLeave = () => {
        setIsActive(false);
        if (hoverContainerRef.current) {
            hoverContainerRef.current.style.transform = `translate(-50%, -50%) scale(0.8)`;
        }
    };

    const projects = [
        { cat: 'Web Development', title: 'Aethel Luxury', img: 'assets/portfolio_1.png' },
        { cat: 'Branding', title: 'Nova Tech', img: 'assets/portfolio_2.png' },
        { cat: 'E-Commerce', title: 'Lumina Skincare', img: 'assets/portfolio_3.png' },
        { cat: 'Marketing', title: 'Vertex Finance', img: 'assets/portfolio_4.png' }
    ];

    return (
        <section className="work section-padding wipe-section light-section" id="work">
            <div className="container">
                <div className="section-header top-row reveal-fade">
                    <h2 className="section-title">Selected Work</h2>
                    <a href="#" className="view-all-link">View All Projects &rarr;</a>
                </div>

                <div className="portfolio-list">

                    {projects.map((proj, idx) => (
                        <div
                            key={idx}
                            className="portfolio-row"
                            onMouseEnter={() => handleMouseEnter(proj.img)}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="row-info">
                                <span className="row-cat">{proj.cat}</span>
                                <h3 className="row-title">{proj.title}</h3>
                            </div>
                            <div className="row-arrow">&rarr;</div>
                        </div>
                    ))}
                </div>

                <div
                    className={`portfolio-hover-img ${isActive ? 'active' : ''}`}
                    id="portfolio-hover-img"
                    ref={hoverContainerRef}
                >
                    <img src={hoverImgSrc} alt="Project Preview" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
