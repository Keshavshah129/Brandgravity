import React from 'react';

export default function GravityLogo({ size = 36, spin = true }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', flexShrink: 0 }}
        >
            <defs>
                <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0072ff" />
                    <stop offset="100%" stopColor="#00c6ff" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Rotating orbit ring group */}
            <g style={spin ? { animation: 'orbitSpin 4s linear infinite', transformOrigin: '50px 50px' } : {}}>
                <ellipse
                    cx="50" cy="50"
                    rx="42" ry="18"
                    stroke="url(#orbitGrad)"
                    strokeWidth="3.5"
                    fill="none"
                    filter="url(#glow)"
                    transform="rotate(-20, 50, 50)"
                />
                {/* Bright dot travelling along orbit */}
                <circle
                    cx="92" cy="50"
                    r="4"
                    fill="#00c6ff"
                    filter="url(#glow)"
                    transform="rotate(-20, 50, 50)"
                />
            </g>

            {/* Centre planet */}
            <circle cx="50" cy="50" r="11" fill="white" filter="url(#glow)" />
            <circle cx="50" cy="50" r="7" fill="url(#orbitGrad)" />
        </svg>
    );
}
