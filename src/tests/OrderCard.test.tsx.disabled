import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OrderCard } from '../components/OrderCard';
import type { Order } from '../providers/Provider';

// Mock the store
vi.mock('../store/useAppStore', () => ({
  useAppStore: () => ({
    vehicle: { isParked: true },
    actions: {
      acceptOrder: vi.fn(),
      declineOrder: vi.fn(),
    }
  })
}));

const mockOrder: Order = {
  id: 'test-order',
  provider: 'doordash',
  restaurant: 'Test Restaurant',
  customer: 'John Doe',
  pickupEtaMin: 10,
  dropoffEtaMin: 15,
  distanceMi: 3.5,
  payoutUsd: 12.50,
  notes: 'Extra napkins please',
  status: 'available',
  pickupAddress: '123 Main St',
  dropoffAddress: '456 Oak Ave',
};

describe('OrderCard', () => {
  it('should render order information correctly', () => {
    render(<OrderCard order={mockOrder} />);
    
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('$3.57/mi')).toBeInTheDocument(); // 12.50 / 3.5
    expect(screen.getByText('$12.50')).toBeInTheDocument();
    expect(screen.getByText('3.5 mi')).toBeInTheDocument();
    expect(screen.getByText('25 min')).toBeInTheDocument(); // 10 + 15
  });

  it('should show provider badge', () => {
    render(<OrderCard order={mockOrder} />);
    
    expect(screen.getByText('doordash')).toBeInTheDocument();
  });

  it('should show notes when provided', () => {
    render(<OrderCard order={mockOrder} />);
    
    expect(screen.getByText('Extra napkins please')).toBeInTheDocument();
  });

  it('should show action buttons when showActions is true', () => {
    render(<OrderCard order={mockOrder} showActions={true} />);
    
    expect(screen.getByText('Decline')).toBeInTheDocument();
    expect(screen.getByText('Accept $12.50')).toBeInTheDocument();
  });

  it('should not show action buttons when showActions is false', () => {
    render(<OrderCard order={mockOrder} showActions={false} />);
    
    expect(screen.queryByText('Decline')).not.toBeInTheDocument();
    expect(screen.queryByText('Accept $12.50')).not.toBeInTheDocument();
  });

  it('should not show action buttons for non-available orders', () => {
    const acceptedOrder = { ...mockOrder, status: 'accepted' as const };
    render(<OrderCard order={acceptedOrder} showActions={true} />);
    
    expect(screen.queryByText('Decline')).not.toBeInTheDocument();
    expect(screen.queryByText('Accept $12.50')).not.toBeInTheDocument();
  });
});
