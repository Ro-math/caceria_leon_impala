import React from 'react';
import Button from '../../components/common/Button';
import { FaPlay, FaStepForward, FaRedo } from 'react-icons/fa';
import { useGameStore } from '../../hooks/useGameStore';

const StepControls = () => {
    const { stepHunting, isLoading, huntState } = useGameStore();

    const handleStep = () => {
        stepHunting();
    };

    // Auto-play logic could be added here with a useEffect and interval

    return (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button onClick={handleStep} disabled={isLoading || huntState?.status === 'finished'}>
                <FaStepForward /> Paso
            </Button>
            <Button variant="secondary" disabled={true} title="Auto-play (Coming Soon)">
                <FaPlay /> Auto
            </Button>
            {/* Reset is handled by starting a new hunt */}
        </div>
    );
};

export default StepControls;
