import React, { useEffect, useRef, useState } from 'react';

const NUM_STARS = 700;

function makeStars() {
    return Array.from({ length: NUM_STARS }, () => ({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: Math.random(),
        pz: Math.random(),
    }));
}

// Phase constants
// 0: warp (scroll to fly in)
// 1: title reveal (agency intro text)
// 2: exit + show site

export default function IntroLoader() {
    const canvasRef = useRef(null);
    const [phase, setPhase] = useState(0); // 0=warp, 1=title, 2=done
    const [titleVisible, setTitleVisible] = useState(false);
    const [titleExit, setTitleExit] = useState(false);
    const progRef = useRef(0);
    const animIdRef = useRef(null);
    const starsRef = useRef(makeStars());

    /* ── WARP CANVAS (phase 0) ── */
    useEffect(() => {
        if (phase !== 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        document.body.style.overflow = 'hidden';

        const stars = starsRef.current;

        const onWheel = (e) => {
            e.preventDefault();
            progRef.current = Math.min(1, progRef.current + Math.abs(e.deltaY) * 0.0018);
        };
        let lastTouch = 0;
        const onTouchStart = (e) => { lastTouch = e.touches[0].clientY; };
        const onTouchMove = (e) => {
            e.preventDefault();
            const dy = lastTouch - e.touches[0].clientY;
            lastTouch = e.touches[0].clientY;
            progRef.current = Math.min(1, progRef.current + Math.abs(dy) * 0.004);
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart);
        window.addEventListener('touchmove', onTouchMove, { passive: false });

        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;
            const cx = W / 2;
            const cy = H / 2;

            progRef.current = Math.min(1, progRef.current + 0.002);
            const prog = progRef.current;
            const speed = 0.004 + prog * 0.09;

            ctx.fillStyle = `rgba(2, 2, 12, ${prog < 0.55 ? 0.15 : 0.3})`;
            ctx.fillRect(0, 0, W, H);

            stars.forEach(star => {
                star.pz = star.z;
                star.z -= speed;
                if (star.z <= 0) {
                    star.x = (Math.random() - 0.5) * 2;
                    star.y = (Math.random() - 0.5) * 2;
                    star.z = 1;
                    star.pz = 1;
                }
                const sx = (star.x / star.z) * W * 0.65 + cx;
                const sy = (star.y / star.z) * H * 0.65 + cy;
                const px = (star.x / star.pz) * W * 0.65 + cx;
                const py = (star.y / star.pz) * H * 0.65 + cy;
                const depth = 1 - star.z;
                const alpha = Math.min(1, depth * 2.2);
                const b = Math.floor(200 + depth * 55);
                const g = Math.floor(150 + depth * 80);
                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(sx, sy);
                ctx.strokeStyle = `rgba(160,${g},${b},${alpha})`;
                ctx.lineWidth = Math.max(0.4, depth * 2.5);
                ctx.stroke();
            });

            // Blue orb
            if (prog > 0.08) {
                const op = (prog - 0.08) / 0.92;
                const maxR = Math.hypot(W, H) * 0.72;
                const orbR = op * op * maxR;
                const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(1, orbR));
                grad.addColorStop(0,    `rgba(10,160,255,${Math.min(1, op * 1.8)})`);
                grad.addColorStop(0.25, `rgba(0,110,230,${op * 0.9})`);
                grad.addColorStop(0.6,  `rgba(0,50,180,${op * 0.45})`);
                grad.addColorStop(1,    'rgba(0,0,60,0)');
                ctx.beginPath();
                ctx.arc(cx, cy, Math.max(1, orbR), 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();

                // core glow
                const coreR = Math.max(1, orbR * 0.09);
                const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
                cg.addColorStop(0, `rgba(200,235,255,${Math.min(1, op * 2)})`);
                cg.addColorStop(1, 'rgba(0,120,255,0)');
                ctx.beginPath();
                ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
                ctx.fillStyle = cg;
                ctx.fill();
            }

            // Final blue flash
            if (prog > 0.96) {
                const fa = (prog - 0.96) / 0.04;
                ctx.fillStyle = `rgba(5,20,60,${fa})`;
                ctx.fillRect(0, 0, W, H);
            }

            if (prog >= 1) {
                cancelAnimationFrame(animIdRef.current);
                setPhase(1); // → agency title
                return;
            }

            animIdRef.current = requestAnimationFrame(draw);
        };

        animIdRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animIdRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
        };
    }, [phase]);

    /* ── TITLE PHASE (phase 1) ── */
    useEffect(() => {
        if (phase !== 1) return;
        // Fade in title
        requestAnimationFrame(() => setTitleVisible(true));
        // After 2.8s, start exit
        const t1 = setTimeout(() => setTitleExit(true), 2800);
        // After exit animation, show site
        const t2 = setTimeout(() => {
            setPhase(2);
            document.body.style.overflow = '';
        }, 3700);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [phase]);

    if (phase === 2) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999 }}>
            {/* ── WARP CANVAS ── */}
            {phase === 0 && (
                <>
                    <canvas
                        ref={canvasRef}
                        style={{ display: 'block', width: '100%', height: '100%', background: '#02020c' }}
                    />
                    <div className="warp-scroll-hint">
                        <span>Scroll to Enter</span>
                        <div className="warp-hint-line" />
                    </div>
                </>
            )}

            {/* ── AGENCY TITLE SCREEN ── */}
            {phase === 1 && (
                <div className={`agency-title-screen ${titleVisible ? 'agency-title-screen--in' : ''} ${titleExit ? 'agency-title-screen--out' : ''}`}>
                    {/* Background deep space glow */}
                    <div className="agency-title-glow" />

                    <div className="agency-title-content">
                        <p className="agency-title-eyebrow">Welcome to</p>
                        <h1 className="agency-title-name">BrandGravity</h1>
                        <div className="agency-title-divider" />
                        <p className="agency-title-tagline">We Build Brands That Dominate Digital.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
