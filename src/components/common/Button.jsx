import React from 'react';
import './Common.css';

const Button = ({
    children,
    variant = 'primary',
    onClick,
    disabled = false,
    type = 'button',
    className = '',
    isLoading = false
}) => {
    return (
        <button
            type={type}
            className={`btn btn-${variant} ${className}`}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {isLoading && <div className="spinner" style={{ width: '16px', height: '16px' }}></div>}
            {children}
        </button>
    );
};

export default Button;
