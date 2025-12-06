import React from 'react';
import './Visualization.css';

const VisionOverlay = ({ activeVision }) => {
    // Map dimensions: 19x19 cells.
    // Each cell is 30px + 1px gap (approx, handled by grid). 
    // We should use SVG with viewBox 0 0 19 19 to match grid coordinates.

    // Points:
    // I: (9, 9) -> Center of cell (9,9) is 9.5, 9.5
    // 1: (0, 9)
    // 2: (0, 18)
    // 3: (9, 18)
    // 4: (18, 18)
    // 5: (18, 9)
    // 6: (18, 0)
    // 7: (9, 0)
    // 8: (0, 0) (Assumed)

    // Coordinates need to be centered in cells for better visual?
    // Or corners?
    // "triangulo que dibuja los puntos (8,I, 2)"
    // Usually these are grid intersections or cell centers.
    // Let's use cell centers for I (9.5, 9.5) and corners/centers for others.
    // Given the strict grid nature, let's use the integer coordinates as cell indices.
    // If (0,0) is top-left cell.

    const I = "9.5,9.5";
    const P2 = "0.5,18.5"; // (0,18)
    const P4 = "18.5,18.5"; // (18,18)
    const P6 = "18.5,0.5"; // (18,0)
    const P8 = "0.5,0.5"; // (0,0)

    // Triangles
    // Front: 8, I, 2
    const frontPoints = `${P8} ${I} ${P2}`;

    // Left: 8, I, 6
    const leftPoints = `${P8} ${I} ${P6}`;

    // Right: 2, I, 4
    const rightPoints = `${P2} ${I} ${P4}`;

    return (
        <svg className="vision-overlay" viewBox="0 0 19 19" preserveAspectRatio="none">
            <polygon
                points={frontPoints}
                fill="yellow"
                className={`vision-polygon ${activeVision === 'front' ? 'active' : ''}`}
                style={{ display: activeVision === 'front' || !activeVision ? 'block' : 'none', fill: 'rgba(255, 255, 0, 0.2)' }}
            />
            <polygon
                points={leftPoints}
                fill="red"
                className={`vision-polygon ${activeVision === 'left' ? 'active' : ''}`}
                style={{ display: activeVision === 'left' || !activeVision ? 'block' : 'none', fill: 'rgba(255, 0, 0, 0.2)' }}
            />
            <polygon
                points={rightPoints}
                fill="blue"
                className={`vision-polygon ${activeVision === 'right' ? 'active' : ''}`}
                style={{ display: activeVision === 'right' || !activeVision ? 'block' : 'none', fill: 'rgba(0, 0, 255, 0.2)' }}
            />
        </svg>
    );
};

export default VisionOverlay;
