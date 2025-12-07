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
    currentStepIndex: 0,

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
            set({ huntState: state, huntHistory: [state], currentStepIndex: 0, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    stepHunting: async () => {
        try {
            // If we are viewing history and not at the end, just move forward in history
            const { huntHistory, currentStepIndex } = get();
            if (currentStepIndex < huntHistory.length - 1) {
                const newIndex = currentStepIndex + 1;
                set({
                    currentStepIndex: newIndex,
                    huntState: huntHistory[newIndex]
                });
                return;
            }

            // Otherwise, perform actual API step
            const result = await huntingService.step();
            // result contains the new state fields directly (lion, impala, etc.)
            set((state) => {
                const newHistory = [...state.huntHistory, result];
                return {
                    huntState: result,
                    huntHistory: newHistory,
                    currentStepIndex: newHistory.length - 1
                };
            });
            return result;
        } catch (error) {
            set({ error: error.message });
        }
    },

    prevStep: () => {
        const { huntHistory, currentStepIndex } = get();
        if (currentStepIndex > 0) {
            const newIndex = currentStepIndex - 1;
            set({
                currentStepIndex: newIndex,
                huntState: huntHistory[newIndex]
            });
        }
    },

    resetHunt: () => {
        set({ huntState: null, huntHistory: [], currentStepIndex: 0, error: null });
    },
}));
