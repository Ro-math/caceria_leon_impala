import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import './Hunting.css';

const STORAGE_KEY = 'hunting_stats';

const HuntingStats = ({ huntState }) => {
    const [stats, setStats] = useState(() => {
        // Cargar desde localStorage al iniciar
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : { success: 0, failed: 0, total: 0 };
    });

    useEffect(() => {
        // Verificar si la cacería actual terminó (success o failed)
        if (huntState?.status === 'success' || huntState?.status === 'failed') {
            setStats(prevStats => {
                const newStats = {
                    success: huntState.status === 'success' ? prevStats.success + 1 : prevStats.success,
                    failed: huntState.status === 'failed' ? prevStats.failed + 1 : prevStats.failed,
                    total: prevStats.total + 1
                };

                // Guardar en localStorage
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
                return newStats;
            });
        }
    }, [huntState?.status]);

    return (
        <Card title="Estadísticas de Cacería">
            <div className="hunting-stats-grid">
                <div className="hunting-stat-item success">
                    <div className="stat-icon">✅</div>
                    <div className="stat-info">
                        <div className="stat-value">{stats.success}</div>
                        <div className="stat-label">Éxitos</div>
                    </div>
                </div>
                <div className="hunting-stat-item failed">
                    <div className="stat-icon">❌</div>
                    <div className="stat-info">
                        <div className="stat-value">{stats.failed}</div>
                        <div className="stat-label">Fallos</div>
                    </div>
                </div>
                <div className="hunting-stat-item total">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-info">
                        <div className="stat-value">{stats.total}</div>
                        <div className="stat-label">Intentos</div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default HuntingStats;
