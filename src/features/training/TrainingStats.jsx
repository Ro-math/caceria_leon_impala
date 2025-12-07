import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import Card from '../../components/common/Card';
import { useTrainingStore } from '../../hooks/useTrainingStore';

const TrainingStats = () => {
    const { statistics, status, fetchStatistics, isTraining } = useTrainingStore();

    useEffect(() => {
        // Fetch statistics when training completes or when component mounts
        if (!isTraining || status?.status === 'completed') {
            fetchStatistics();
        }
    }, [isTraining, status?.status, fetchStatistics]);

    // Also fetch on mount
    useEffect(() => {
        fetchStatistics();
    }, []);

    if (!statistics) return null;

    // Transform data for charts
    // Assuming statistics has { success_rate_by_position: { 1: 0.5, ... }, history: [...] }
    const positionData = Object.entries(statistics.success_rate_by_position || {}).map(([pos, rate]) => ({
        position: `Pos ${pos}`,
        rate: rate * 100
    }));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card title="Tasa de Éxito por Posición Inicial">
                <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={positionData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-line)" />
                            <XAxis dataKey="position" stroke="var(--text-muted)" />
                            <YAxis stroke="var(--text-muted)" />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--bg-card)', border: 'none', borderRadius: '8px' }}
                                itemStyle={{ color: 'var(--text-main)' }}
                            />
                            <Legend />
                            <Bar dataKey="rate" fill="var(--color-primary)" name="Tasa de Éxito (%)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};

export default TrainingStats;
