import { useEffect } from 'react';
import gsap from 'gsap';

export function useCustomCursor() {
    useEffect(() => {
        const bigBall = document.getElementById('cursor-big');
        const smallBall = document.getElementById('cursor-small');

        if (!bigBall || !smallBall) return;

        // Ensure the cursor follows mouse movement
        const onMouseMove = (e) => {
            gsap.to(bigBall, {
                duration: 0.4,
                x: e.clientX - 15,
                y: e.clientY - 15
            });
            gsap.to(smallBall, {
                duration: 0.1,
                x: e.clientX - 5,
                y: e.clientY - 7
            });
        };

        // Scale up big ball on hoverables
        const onMouseHover = () => {
            gsap.to(bigBall, {
                duration: 0.3,
                scale: 4
            });
        };

        const onMouseHoverOut = () => {
            gsap.to(bigBall, {
                duration: 0.3,
                scale: 1
            });
        };

        // Attach listeners
        window.addEventListener('mousemove', onMouseMove);

        // Attach hover listeners to specific interactive elements
        const hoverables = document.querySelectorAll('a, button, .hoverable, .portfolio-row, .service-card');
        hoverables.forEach((el) => {
            el.addEventListener('mouseenter', onMouseHover);
            el.addEventListener('mouseleave', onMouseHoverOut);
        });

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            hoverables.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseHover);
                el.removeEventListener('mouseleave', onMouseHoverOut);
            });
        };
    }, []);
}
