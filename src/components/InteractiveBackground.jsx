import React, { useEffect, useRef } from 'react';

class Particle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        // Start densely across the entire screen right away so it's not empty!
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        // Initial velocities
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = Math.random() * 3 + 1;

        // Random visual properties
        this.radius = Math.random() * 3 + 1.5;
        this.baseColor = Math.random() > 0.5 ? '0, 198, 255' : '0, 114, 255'; // Cyan or Blue RGB
        this.opacity = Math.random() * 0.5 + 0.3;

        // Physics constants
        this.gravity = 0.08;
        this.friction = 0.99;
        this.restitution = 0.7; // Bounciness
        this.isDead = false;
    }

    update(mouseX, mouseY) {
        // Gravity accelerates downward
        this.vy += this.gravity;

        // Apply friction
        this.vx *= this.friction;
        this.vy *= this.friction;

        // Apply velocity to position
        this.x += this.vx;
        this.y += this.vy;

        // Mouse Repulsion
        if (mouseX !== null && mouseY !== null) {
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 180) {
                const force = (180 - distance) / 180;
                this.vx += (dx / distance) * force * 4;
                this.vy += (dy / distance) * force * 4;
                this.opacity = 1; // Light up near cursor!
            }
        }

        // Floor Bounce
        if (this.y + this.radius > this.height) {
            this.y = this.height - this.radius;
            this.vy *= -this.restitution;
            this.vx *= 0.95;

            // If they lose energy, fade them out
            if (Math.abs(this.vy) < 1.0) {
                this.opacity -= 0.01;
                if (this.opacity <= 0) {
                    this.isDead = true;
                }
            }
        }

        // Wall Bounce
        if (this.x + this.radius > this.width) {
            this.x = this.width - this.radius;
            this.vx *= -this.restitution;
        } else if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vx *= -this.restitution;
        }

        // Normalize opacity
        this.opacity = Math.max(0, Math.min(1, this.opacity));
    }

    draw(ctx) {
        // Draw crisp circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.baseColor}, ${this.opacity})`;
        ctx.fill();

        // Draw motion trail line 
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * 3, this.y - this.vy * 3); // Tail stretches based on speed
        ctx.strokeStyle = `rgba(${this.baseColor}, ${this.opacity * 0.5})`;
        ctx.lineWidth = this.radius * 0.8;
        ctx.lineCap = 'round';
        ctx.stroke();
    }
}

export default function InteractiveBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width, height;
        let particles = [];
        let animationFrameId;
        const numParticles = 100; // Optimal for connectivity & performance

        let mouseX = null;
        let mouseY = null;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            // Handle high DPI (Retina) displays for perfectly crisp rendering
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        }

        window.addEventListener('resize', resize);
        resize();

        // Pre-fill particles
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle(width, height));
        }

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const onMouseLeave = () => {
            mouseX = null;
            mouseY = null;
        };

        window.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseleave', onMouseLeave);

        function animate() {
            // Always clear the transparent canvas perfectly to prevent solid block rendering
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(mouseX, mouseY);
                particles[i].draw(ctx);

                if (particles[i].isDead) {
                    particles.splice(i, 1);
                    // Spawn new particle at the TOP
                    const newParticle = new Particle(width, height);
                    newParticle.y = -50; // Start just above
                    particles.push(newParticle);
                    i--;
                }
            }

            // Draw clean connections between close particles for a premium "network" gravity field
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 198, 255, ${0.15 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseleave', onMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            id="bg-canvas"
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.8 /* increased from 0.6 so particles are brighter */
            }}
        />
    );
}
