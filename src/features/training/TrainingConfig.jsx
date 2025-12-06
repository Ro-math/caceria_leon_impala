import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import { useTrainingStore } from '../../hooks/useTrainingStore';
import './Training.css';

const TrainingConfig = () => {
    const { startTraining, isTraining } = useTrainingStore();
    const [config, setConfig] = useState({
        num_incursions: 1000,
        initial_positions: [1, 2, 3, 4, 5, 6, 7, 8],
        impala_mode: 'random',
        impala_sequence: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: name === 'num_incursions' ? parseInt(value) : value
        }));
    };

    const handlePositionToggle = (pos) => {
        setConfig(prev => {
            const positions = prev.initial_positions.includes(pos)
                ? prev.initial_positions.filter(p => p !== pos)
                : [...prev.initial_positions, pos];
            return { ...prev, initial_positions: positions.sort() };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        startTraining(config);
    };

    return (
        <Card title="Configuración de Entrenamiento">
            <form onSubmit={handleSubmit}>
                <Input
                    label="Número de Incursiones"
                    name="num_incursions"
                    type="number"
                    value={config.num_incursions}
                    onChange={handleChange}
                    min="1"
                    disabled={isTraining}
                />

                <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Posiciones Iniciales</label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(pos => (
                            <Button
                                key={pos}
                                type="button"
                                variant={config.initial_positions.includes(pos) ? 'primary' : 'secondary'}
                                onClick={() => handlePositionToggle(pos)}
                                disabled={isTraining}
                                className="btn-sm"
                            >
                                {pos}
                            </Button>
                        ))}
                    </div>
                </div>

                <Select
                    label="Modo Impala"
                    name="impala_mode"
                    value={config.impala_mode}
                    onChange={handleChange}
                    options={[
                        { value: 'random', label: 'Aleatorio' },
                        { value: 'programmed', label: 'Programado' }
                    ]}
                    disabled={isTraining}
                />

                {config.impala_mode === 'programmed' && (
                    <Input
                        label="Secuencia (ej: L,R,F,W,H)"
                        name="impala_sequence"
                        value={config.impala_sequence}
                        onChange={handleChange}
                        disabled={isTraining}
                    />
                )}

                <Button type="submit" disabled={isTraining || config.initial_positions.length === 0} style={{ width: '100%' }}>
                    {isTraining ? 'Entrenando...' : 'Iniciar Entrenamiento'}
                </Button>
            </form>
        </Card>
    );
};

export default TrainingConfig;
