import React, { useState } from 'react';
import GameMap from '../../components/visualization/GameMap';
import StepControls from './StepControls';
import ActionDisplay from './ActionDisplay';
import ExplanationPanel from './ExplanationPanel';
import TimelineView from './TimelineView';
import HuntingStats from './HuntingStats';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import ResultModal from '../../components/common/ResultModal';
import { useGameStore } from '../../hooks/useGameStore';
import './Hunting.css';

const HuntingPanel = () => {
    const { huntState, huntHistory, startHunting, resetHunt, isLoading } = useGameStore();
    const [config, setConfig] = useState({
        lion_position: 1,
        impala_mode: 'random'
    });
    const [sequenceStr, setSequenceStr] = useState('');
    const [showModal, setShowModal] = useState(false);

    // Effect to show modal when game ends
    React.useEffect(() => {
        if (huntState?.status === 'success' || huntState?.status === 'failed') {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [huntState?.status]);

    const handleStart = () => {
        const payload = { ...config };
        if (config.impala_mode === 'programmed') {
            // Parse comma-separated string to array
            payload.impala_sequence = sequenceStr.split(',').map(s => s.trim()).filter(s => s);
        }
        startHunting(payload);
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
                                { value: 'programmed', label: 'Programado' }
                            ]}
                        />
                        {config.impala_mode === 'programmed' && (
                            <Input
                                label="Secuencia Impala (separada por comas)"
                                placeholder="Ej: look_left, move_forward, drink"
                                value={sequenceStr}
                                onChange={(e) => setSequenceStr(e.target.value)}
                            />
                        )}
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
                        </div>
                        <StepControls />

                        {showModal && (huntState.status === 'success' || huntState.status === 'failed') && (
                            <ResultModal
                                result={huntState.status}
                                onNewHunt={resetHunt}
                                onClose={() => setShowModal(false)}
                            />
                        )}
                    </>
                )}
            </div>

            <div className="hunting-sidebar">
                {huntState && (
                    <>
                        <ExplanationPanel timeStep={huntState.time_step} />
                        <TimelineView history={huntHistory} />
                        <HuntingStats history={huntHistory} />
                    </>
                )}
            </div>
        </div>
    );
};

export default HuntingPanel;
