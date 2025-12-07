import React from 'react';
import { GiLion, GiDeer } from 'react-icons/gi';
import { FaSkull, FaRunning } from 'react-icons/fa';
import Button from './Button';
import './ResultModal.css';

const ResultModal = ({ result, onNewHunt, onClose }) => {
    const isSuccess = result === 'success';

    return (
        <div className="result-modal-overlay">
            <div className={`result-modal-content ${result}`}>
                <div className="animation-container">
                    {isSuccess ? (
                        <>
                            <GiLion className="result-icon lion-success" />
                            <GiDeer className="result-icon impala-caught" />
                        </>
                    ) : (
                        <>
                            <GiLion className="result-icon lion-failed" />
                            <GiDeer className="result-icon impala-escape" />
                        </>
                    )}
                </div>

                <h2 className="result-title" style={{ color: isSuccess ? 'var(--color-primary)' : 'var(--color-danger)' }}>
                    {isSuccess ? '¡Cacería Exitosa!' : '¡El Impala Escapó!'}
                </h2>

                <p className="result-message">
                    {isSuccess
                        ? 'El león ha demostrado su dominio en la sabana.'
                        : 'El impala fue más rápido esta vez. El león pasará hambre.'}
                </p>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button onClick={onClose} variant="secondary" style={{ flex: 1 }}>
                        Ver Tablero
                    </Button>
                    <Button onClick={onNewHunt} variant={isSuccess ? 'primary' : 'danger'} style={{ flex: 1 }}>
                        Nueva Cacería
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ResultModal;
