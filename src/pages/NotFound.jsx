import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h1 style={{ fontSize: '4rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>404</h1>
            <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Página no encontrada</p>
            <Link to="/">
                <Button>Volver al Inicio</Button>
            </Link>
        </div>
    );
};

export default NotFound;
