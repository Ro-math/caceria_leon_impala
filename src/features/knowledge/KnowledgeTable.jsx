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
                        <th>Estado (Situación)</th>
                        <th>Acción</th>
                        <th>Valor Q (Utilidad) % (-1,1) </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td className="state-cell" title={row.state}>{row.state}</td>
                            <td>{row.action}</td>
                            <td style={{
                                color: row.value > 0 ? 'var(--color-success)' : row.value < 0 ? 'var(--color-danger)' : 'inherit',
                                fontWeight: 'bold'
                            }}>
                                {typeof row.value === 'number' ? row.value.toFixed(4) : row.value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default KnowledgeTable;
