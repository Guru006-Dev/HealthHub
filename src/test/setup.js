import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Global AudioContext Mock
global.AudioContext = vi.fn().mockImplementation(() => ({
    createOscillator: vi.fn(() => ({
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
        type: 'sine'
    })),
    createGain: vi.fn(() => ({
        connect: vi.fn(),
        gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    })),
    state: 'running',
    resume: vi.fn(),
    currentTime: 0,
    destination: {},
}));
global.webkitAudioContext = global.AudioContext;
global.window.AudioContext = global.AudioContext;
global.window.webkitAudioContext = global.AudioContext;
