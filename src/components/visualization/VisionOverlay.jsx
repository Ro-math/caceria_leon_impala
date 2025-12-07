import React from 'react';
import './Visualization.css';

const VisionOverlay = ({ activeVision }) => {
    // Map dimensions: 19x19 cells.
    // Coordinates: (0,0) top-left.
    // Impala I: (9, 9) -> Center 9.5, 9.5

    // Points defined by user:
    // 1: (0,9)
    // 2: (0,18)
    // 3: (9,18)
    // 4: (18,18)
    // 5: (18,9)
    // 6: (18,0)
    // 7: (9,0)
    // 8: (0,0) (Implied from context "triangulo (8,I,2)")

    // We use cell centers (x.5) for better visual alignment with the grid cells.
    // SVG coordinates: x is Column, y is Row.

    const I = "9.5,9.5"; // (9,9) -> R9, C9

    // User Points:
    // 2: (0,18) -> Row 0, Col 18 -> x=18.5, y=0.5
    const P2 = "18.5,0.5";

    // 4: (18,18) -> Row 18, Col 18 -> x=18.5, y=18.5
    const P4 = "18.5,18.5";

    // 6: (18,0) -> Row 18, Col 0 -> x=0.5, y=18.5
    const P6 = "0.5,18.5";

    // 8: (0,0) -> Row 0, Col 0 -> x=0.5, y=0.5
    const P8 = "0.5,0.5";

    // Triangles defined by user:
    // Front: (8, I, 2) -> (0,0) - (9,9) - (0,18) [Row, Col]
    // SVG: (0.5,0.5) - (9.5,9.5) - (18.5,0.5)
    const frontPoints = `${P8} ${I} ${P2}`;

    // Left: (8, I, 6) -> (0,0) - (9,9) - (18,0) [Row, Col]
    // SVG: (0.5,0.5) - (9.5,9.5) - (0.5,18.5)
    const leftPoints = `${P8} ${I} ${P6}`;

    // Right: (2, I, 4) -> (0,18) - (9,9) - (18,18) [Row, Col]
    // SVG: (18.5,0.5) - (9.5,9.5) - (18.5,18.5)
    const rightPoints = `${P2} ${I} ${P4}`;

    console.log(`[VisionOverlay] Active Vision: ${activeVision}`);

    return (
        <svg className="vision-overlay" viewBox="0 0 19 19" preserveAspectRatio="none">
            {/* Front Vision (Yellow/Gold) */}
            <polygon
                points={frontPoints}
                fill="rgba(255, 215, 0, 0.3)" // Gold
                stroke="rgba(255, 215, 0, 0.8)"
                strokeWidth="0.1"
                className={`vision-polygon ${activeVision === 'look_front' || activeVision === 'front' ? 'active' : ''}`}
                style={{ display: activeVision === 'look_front' || activeVision === 'front' || !activeVision ? 'block' : 'none' }}
            />
            {/* Left Vision (Red/Orange) */}
            <polygon
                points={leftPoints}
                fill="rgba(255, 69, 0, 0.3)" // Red-Orange
                stroke="rgba(255, 69, 0, 0.8)"
                strokeWidth="0.1"
                className={`vision-polygon ${activeVision === 'look_left' || activeVision === 'left' ? 'active' : ''}`}
                style={{ display: activeVision === 'look_left' || activeVision === 'left' || !activeVision ? 'block' : 'none' }}
            />
            {/* Right Vision (Blue/Cyan) */}
            <polygon
                points={rightPoints}
                fill="rgba(0, 191, 255, 0.3)" // Deep Sky Blue
                stroke="rgba(0, 191, 255, 0.8)"
                strokeWidth="0.1"
                className={`vision-polygon ${activeVision === 'look_right' || activeVision === 'right' ? 'active' : ''}`}
                style={{ display: activeVision === 'look_right' || activeVision === 'right' || !activeVision ? 'block' : 'none' }}
            />
        </svg>
    );
};

export default VisionOverlay;
