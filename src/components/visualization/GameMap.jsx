import React from 'react';
import GridCell from './GridCell';
import VisionOverlay from './VisionOverlay';
import { GiLion, GiDeer } from 'react-icons/gi';
import './Visualization.css';

const GameMap = ({ lionPosition, impalaPosition, impalaAction, activeVision }) => {
    // Map Size
    const rows = 19;
    const cols = 19;
    const cellSize = 36; // 35px + 1px gap

    // Waterhole: (6,7) to (8,11)
    // User definition: (Row, Col)
    // Rows: 6 to 8
    // Cols: 7 to 11
    const isWater = (x, y) => {
        // x is Column, y is Row in our grid rendering loop
        return y >= 6 && y <= 8 && x >= 7 && x <= 11;
    };

    // Positions (User definition: Row, Col)
    // We map to { x: Col, y: Row } for rendering
    const positions = {
        1: { x: 9, y: 0 },   // (0,9) -> Row 0, Col 9
        2: { x: 18, y: 0 },  // (0,18) -> Row 0, Col 18
        3: { x: 18, y: 9 },  // (9,18) -> Row 9, Col 18
        4: { x: 18, y: 18 }, // (18,18) -> Row 18, Col 18
        5: { x: 9, y: 18 },  // (18,9) -> Row 18, Col 9
        6: { x: 0, y: 18 },  // (18,0) -> Row 18, Col 0
        7: { x: 0, y: 9 },   // (9,0) -> Row 9, Col 0
        8: { x: 0, y: 0 },   // (0,0) -> Row 0, Col 0
    };

    console.log('[GameMap] Rendering map. LionPos:', lionPosition, 'ImpalaPos:', impalaPosition, 'ImpalaAction:', impalaAction, 'ActiveVision:', activeVision);

    const getPositionLabel = (x, y) => {
        for (const [key, pos] of Object.entries(positions)) {
            if (pos.x === x && pos.y === y) return key;
        }
        return null;
    };

    // Impala Position (Default to 9,9 if not provided, e.g. initial load)
    const currentImpalaPos = impalaPosition || { x: 9, y: 9 };

    // Render Grid Background
    const grid = [];
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            grid.push(
                <GridCell
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    isWater={isWater(x, y)}
                    isPosition={!!getPositionLabel(x, y)}
                    positionLabel={getPositionLabel(x, y)}
                />
            );
        }
    }

    // Calculate absolute positions
    const getStyle = (pos) => {
        if (!pos) return { display: 'none' };

        // Check if pos is array [Row, Col] from backend or object {x, y}
        let r, c;
        if (Array.isArray(pos)) {
            r = pos[0];
            c = pos[1];
        } else {
            // If it's an object, assume it matches our internal structure {x: Col, y: Row} 
            // OR check if it has row/col props. 
            if (typeof pos === 'object' && 'x' in pos) {
                c = pos.x;
                r = pos.y;
            } else {
                // Fallback or error
                console.error('[GameMap] Unknown pos format:', pos);
                return { display: 'none' };
            }
        }

        // Ensure valid coordinates
        if (r === undefined || c === undefined) {
            console.error('[GameMap] Invalid position:', pos);
            return { display: 'none' };
        }

        // Translate uses x (Col), y (Row)
        return {
            transform: `translate(${c * cellSize}px, ${r * cellSize}px)`
        };
    };

    return (
        <div className="game-map-container">
            <div className="game-map">
                <VisionOverlay activeVision={activeVision} />
                {grid}

                {/* Absolute Entities */}
                <div className="entity impala" style={getStyle(currentImpalaPos)}>
                    <GiDeer />
                </div>

                {lionPosition && (
                    <div className="entity lion" style={getStyle(lionPosition)}>
                        <GiLion />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameMap;
