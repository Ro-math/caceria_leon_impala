import React, { useState } from 'react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { huntingService } from '../../services/huntingService';
import { FaLightbulb } from 'react-icons/fa';

const ExplanationPanel = ({ timeStep }) => {
    const [explanation, setExplanation] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleExplain = async () => {
        setLoading(true);
        try {
            const result = await huntingService.explain(timeStep);
            setExplanation(result.explanation);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Explicación" className="explanation-card">
            {!explanation ? (
                <Button onClick={handleExplain} variant="outline" isLoading={loading} style={{ width: '100%' }}>
                    <FaLightbulb /> ¿Por qué hizo esto?
                </Button>
            ) : (
                <div className="explanation-box">
                    {explanation}
                    <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
                        <Button variant="text" onClick={() => setExplanation(null)} style={{ fontSize: '0.8rem' }}>
                            Cerrar
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default ExplanationPanel;
