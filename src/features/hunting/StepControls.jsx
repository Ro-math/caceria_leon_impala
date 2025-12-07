import React from 'react';
import Button from '../../components/common/Button';
import { FaPlay, FaStepForward, FaStepBackward, FaRedo, FaUndo } from 'react-icons/fa';
import { useGameStore } from '../../hooks/useGameStore';

const StepControls = () => {
    const { stepHunting, prevStep, resetHunt, isLoading, huntState, currentStepIndex, huntHistory } = useGameStore();
    const [isPlaying, setIsPlaying] = React.useState(false);

    const handleStep = () => {
        stepHunting();
    };

    const handlePrev = () => {
        prevStep();
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const isFinished = huntState?.status === 'success' || huntState?.status === 'failed';
    // Check if we are at the end of the history to know if "Next" means new step or just history navigation
    const isAtEnd = !huntHistory || currentStepIndex === huntHistory.length - 1;

    React.useEffect(() => {
        let interval;
        // Auto-play only if playing, not loading, and (not finished OR not at the end of history)
        // If finished but we are reviewing history (not at end), we can still auto-play forward
        if (isPlaying && !isLoading) {
            if (isFinished && isAtEnd) {
                setIsPlaying(false);
            } else {
                interval = setInterval(() => {
                    stepHunting();
                }, 1000); // 1 step per second
            }
        }
        return () => clearInterval(interval);
    }, [isPlaying, isFinished, isAtEnd, isLoading, stepHunting]);

    return (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button onClick={handlePrev} disabled={isLoading || currentStepIndex === 0} variant="secondary">
                <FaStepBackward /> Anterior
            </Button>
            <Button onClick={handleStep} disabled={isLoading || (isFinished && isAtEnd) || isPlaying}>
                <FaStepForward /> {isAtEnd ? 'Paso' : 'Siguiente'}
            </Button>
            <Button
                onClick={togglePlay}
                variant={isPlaying ? "danger" : "secondary"}
                disabled={isFinished && isAtEnd}
                title={isPlaying ? "Pausar" : "Reproducción Automática"}
            >
                {isPlaying ? <><FaRedo /> Pausar</> : <><FaPlay /> Auto</>}
            </Button>
            <Button onClick={resetHunt} variant="danger" title="Reiniciar Cacería">
                <FaUndo /> Reiniciar
            </Button>
        </div>
    );
};

export default StepControls;
