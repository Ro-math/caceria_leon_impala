import React from 'react';
import './Visualization.css';

const GridCell = ({ x, y, isWater, isPosition, positionLabel, children }) => {
    return (
        <div
            className={`grid-cell ${isWater ? 'water' : ''} ${isPosition ? 'position-marker' : ''}`}
            data-label={positionLabel}
            title={`(${x}, ${y})`}
        >
            {children}
        </div>
    );
};

export default GridCell;
