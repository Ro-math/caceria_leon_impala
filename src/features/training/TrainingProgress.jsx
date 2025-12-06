import React, { useEffect } from 'react';
import Card from '../../components/common/Card';
import { useTrainingStore } from '../../hooks/useTrainingStore';
import './Training.css';

const TrainingProgress = () => {
    const { status, isTraining, fetchStatus } = useTrainingStore();

    useEffect(() => {
        let interval;
        if (isTraining) {
            interval = setInterval(() => {
                fetchStatus();
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTraining, fetchStatus]);

    if (!status && !isTraining) return null;

    const progress = status ? (status.current_incursion / status.total_incursions) * 100 : 0;

    return (
        <Card title="Progreso">
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value">{status?.current_incursion || 0}</div>
                    <div className="stat-label">Incursión Actual</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{status?.success_count || 0}</div>
                    <div className="stat-label">Éxitos</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{status?.fail_count || 0}</div>
                    <div className="stat-label">Fallos</div>
                </div>
            </div>

            <div className="progress-container">
                <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                {progress.toFixed(1)}% Completado
            </div>
        </Card>
    );
};

export default TrainingProgress;
