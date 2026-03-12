import React from 'react';

export default function CustomCursor() {
    return (
        <div className="cursor-wrapper">
            <div className="cursor__ball cursor__ball--big" id="cursor-big">
                <svg height="30" width="30">
                    <circle cx="15" cy="15" r="12" strokeWidth="0"></circle>
                </svg>
            </div>

            <div className="cursor__ball cursor__ball--small" id="cursor-small">
                <svg height="10" width="10">
                    <circle cx="5" cy="5" r="4" strokeWidth="0"></circle>
                </svg>
            </div>
        </div>
    );
}
