import { useEffect } from 'react';

export function useRevealOnScroll() {
    useEffect(() => {
        const revealElements = document.querySelectorAll('.reveal-fade, .reveal-text');
        const revealOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealOnScroll.observe(el);
        });

        // Trigger reveal on load for elements in viewport (hero section usually)
        const timeoutId = setTimeout(() => {
            const topElements = document.querySelectorAll('.hero .reveal-fade, .hero .reveal-text');
            topElements.forEach(el => el.classList.add('active'));
        }, 100);

        return () => {
            revealElements.forEach(el => revealOnScroll.unobserve(el));
            clearTimeout(timeoutId);
        };
    }, []);
}
