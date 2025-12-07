import React from 'react';
import Card from '../../components/common/Card';
import { FaTrophy, FaSkull, FaBrain, FaHistory } from 'react-icons/fa';
import './Dashboard.css';

import { trainingService } from '../../services/trainingService';
import { knowledgeService } from '../../services/knowledgeService';

const QuickStats = () => {
    const [stats, setStats] = React.useState({
        totalIncursions: 0,
        successRate: 0,
        rulesLearned: 0,
        abstractions: 0
    });

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const [trainingStats, baseKnowledge, abstractions] = await Promise.all([
                    trainingService.getStatistics(),
                    knowledgeService.getBase(),
                    knowledgeService.getAbstractions()
                ]);

                setStats({
                    totalIncursions: trainingStats.total_incursions || 0,
                    successRate: trainingStats.success_rate ? (trainingStats.success_rate * 100).toFixed(1) : 0,
                    rulesLearned: baseKnowledge.knowledge ? baseKnowledge.knowledge.length : 0,
                    abstractions: Array.isArray(abstractions) ? abstractions.length : (abstractions.abstractions?.length || 0)
                });
            } catch (error) {
                console.error("Error fetching quick stats:", error);
            }
        };

        fetchStats();
    }, []);

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
