import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SafetyBanner } from '../components/SafetyBanner';

// Mock the store
vi.mock('../store/useAppStore');

describe('Safety Features', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not show safety banner when parked', async () => {
    const { useAppStore } = await import('../store/useAppStore');
    vi.mocked(useAppStore).mockReturnValue({
      vehicle: { isParked: true },
      ui: { voiceEnabled: true },
    } as any);
    
    render(<SafetyBanner />);
    
    expect(screen.queryByText('Driving Mode Active')).not.toBeInTheDocument();
  });

  it('should show safety banner when driving', async () => {
    const { useAppStore } = await import('../store/useAppStore');
    vi.mocked(useAppStore).mockReturnValue({
      vehicle: { isParked: false },
      ui: { voiceEnabled: true },
    } as any);
    
    render(<SafetyBanner />);
    
    expect(screen.getByText('Driving Mode Active')).toBeInTheDocument();
    expect(screen.getByText(/Use voice commands or the "Next Step" button/)).toBeInTheDocument();
  });

  it('should show different message when voice is disabled while driving', async () => {
    const { useAppStore } = await import('../store/useAppStore');
    vi.mocked(useAppStore).mockReturnValue({
      vehicle: { isParked: false },
      ui: { voiceEnabled: false },
    } as any);
    
    render(<SafetyBanner />);
    
    expect(screen.getByText('Driving Mode Active')).toBeInTheDocument();
    expect(screen.getByText(/Voice is disabled. Only the "Next Step" button/)).toBeInTheDocument();
  });
});
