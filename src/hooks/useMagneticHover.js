import { useEffect } from 'react';

export function useMagneticHover() {
    useEffect(() => {
        const magneticItems = document.querySelectorAll('[data-magnetic]');

        const cleanupFns = Array.from(magneticItems).map(item => {
            let isHovering = false;
            let targetX = 0;
            let targetY = 0;
            let currentX = 0;
            let currentY = 0;
            let animationFrame;

            function animate() {
                if (isHovering || Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
                    currentX += (targetX - currentX) * 0.15;
                    currentY += (targetY - currentY) * 0.15;

                    item.style.setProperty('--tx', `${currentX}px`);
                    item.style.setProperty('--ty', `${currentY}px`);

                    animationFrame = requestAnimationFrame(animate);
                } else {
                    item.style.setProperty('--tx', `0px`);
                    item.style.setProperty('--ty', `0px`);
                }
            }

            const onMouseEnter = () => {
                isHovering = true;
                document.body.classList.add('cursor-hover');
                animate();
            };

            const onMouseMove = (e) => {
                const position = item.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                targetX = x * 0.4;
                targetY = y * 0.4;
            };

            const onMouseLeave = () => {
                isHovering = false;
                targetX = 0;
                targetY = 0;
                document.body.classList.remove('cursor-hover');
            };

            item.addEventListener('mouseenter', onMouseEnter);
            item.addEventListener('mousemove', onMouseMove);
            item.addEventListener('mouseleave', onMouseLeave);

            return () => {
                if (animationFrame) cancelAnimationFrame(animationFrame);
                item.removeEventListener('mouseenter', onMouseEnter);
                item.removeEventListener('mousemove', onMouseMove);
                item.removeEventListener('mouseleave', onMouseLeave);
            };
        });

        const links = document.querySelectorAll('a, button, .work-item');
        const linkCleanupFns = Array.from(links).map(link => {
            const enter = () => document.body.classList.add('cursor-hover');
            const leave = () => document.body.classList.remove('cursor-hover');
            link.addEventListener('mouseenter', enter);
            link.addEventListener('mouseleave', leave);
            return () => {
                link.removeEventListener('mouseenter', enter);
                link.removeEventListener('mouseleave', leave);
            };
        });

        return () => {
            cleanupFns.forEach(fn => fn());
            linkCleanupFns.forEach(fn => fn());
            document.body.classList.remove('cursor-hover'); // ensure reset
        };
    }, []);
}
