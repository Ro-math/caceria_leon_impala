import React from 'react';
import './Common.css';

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
    const sizeMap = {
        small: '16px',
        medium: '32px',
        large: '64px'
    };

    return (
        <div
            className="spinner"
            style={{
                width: sizeMap[size],
                height: sizeMap[size],
                borderTopColor: `var(--color-${color})`
            }}
        />
    );
};

export default LoadingSpinner;
