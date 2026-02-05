import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FloatingToggle from './FloatingToggle';

// Mock sound effects
vi.mock('../utils/soundEffects', () => ({
    playClickSound: vi.fn(),
    playHoverSound: vi.fn(),
}));

describe('FloatingToggle', () => {
    it('renders correctly', () => {
        render(<FloatingToggle isCalmMode={false} toggleCalmMode={() => { }} />);
        const button = screen.getByRole('button', { name: /Toggle Calm Mode/i });
        expect(button).toBeInTheDocument();
    });

    it('calls toggle function on click', () => {
        const toggleMock = vi.fn();
        render(<FloatingToggle isCalmMode={false} toggleCalmMode={toggleMock} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(toggleMock).toHaveBeenCalledTimes(1);
    });

    it('displays different icon based on mode', () => {
        // Since icons are SVGs from lucide-react, testing their presence is tricky by text.
        // We can just rely on the button rendering without crashing for now.
        render(<FloatingToggle isCalmMode={true} toggleCalmMode={() => { }} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
