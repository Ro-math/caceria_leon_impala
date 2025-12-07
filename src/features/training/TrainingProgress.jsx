import React, { useEffect, useRef } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useTrainingStore } from '../../hooks/useTrainingStore';
import { FaPause, FaPlay, FaStop } from 'react-icons/fa';
import './Training.css';

const TrainingProgress = () => {
    const { status, isTraining, isPaused, fetchStatus, pauseTraining, resumeTraining, stopTraining, fetchStatistics } = useTrainingStore();
    const prevStatusRef = useRef();
    const hasCalledStatsRef = useRef(false);

    // Polling for status
    useEffect(() => {
        let interval;
        const currentStatus = status?.status;

        // Only poll if training is running or paused, NOT if stopped or completed
        if ((isTraining || isPaused) && currentStatus !== 'stopped' && currentStatus !== 'completed') {
            interval = setInterval(() => {
                fetchStatus();
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isTraining, isPaused, status?.status, fetchStatus]);

    // Fetch statistics when training completes
    useEffect(() => {
        const currentStatus = status?.status;
        const prevStatus = prevStatusRef.current;

        // When status changes to 'stopped' or 'completed', fetch statistics after a delay
        if ((currentStatus === 'stopped' || currentStatus === 'completed') &&
            prevStatus !== currentStatus &&
            !hasCalledStatsRef.current) {

            console.log('[TrainingProgress] Training finished with status:', currentStatus);
            hasCalledStatsRef.current = true;

            // Wait 1.5 seconds for backend to finish calculating statistics
            setTimeout(() => {
                console.log('[TrainingProgress] Fetching statistics now...');
                fetchStatistics();
            }, 1500);
        }

        // Reset the flag when training starts again
        if (currentStatus === 'running' && prevStatus !== 'running') {
            hasCalledStatsRef.current = false;
        }

        prevStatusRef.current = currentStatus;
    }, [status?.status, fetchStatistics]);

    if (!status && !isTraining && !isPaused) return null;

    const progress = status ? (status.current_incursion / status.total_incursions) * 100 : 0;
    const isCompleted = status?.status === 'completed' || status?.status === 'stopped';

    // Determine status badge
    const getStatusBadge = () => {
        if (isTraining && status?.status === 'running') {
            return <span className="status-badge running">🟢 En Ejecución</span>;
        } else if (isPaused) {
            return <span className="status-badge paused">🟡 Pausado</span>;
        } else if (status?.status === 'completed') {
            return <span className="status-badge completed">✅ Completado</span>;
        } else if (status?.status === 'stopped') {
            return <span className="status-badge stopped">🔴 Detenido</span>;
        }
        return null;
    };

    return (
        <Card title="Progreso">
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {getStatusBadge()}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {isTraining && !isCompleted && (
                        <Button
                            onClick={pauseTraining}
                            variant="secondary"
                            className="btn-sm"
                            title="Pausar entrenamiento (La ejecución es muy rápida, puede ser difícil pausar)"
                        >
                            <FaPause /> Pausar
                        </Button>
                    )}
                    {isPaused && !isCompleted && (
                        <>
                            <Button
                                onClick={resumeTraining}
                                variant="primary"
                                className="btn-sm"
                                title="Reanudar entrenamiento desde donde se pausó"
                            >
                                <FaPlay /> Reanudar
                            </Button>
                            <Button
                                onClick={stopTraining}
                                variant="danger"
                                className="btn-sm"
                                title="Detener completamente el entrenamiento"
                            >
                                <FaStop /> Detener
                            </Button>
                        </>
                    )}
                </div>
            </div>

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
