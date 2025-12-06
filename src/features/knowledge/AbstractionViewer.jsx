import React from 'react';
import './Knowledge.css';

const AbstractionViewer = ({ abstractions }) => {
    if (!abstractions || abstractions.length === 0) {
        return <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No hay abstracciones generadas.</div>;
    }

    return (
        <div>
            {abstractions.map((abs, index) => (
                <div key={index} className="abstraction-card">
                    <div className="abstraction-title">Abstracción #{index + 1}</div>
                    <div className="abstraction-rule">{abs.rule}</div>
                    <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                        Basado en {abs.support_count} casos
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AbstractionViewer;
