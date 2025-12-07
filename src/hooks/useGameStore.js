import { create } from 'zustand';
import { simulationService } from '../services/simulationService';
import { huntingService } from '../services/huntingService';

export const useGameStore = create((set, get) => ({
    // State
    gameState: null,
    isLoading: false,
    error: null,
    huntState: null,
    huntHistory: [],

    // Actions
    initializeSimulation: async (config) => {
        set({ isLoading: true, error: null });
        try {
            const state = await simulationService.initialize(config);
            set({ gameState: state, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    resetSimulation: async () => {
        set({ isLoading: true });
        try {
            const state = await simulationService.reset();
            set({ gameState: state, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    startHunting: async (config) => {
        set({ isLoading: true });
        try {
            await huntingService.start(config);
            // Fetch the initial state explicitly because start() only returns a message
            const state = await huntingService.getState();
            set({ huntState: state, huntHistory: [state], isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    stepHunting: async () => {
        try {
            const result = await huntingService.step();
            // result contains the new state fields directly (lion, impala, etc.)
            set((state) => ({
                huntState: result,
                huntHistory: [...state.huntHistory, result],
            }));
            return result;
        } catch (error) {
            set({ error: error.message });
        }
    },
}));
