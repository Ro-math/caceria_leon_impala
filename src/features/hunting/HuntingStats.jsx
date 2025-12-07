import React, { useMemo } from 'react';
import Card from '../../components/common/Card';
import './Hunting.css';

const HuntingStats = ({ history }) => {
    const stats = useMemo(() => {
        if (!history || history.length === 0) {
            return { total: 0, success: 0, failed: 0 };
        }

        // Count hunts by checking final status
        const hunts = history.filter(step =>
            step.status === 'success' || step.status === 'failed'
        );

        const success = hunts.filter(step => step.status === 'success').length;
        const failed = hunts.filter(step => step.status === 'failed').length;
        const total = history.length;

        return { total, success, failed };
    }, [history]);

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
