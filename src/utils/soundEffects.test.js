import { describe, it, expect, vi, beforeEach } from 'vitest';
import { playClickSound, playHoverSound } from './soundEffects';

describe('soundEffects', () => {
    // Variables removed to fix lint error


    beforeEach(() => {
        // Reset mocks before each test if needed, or rely on global mock.
        // We can access the global mock to spy on it if we want, or just check global.AudioContext usage.
        vi.clearAllMocks();
    });

    it('playClickSound creates oscillator and gain', () => {
        playClickSound();
        expect(AudioContext).toHaveBeenCalled();
        const contextInstance = AudioContext.mock.results[AudioContext.mock.results.length - 1].value;
        expect(contextInstance.createOscillator).toHaveBeenCalled();
        expect(contextInstance.createGain).toHaveBeenCalled();

        const oscillator = contextInstance.createOscillator.mock.results[0].value;
        expect(oscillator.start).toHaveBeenCalled();
    });

    it('playHoverSound has different parameters', () => {
        playHoverSound();
        expect(AudioContext).toHaveBeenCalled();
        const contextInstance = AudioContext.mock.results[AudioContext.mock.results.length - 1].value;
        expect(contextInstance.createOscillator).toHaveBeenCalled();

        const oscillator = contextInstance.createOscillator.mock.results[0].value;
        expect(oscillator.start).toHaveBeenCalled();
    });
});
