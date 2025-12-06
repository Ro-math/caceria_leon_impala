import React from 'react';
import './Hunting.css';

const ActionDisplay = ({ lionAction, impalaAction, timeStep }) => {
    return (
        <div className="action-display">
            <div className="action-item">
                <div className="action-label">Tiempo</div>
                <div className="action-value">T{timeStep}</div>
            </div>
            <div className="action-item">
                <div className="action-label">Acción León</div>
                <div className="action-value">{lionAction || '-'}</div>
            </div>
            <div className="action-item">
                <div className="action-label">Acción Impala</div>
                <div className="action-value">{impalaAction || '-'}</div>
            </div>
        </div>
    );
};

export default ActionDisplay;
