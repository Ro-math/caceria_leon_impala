import React from 'react';
import './Knowledge.css';

const KnowledgeTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No hay conocimiento registrado.</div>;
    }

    // Assuming data is an array of objects like { lion_pos, impala_action, lion_action, reward, count }
    return (
        <div className="knowledge-table-container">
            <table className="knowledge-table">
                <thead>
                    <tr>
                        <th>Posición León</th>
                        <th>Acción Impala</th>
                        <th>Acción León</th>
                        <th>Recompensa</th>
                        <th>Veces Visto</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.lion_position}</td>
                            <td>{row.impala_action}</td>
                            <td>{row.lion_action}</td>
                            <td style={{ color: row.reward > 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                                {row.reward}
                            </td>
                            <td>{row.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default KnowledgeTable;
