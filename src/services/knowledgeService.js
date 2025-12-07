import api from './api';

export const knowledgeService = {
    getBase: async (format = 'json') => {
        const response = await api.get('/knowledge/base', { params: { format } });
        return response.data;
    },
    save: async (filename, format = 'json') => {
        const response = await api.post('/knowledge/save', { filename, format });
        return response.data;
    },
    load: async (filename) => {
        const response = await api.post('/knowledge/load', { filename });
        return response.data;
    },
    getFiles: async () => {
        const response = await api.get('/knowledge/files');
        return response.data;
    },
    clear: async () => {
        const response = await api.delete('/knowledge/clear');
        return response.data;
    },
    reset: async () => {
        const response = await api.post('/knowledge/reset');
        return response.data;
    },
    getAbstractions: async () => {
        const response = await api.get('/knowledge/abstractions');
        return response.data;
    },
    query: async (lionPosition, impalaAction) => {
        const response = await api.get('/knowledge/query', {
            params: { lion_position: lionPosition, impala_action: impalaAction },
        });
        return response.data;
    },
};
