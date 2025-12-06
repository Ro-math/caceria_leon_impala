import React from 'react';
import Card from '../../components/common/Card';
import { FaTrophy, FaSkull, FaBrain, FaHistory } from 'react-icons/fa';
import './Dashboard.css';

const QuickStats = () => {
    // Mock data or fetch from store
    const stats = {
        totalIncursions: 1250,
        successRate: 78.5,
        rulesLearned: 342,
        abstractions: 15
    };

    return (
        <Card title="Estadísticas Rápidas">
            <div className="quick-stats-grid">
                <div className="stat-card">
                    <FaHistory className="stat-icon" style={{ color: 'var(--color-accent)' }} />
                    <div className="stat-value">{stats.totalIncursions}</div>
                    <div className="stat-label">Incursiones</div>
                </div>
                <div className="stat-card">
                    <FaTrophy className="stat-icon" style={{ color: 'var(--color-success)' }} />
                    <div className="stat-value">{stats.successRate}%</div>
                    <div className="stat-label">Tasa de Éxito</div>
                </div>
                <div className="stat-card">
                    <FaBrain className="stat-icon" style={{ color: 'var(--color-warning)' }} />
                    <div className="stat-value">{stats.rulesLearned}</div>
                    <div className="stat-label">Reglas</div>
                </div>
                <div className="stat-card">
                    <FaSkull className="stat-icon" style={{ color: 'var(--text-muted)' }} />
                    <div className="stat-value">{stats.abstractions}</div>
                    <div className="stat-label">Abstracciones</div>
                </div>
            </div>
        </Card>
    );
};

export default QuickStats;
