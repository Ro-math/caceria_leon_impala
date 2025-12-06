import React from 'react';
import TrainingConfig from './TrainingConfig';
import TrainingProgress from './TrainingProgress';
import TrainingStats from './TrainingStats';
import './Training.css';

const TrainingPanel = () => {
    return (
        <div className="training-panel">
            <div className="config-section">
                <TrainingConfig />
                <TrainingProgress />
            </div>
            <TrainingStats />
        </div>
    );
};

export default TrainingPanel;
