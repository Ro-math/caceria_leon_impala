import React, { useState } from 'react';
import GameMap from '../../components/visualization/GameMap';
import StepControls from './StepControls';
import ActionDisplay from './ActionDisplay';
import ExplanationPanel from './ExplanationPanel';
import TimelineView from './TimelineView';
import Card from '../../components/common/Card';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import { useGameStore } from '../../hooks/useGameStore';
import './Hunting.css';

const HuntingPanel = () => {
    const { huntState, huntHistory, startHunting, isLoading } = useGameStore();
    const [config, setConfig] = useState({
        lion_position: 1,
        impala_mode: 'random'
    });

    const handleStart = () => {
        startHunting(config);
    };

    return (
        <div className="hunting-panel">
            <div className="hunting-main">
                {!huntState ? (
                    <Card title="Nueva Cacería" style={{ width: '100%', maxWidth: '400px' }}>
                        <Select
                            label="Posición Inicial del León"
                            value={config.lion_position}
                            onChange={(e) => setConfig({ ...config, lion_position: parseInt(e.target.value) })}
                            options={[1, 2, 3, 4, 5, 6, 7, 8].map(p => ({ value: p, label: `Posición ${p}` }))}
                        />
                        <Select
                            label="Modo Impala"
                            value={config.impala_mode}
                            onChange={(e) => setConfig({ ...config, impala_mode: e.target.value })}
                            options={[
                                { value: 'random', label: 'Aleatorio' },
                                { value: 'programmed', label: 'Programado' } // Simplification: no sequence input here for now
                            ]}
                        />
                        <Button onClick={handleStart} disabled={isLoading} style={{ width: '100%' }}>
                            Iniciar Cacería
                        </Button>
                    </Card>
                ) : (
                    <>
                        <ActionDisplay
                            lionAction={huntState.lion_action}
                            impalaAction={huntState.impala_action}
                            timeStep={huntState.time_step}
                        />
                        <div style={{ position: 'relative' }}>
                            <GameMap
                                lionPosition={huntState.lion?.position}
                                impalaPosition={huntState.impala?.position}
                                impalaAction={huntState.impala_action}
                                activeVision={
                                    huntState.impala_action === 'look_front' ? 'front' :
                                        huntState.impala_action === 'look_left' ? 'left' :
                                            huntState.impala_action === 'look_right' ? 'right' : null
                                }
                            />
                            {huntState.result && (
                                <div className="result-overlay">
                                    <h2 style={{ color: huntState.result === 'success' ? 'var(--color-success)' : 'var(--color-danger)' }}>
                                        {huntState.result === 'success' ? '¡Cacería Exitosa!' : '¡Falló!'}
                                    </h2>
                                    <Button onClick={() => window.location.reload()} variant="primary">Nueva Cacería</Button>
                                </div>
                            )}
                        </div>
                        <StepControls />
                    </>
                )}
            </div>

            <div className="hunting-sidebar">
                {huntState && (
                    <>
                        <ExplanationPanel timeStep={huntState.time_step} />
                        <TimelineView history={huntHistory} />
                    </>
                )}
            </div>
        </div>
    );
};

export default HuntingPanel;
