import React, { useState, useEffect } from 'react';
import GravityLogo from './GravityLogo';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
                <div className="nav-container">
                    <a href="#home" className="logo" onClick={scrollToTop}>
                        <GravityLogo size={30} spin={true} />
                        <span className="logo-text">Brand<span className="logo-accent">Gravity</span></span>
                    </a>
                    <nav className="nav-links">
                        <a href="#services">Services</a>
                        <a href="#work">Work</a>
                        <a href="#about">About</a>
                        <a href="#process">Process</a>
                    </nav>
                    <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <a href="#contact" className="btn-primary sm" data-magnetic>Let's Talk</a>
                        <div className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`} id="mobile-menu-btn" onClick={toggleMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </header>

            <div className={`full-screen-menu ${isMenuOpen ? 'open' : ''}`} id="full-screen-menu">
                <div className="menu-close-btn" id="menu-close-btn" onClick={() => setIsMenuOpen(false)}>
                    <span></span>
                    <span></span>
                </div>

                <nav className="menu-center-nav">
                    <a href="#work" className="menu-link" onClick={() => setIsMenuOpen(false)}>Our Work</a>
                    <a href="#services" className="menu-link" onClick={() => setIsMenuOpen(false)}>Services</a>
                    <a href="#about" className="menu-link" onClick={() => setIsMenuOpen(false)}>About</a>
                    <a href="#blog" className="menu-link" onClick={() => setIsMenuOpen(false)}>Blog</a>
                    <a href="#contact" className="menu-link" onClick={() => setIsMenuOpen(false)}>Contact</a>
                </nav>

                <div className="menu-bottom-row">
                    <div className="menu-bottom-links">
                        <a href="#">Terms & Conditions</a>
                        <a href="#">Cookie Policy</a>
                        <a href="#">Personal Data Processing & Protection Policy</a>
                    </div>

                    <a href="mailto:hello@brandgravity.com" className="menu-email">hello@brandgravity.com</a>

                    <div className="menu-socials">
                        <a href="#">IN</a>
                        <a href="#">IG</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
