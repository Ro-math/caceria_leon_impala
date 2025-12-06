import api from './api';

export const huntingService = {
    start: async (config) => {
        const response = await api.post('/hunting/start', config);
        return response.data;
    },
    step: async () => {
        const response = await api.post('/hunting/step');
        return response.data;
    },
    getState: async () => {
        const response = await api.get('/hunting/state');
        return response.data;
    },
    explain: async (timeStep) => {
        const response = await api.post('/hunting/explain', { time_step: timeStep });
        return response.data;
    },
    getResult: async () => {
        const response = await api.get('/hunting/result');
        return response.data;
    },
};
