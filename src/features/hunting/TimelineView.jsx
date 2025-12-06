import React from 'react';
import Card from '../../components/common/Card';
import './Hunting.css';

const TimelineView = ({ history }) => {
    return (
        <Card title="Historial" className="timeline-card">
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {history.slice().reverse().map((step, index) => (
                    <div key={index} className="timeline-item">
                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>T{step.time_step}</div>
                        <div style={{ fontSize: '0.8rem' }}>León: {step.lion_action}</div>
                        <div style={{ fontSize: '0.8rem' }}>Impala: {step.impala_action}</div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default TimelineView;
