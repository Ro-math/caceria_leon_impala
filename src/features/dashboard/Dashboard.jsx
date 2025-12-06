import React from 'react';
import QuickStats from './QuickStats';
import RecentActivity from './RecentActivity';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaDumbbell } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="welcome-section">
                <h1 className="welcome-title">Bienvenido, Joven León</h1>
                <p className="welcome-text">
                    Tu supervivencia depende de tu capacidad para aprender. Entrena, caza y evoluciona.
                </p>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                    <Button
                        variant="secondary"
                        onClick={() => navigate('/training')}
                        style={{ backgroundColor: 'var(--text-dark)', color: 'var(--text-main)' }}
                    >
                        <FaDumbbell /> Iniciar Entrenamiento
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/hunting')}
                        style={{ borderColor: 'var(--text-dark)', color: 'var(--text-dark)' }}
                    >
                        <FaPlay /> Ir a Cacería
                    </Button>
                </div>
            </div>

            <div className="dashboard-grid">
                <QuickStats />
                <RecentActivity />
            </div>
        </div>
    );
};

export default Dashboard;
