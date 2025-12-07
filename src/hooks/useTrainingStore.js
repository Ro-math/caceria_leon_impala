import { create } from 'zustand';
import { trainingService } from '../services/trainingService';

export const useTrainingStore = create((set, get) => ({
    // State
    isTraining: false,
    isPaused: false,
    status: null, // { progress, statistics, current_incursion }
    statistics: null,
    error: null,

    // Actions
    startTraining: async (config) => {
        set({ isTraining: true, isPaused: false, error: null });
        try {
            // Debounce: wait 2 seconds before starting to allow user to see initial state
            await new Promise(resolve => setTimeout(resolve, 2000));

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
            set({ isTraining: false, isPaused: false });
        } catch (error) {
            set({ error: error.message });
        }
    },

    resumeTraining: async () => {
        set({ isPaused: false });
        try {
            await trainingService.resume();
            set({ isTraining: true });
            get().fetchStatus();
        } catch (error) {
            set({ error: error.message, isPaused: true });
        }
    },

    pauseTraining: async () => {
        try {
            await trainingService.stop();
            set({ isPaused: true, isTraining: false });
        } catch (error) {
            set({ error: error.message });
        }
    },

    fetchStatus: async () => {
        try {
            const status = await trainingService.getStatus();
            set({ status });
            if (status.status === 'completed') {
                set({ isTraining: false, isPaused: false });
            } else if (status.status === 'stopped') {
                set({ isTraining: false, isPaused: true });
            } else if (status.status === 'running') {
                set({ isTraining: true, isPaused: false });
            }
            return status;
        } catch (error) {
            console.error('Error fetching status:', error);
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
