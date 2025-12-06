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
            const state = await huntingService.start(config);
            set({ huntState: state, huntHistory: [state], isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    stepHunting: async () => {
        // Optimistic update or wait for response? Wait for response to be safe.
        try {
            const result = await huntingService.step();
            // result contains action_impala, action_lion, new_state, reason
            set((state) => ({
                huntState: result.new_state,
                huntHistory: [...state.huntHistory, result.new_state],
            }));
            return result;
        } catch (error) {
            set({ error: error.message });
        }
    },
}));
