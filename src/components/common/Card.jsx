import React from 'react';
import './Common.css';

const Card = ({ children, title, className = '', actions }) => {
    return (
        <div className={`card ${className}`}>
            {(title || actions) && (
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {title && <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>{title}</h3>}
                    {actions && <div>{actions}</div>}
                </div>
            )}
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};

export default Card;
