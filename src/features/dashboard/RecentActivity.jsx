import React from 'react';
import Card from '../../components/common/Card';
import { FaRunning, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Dashboard.css';

const RecentActivity = () => {
    // Mock data
    const activities = [
        { type: 'training', message: 'Ciclo de entrenamiento completado (100 inc)', time: 'Hace 5 min', status: 'success' },
        { type: 'hunt', message: 'Cacería exitosa desde Posición 3', time: 'Hace 15 min', status: 'success' },
        { type: 'hunt', message: 'Cacería fallida desde Posición 1', time: 'Hace 20 min', status: 'fail' },
        { type: 'knowledge', message: 'Nueva abstracción generada', time: 'Hace 1 hora', status: 'info' },
    ];

    const getIcon = (status) => {
        switch (status) {
            case 'success': return <FaCheckCircle style={{ color: 'var(--color-success)' }} />;
            case 'fail': return <FaTimesCircle style={{ color: 'var(--color-danger)' }} />;
            default: return <FaRunning style={{ color: 'var(--color-primary)' }} />;
        }
    };

    return (
        <Card title="Actividad Reciente">
            <div className="activity-list">
                {activities.map((activity, index) => (
                    <div key={index} className="activity-item">
                        <div className="activity-icon">
                            {getIcon(activity.status)}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 500 }}>{activity.message}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activity.time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default RecentActivity;
