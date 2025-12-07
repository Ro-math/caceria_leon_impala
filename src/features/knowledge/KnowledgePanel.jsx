import React, { useState, useEffect } from 'react';
import KnowledgeTable from './KnowledgeTable';
import AbstractionViewer from './AbstractionViewer';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import { knowledgeService } from '../../services/knowledgeService';
import { FaSave, FaFolderOpen, FaTrash, FaSync, FaInfoCircle, FaDownload, FaRedo } from 'react-icons/fa';
import Modal from '../../components/common/Modal';
import toast from 'react-hot-toast';
import './Knowledge.css';

const KnowledgePanel = () => {
    const [activeTab, setActiveTab] = useState('base'); // 'base' or 'abstractions'
    const [data, setData] = useState([]);
    const [abstractions, setAbstractions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    // Modal states
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showLoadModal, setShowLoadModal] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [filename, setFilename] = useState('knowledge_base');

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'base') {
                const result = await knowledgeService.getBase();
                // Parse Q-table: { state: { action: value } } -> [{ state, action, value }]
                const qTable = result.q_table || {};
                const parsedData = [];
                Object.entries(qTable).forEach(([state, actions]) => {
                    Object.entries(actions).forEach(([action, value]) => {
                        parsedData.push({ state, action, value });
                    });
                });
                setData(parsedData);
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
        if (!filename.trim()) {
            toast.error('Por favor ingresa un nombre de archivo');
            return;
        }

        try {
            // Save to server
            await knowledgeService.save(filename);

            // Fetch all knowledge data
            const baseData = await knowledgeService.getBase();
            const abstractionsData = await knowledgeService.getAbstractions();

            // Prepare download data
            const knowledgeExport = {
                timestamp: new Date().toISOString(),
                filename: filename,
                q_table: baseData.q_table || {},
                abstractions: Array.isArray(abstractionsData) ? abstractionsData : (abstractionsData.abstractions || []),
                metadata: {
                    total_states: Object.keys(baseData.q_table || {}).length,
                    total_abstractions: Array.isArray(abstractionsData) ? abstractionsData.length : (abstractionsData.abstractions || []).length
                }
            };

            // Create and download file
            const blob = new Blob([JSON.stringify(knowledgeExport, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${filename}_export.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            toast.success(`Conocimiento guardado y descargado como ${filename}_export.json`);
            setShowSaveModal(false);
        } catch (error) {
            console.error('Error al guardar:', error);
            toast.error('Error al guardar');
        }
    };

    const handleLoad = async () => {
        if (!filename.trim()) {
            toast.error('Por favor ingresa un nombre de archivo');
            return;
        }

        try {
            await knowledgeService.load(filename);
            toast.success('Conocimiento cargado');
            loadData();
            setShowLoadModal(false);
        } catch (error) {
            toast.error('Error al cargar');
        }
    };

    const handleClear = async () => {
        try {
            await knowledgeService.clear();
            toast.success('Base de conocimientos limpiada');
            loadData();
            setShowClearModal(false);
        } catch (error) {
            toast.error('Error al limpiar');
        }
    };

    const handleReset = async () => {
        try {
            await knowledgeService.reset();
            // Clear all localStorage
            localStorage.clear();
            toast.success('Aplicación reiniciada completamente');
            loadData();
            setShowResetModal(false);
            // Reload page to reset all state
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            toast.error('Error al reiniciar');
        }
    };

    return (
        <div className="knowledge-panel">
            <div className="knowledge-controls">
                <Button onClick={() => setShowSaveModal(true)} variant="secondary"><FaDownload /> Guardar y Descargar</Button>
                <Button onClick={() => setShowLoadModal(true)} variant="secondary"><FaFolderOpen /> Cargar</Button>
                <Button onClick={() => setShowClearModal(true)} variant="danger"><FaTrash /> Limpiar</Button>
                <Button onClick={loadData} variant="outline" isLoading={loading}><FaSync /> Actualizar</Button>
                <Button onClick={() => setShowInfo(true)} variant="primary"><FaInfoCircle /> Info</Button>
                <Button onClick={() => setShowResetModal(true)} variant="danger"><FaRedo /> Reiniciar App</Button>
            </div>

            {/* Save Modal */}
            {showSaveModal && (
                <Modal isOpen={true} title="Guardar Conocimiento" onClose={() => setShowSaveModal(false)}>
                    <div style={{ padding: '1rem' }}>
                        <p style={{ marginBottom: '1rem' }}>
                            El conocimiento se guardará en el servidor y se descargará un archivo JSON con todos los datos.
                        </p>
                        <Input
                            label="Nombre del archivo"
                            value={filename}
                            onChange={(e) => setFilename(e.target.value)}
                            placeholder="knowledge_base"
                        />
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                            <Button onClick={() => setShowSaveModal(false)} variant="outline">Cancelar</Button>
                            <Button onClick={handleSave} variant="secondary"><FaDownload /> Guardar</Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Load Modal */}
            {showLoadModal && (
                <Modal isOpen={true} title="Cargar Conocimiento" onClose={() => setShowLoadModal(false)}>
                    <div style={{ padding: '1rem' }}>
                        <p style={{ marginBottom: '1rem' }}>
                            Cargar conocimiento desde el servidor reemplazará el conocimiento actual.
                        </p>
                        <Input
                            label="Nombre del archivo"
                            value={filename}
                            onChange={(e) => setFilename(e.target.value)}
                            placeholder="knowledge_base"
                        />
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                            <Button onClick={() => setShowLoadModal(false)} variant="outline">Cancelar</Button>
                            <Button onClick={handleLoad} variant="secondary"><FaFolderOpen /> Cargar</Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Clear Modal */}
            {showClearModal && (
                <Modal isOpen={true} title="Limpiar Conocimiento" onClose={() => setShowClearModal(false)}>
                    <div style={{ padding: '1rem' }}>
                        <p style={{ marginBottom: '1rem', color: 'var(--danger, #ef4444)', fontWeight: 'bold' }}>
                            ⚠️ ¿Estás seguro de borrar todo el conocimiento?
                        </p>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Esta acción eliminará todas las Q-tables y abstracciones aprendidas. No se puede deshacer.
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <Button onClick={() => setShowClearModal(false)} variant="outline">Cancelar</Button>
                            <Button onClick={handleClear} variant="danger"><FaTrash /> Confirmar Limpieza</Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Reset Modal */}
            {showResetModal && (
                <Modal isOpen={true} title="Reiniciar Aplicación Completa" onClose={() => setShowResetModal(false)}>
                    <div style={{ padding: '1rem' }}>
                        <p style={{ marginBottom: '1rem', color: 'var(--danger, #ef4444)', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            🔴 ¿Estás seguro de reiniciar TODA la aplicación?
                        </p>
                        <p style={{ marginBottom: '1rem' }}>
                            Esta acción realizará:
                        </p>
                        <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
                            <li>Borrar todo el conocimiento (Q-tables y abstracciones)</li>
                            <li>Limpiar todo el localStorage (estadísticas de cacería, etc.)</li>
                            <li>Reiniciar el backend al estado inicial</li>
                            <li>Recargar la página automáticamente</li>
                        </ul>
                        <p style={{ marginBottom: '1.5rem', color: 'var(--danger, #ef4444)' }}>
                            ⚠️ Esta acción NO se puede deshacer. Todos los datos se perderán permanentemente.
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <Button onClick={() => setShowResetModal(false)} variant="outline">Cancelar</Button>
                            <Button onClick={handleReset} variant="danger"><FaRedo /> Confirmar Reinicio</Button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Info Modal */}
            {showInfo && (
                <Modal isOpen={true} title="Representación del Conocimiento" onClose={() => setShowInfo(false)}>
                    <div className="knowledge-info">
                        <h3>El Problema: Cacería en la Sabana</h3>
                        <p>
                            El objetivo es que el <strong>León</strong> aprenda a capturar al <strong>Impala</strong> en una cuadrícula de 19x19.
                            El león debe aprender estrategias eficientes (acercarse, emboscar) basándose en la posición del impala.
                        </p>

                        <h3>Representación del Conocimiento (Q-Learning)</h3>
                        <p>
                            El cerebro del león utiliza <strong>Aprendizaje por Refuerzo (Q-Learning)</strong>.
                            En lugar de reglas fijas ("si ves al impala, corre"), el león aprende el <strong>valor</strong> de cada acción.
                        </p>

                        <h4>1. Tablas Q (Q-Tables)</h4>
                        <p>
                            Es una tabla gigante que mapea <strong>Estados</strong> a <strong>Valores Q</strong>.
                        </p>
                        <ul>
                            <li><strong>Estado:</strong> La situación actual (ej. "Impala está al frente-izquierda, cerca").</li>
                            <li><strong>Acción:</strong> Lo que el león puede hacer (Avanzar, Rotar Izquierda, Rotar Derecha).</li>
                            <li><strong>Valor Q:</strong> Un número que indica qué tan buena es esa acción. Un valor alto (verde) significa que esa acción ha llevado al éxito en el pasado. Un valor bajo (rojo) significa que llevó al fracaso o pérdida de tiempo.</li>
                        </ul>

                        <h4>2. Abstracciones (Generalización)</h4>
                        <p>
                            Para no tener que aprender cada posición exacta (lo cual tomaría una eternidad), el león <strong>generaliza</strong>.
                            Agrupa situaciones similares. Por ejemplo, si el impala está en (5,5) o en (6,6), para el león puede ser simplemente "Impala al Noreste".
                            Esto le permite aprender mucho más rápido.
                        </p>
                    </div>
                </Modal>
            )}

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
