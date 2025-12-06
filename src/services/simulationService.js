import api from './api';

export const simulationService = {
    initialize: async (config) => {
        constresponse = await api.post('/simulation/initialize', config);
        return response.data;
    },
    getState: async () => {
        const response = await api.get('/simulation/state');
        return response.data;
    },
    reset: async () => {
        const response = await api.post('/simulation/reset');
        return response.data;
    },
};
