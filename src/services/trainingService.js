import api from './api';

export const trainingService = {
    start: async (config) => {
        const response = await api.post('/training/start', config);
        return response.data;
    },
    stop: async () => {
        const response = await api.post('/training/stop');
        return response.data;
    },
    getStatus: async () => {
        const response = await api.get('/training/status');
        return response.data;
    },
    getStatistics: async () => {
        const response = await api.get('/training/statistics');
        return response.data;
    },
    resume: async () => {
        const response = await api.post('/training/resume');
        return response.data;
    },
};
