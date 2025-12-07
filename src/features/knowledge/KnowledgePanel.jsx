import React, { useState, useEffect } from 'react';
import KnowledgeTable from './KnowledgeTable';
import AbstractionViewer from './AbstractionViewer';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { knowledgeService } from '../../services/knowledgeService';
import { FaSave, FaFolderOpen, FaTrash, FaSync } from 'react-icons/fa';
import toast from 'react-hot-toast';
import './Knowledge.css';

const KnowledgePanel = () => {
    const [activeTab, setActiveTab] = useState('base'); // 'base' or 'abstractions'
    const [data, setData] = useState([]);
    const [abstractions, setAbstractions] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'base') {
                const result = await knowledgeService.getBase();
                setData(result.knowledge || []); // Adjust based on actual API response structure
            } else {
                const result = await knowledgeService.getAbstractions();
                // API returns array directly or object with abstractions property
                setAbstractions(Array.isArray(result) ? result : (result.abstractions || []));
            }
        } catch (error) {
            toast.error('Error al cargar conocimiento');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [activeTab]);

    const handleSave = async () => {
        const filename = prompt('Nombre del archivo:', 'knowledge_base');
        if (!filename) return;
        try {
            await knowledgeService.save(filename);
            toast.success('Conocimiento guardado');
        } catch (error) {
            toast.error('Error al guardar');
        }
    };

    const handleLoad = async () => {
        const filename = prompt('Nombre del archivo a cargar:', 'knowledge_base');
        if (!filename) return;
        try {
            await knowledgeService.load(filename);
            toast.success('Conocimiento cargado');
            loadData();
        } catch (error) {
            toast.error('Error al cargar');
        }
    };

    const handleClear = async () => {
        if (!window.confirm('¿Estás seguro de borrar todo el conocimiento?')) return;
        try {
            await knowledgeService.clear();
            toast.success('Base de conocimientos limpiada');
            loadData();
        } catch (error) {
            toast.error('Error al limpiar');
        }
    };

    return (
        <div className="knowledge-panel">
            <div className="knowledge-controls">
                <Button onClick={handleSave} variant="secondary"><FaSave /> Guardar</Button>
                <Button onClick={handleLoad} variant="secondary"><FaFolderOpen /> Cargar</Button>
                <Button onClick={handleClear} variant="danger"><FaTrash /> Limpiar</Button>
                <Button onClick={loadData} variant="outline" isLoading={loading}><FaSync /> Actualizar</Button>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <Button
                    variant={activeTab === 'base' ? 'primary' : 'secondary'}
                    onClick={() => setActiveTab('base')}
                >
                    Base de Conocimientos
                </Button>
                <Button
                    variant={activeTab === 'abstractions' ? 'primary' : 'secondary'}
                    onClick={() => setActiveTab('abstractions')}
                >
                    Abstracciones
                </Button>
            </div>

            <Card title={activeTab === 'base' ? 'Reglas Aprendidas' : 'Generalizaciones'}>
                {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando...</div>
                ) : (
                    activeTab === 'base' ? <KnowledgeTable data={data} /> : <AbstractionViewer abstractions={abstractions} />
                )}
            </Card>
        </div>
    );
};

export default KnowledgePanel;
