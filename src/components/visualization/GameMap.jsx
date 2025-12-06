import React from 'react';
import GridCell from './GridCell';
import VisionOverlay from './VisionOverlay';
import { GiLion, GiDeer } from 'react-icons/gi';
import './Visualization.css';

const GameMap = ({ lionPosition, impalaAction, activeVision }) => {
    // Map Size
    const rows = 19;
    const cols = 19;
    const cellSize = 31; // 30px + 1px gap

    // Waterhole: (6,7) to (8,11)
    const isWater = (x, y) => {
        return x >= 6 && x <= 8 && y >= 7 && y <= 11;
    };

    // Positions
    const positions = {
        1: { x: 0, y: 9 },
        2: { x: 0, y: 18 },
        3: { x: 9, y: 18 },
        4: { x: 18, y: 18 },
        5: { x: 18, y: 9 },
        6: { x: 18, y: 0 },
        7: { x: 9, y: 0 },
        8: { x: 0, y: 0 },
    };

    const getPositionLabel = (x, y) => {
        for (const [key, pos] of Object.entries(positions)) {
            if (pos.x === x && pos.y === y) return key;
        }
        return null;
    };

    // Impala Position
    const impalaPos = { x: 9, y: 9 };

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
        // Handle both object {x,y} and array [x,y] if API is inconsistent
        const x = Array.isArray(pos) ? pos[0] : pos.x;
        const y = Array.isArray(pos) ? pos[1] : pos.y;

        return {
            transform: `translate(${x * cellSize}px, ${y * cellSize}px)`
        };
    };

    return (
        <div className="game-map-container">
            <div className="game-map">
                <VisionOverlay activeVision={activeVision} />
                {grid}

                {/* Absolute Entities */}
                <div className="entity impala" style={getStyle(impalaPos)}>
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
