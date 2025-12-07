import React from 'react';
import Button from '../../components/common/Button';
import { FaPlay, FaStepForward, FaRedo } from 'react-icons/fa';
import { useGameStore } from '../../hooks/useGameStore';

const StepControls = () => {
    const { stepHunting, isLoading, huntState } = useGameStore();
    const [isPlaying, setIsPlaying] = React.useState(false);

    const handleStep = () => {
        stepHunting();
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const isFinished = huntState?.status === 'success' || huntState?.status === 'failed';

    React.useEffect(() => {
        let interval;
        if (isPlaying && !isFinished && !isLoading) {
            interval = setInterval(() => {
                stepHunting();
            }, 1000); // 1 step per second
        } else if (isFinished) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, isFinished, isLoading, stepHunting]);

    return (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button onClick={handleStep} disabled={isLoading || isFinished || isPlaying}>
                <FaStepForward /> Paso
            </Button>
            <Button
                onClick={togglePlay}
                variant={isPlaying ? "danger" : "secondary"}
                disabled={isFinished}
                title={isPlaying ? "Pausar" : "Reproducción Automática"}
            >
                {isPlaying ? <><FaRedo /> Pausar</> : <><FaPlay /> Auto</>}
            </Button>
            {/* Reset is handled by starting a new hunt */}
        </div>
    );
};

export default StepControls;
