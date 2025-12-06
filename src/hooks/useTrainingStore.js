import { create } from 'zustand';
import { trainingService } from '../services/trainingService';

export const useTrainingStore = create((set, get) => ({
    // State
    isTraining: false,
    status: null, // { progress, statistics, current_incursion }
    statistics: null,
    error: null,

    // Actions
    startTraining: async (config) => {
        set({ isTraining: true, error: null });
        try {
            await trainingService.start(config);
            // Start polling or rely on status updates
            get().fetchStatus();
        } catch (error) {
            set({ isTraining: false, error: error.message });
        }
    },

    stopTraining: async () => {
        try {
            await trainingService.stop();
            set({ isTraining: false });
        } catch (error) {
            set({ error: error.message });
        }
    },

    fetchStatus: async () => {
        try {
            const status = await trainingService.getStatus();
            set({ status });
            if (status.status === 'completed' || status.status === 'stopped') {
                set({ isTraining: false });
            }
            return status;
        } catch (error) {
            console.error(error);
        }
    },

    fetchStatistics: async () => {
        try {
            const stats = await trainingService.getStatistics();
            set({ statistics: stats });
        } catch (error) {
            console.error(error);
        }
    },
}));
