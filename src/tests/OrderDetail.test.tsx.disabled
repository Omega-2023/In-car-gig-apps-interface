import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OrderDetail } from '../components/OrderDetail';
import type { Order } from '../providers/Provider';

// Mock the store
vi.mock('../store/useAppStore', () => ({
  useAppStore: () => ({
    vehicle: { isParked: true },
    actions: {
      advanceFlow: vi.fn(),
      setActiveOrder: vi.fn(),
    }
  })
}));

const baseOrder: Order = {
  id: 'test-order',
  provider: 'doordash',
  restaurant: 'Test Restaurant',
  customer: 'John Doe',
  pickupEtaMin: 10,
  dropoffEtaMin: 15,
  distanceMi: 3.5,
  payoutUsd: 12.50,
  status: 'accepted',
  pickupAddress: '123 Main St, City, State',
  dropoffAddress: '456 Oak Ave, City, State',
};

describe('OrderDetail', () => {
  it('should render order details correctly', () => {
    render(<OrderDetail order={baseOrder} />);
    
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('$12.50')).toBeInTheDocument();
    expect(screen.getByText('3.5 mi')).toBeInTheDocument();
  });

  it('should show correct step for accepted status', () => {
    render(<OrderDetail order={baseOrder} />);
    
    expect(screen.getByText('Navigate to Restaurant')).toBeInTheDocument();
    expect(screen.getByText('Head to Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('Start Navigation')).toBeInTheDocument();
  });

  it('should show correct step for enroute_pickup status', () => {
    const order = { ...baseOrder, status: 'enroute_pickup' as const };
    render(<OrderDetail order={order} />);
    
    expect(screen.getByText('Arriving at Restaurant')).toBeInTheDocument();
    expect(screen.getByText('Mark Picked Up')).toBeInTheDocument();
  });

  it('should show correct step for picked_up status', () => {
    const order = { ...baseOrder, status: 'picked_up' as const };
    render(<OrderDetail order={order} />);
    
    expect(screen.getByText('Navigate to Customer')).toBeInTheDocument();
    expect(screen.getByText('Deliver to John Doe')).toBeInTheDocument();
    expect(screen.getByText('Start Navigation')).toBeInTheDocument();
  });

  it('should show correct step for enroute_dropoff status', () => {
    const order = { ...baseOrder, status: 'enroute_dropoff' as const };
    render(<OrderDetail order={order} />);
    
    expect(screen.getByText('Delivering Order')).toBeInTheDocument();
    expect(screen.getByText('Mark Delivered')).toBeInTheDocument();
  });

  it('should show completion message for delivered status', () => {
    const order = { ...baseOrder, status: 'delivered' as const };
    render(<OrderDetail order={order} />);
    
    expect(screen.getByText('Order Complete')).toBeInTheDocument();
    expect(screen.getByText('Find Next Order')).toBeInTheDocument();
  });

  it('should show pickup and dropoff addresses', () => {
    render(<OrderDetail order={baseOrder} />);
    
    expect(screen.getByText('123 Main St, City, State')).toBeInTheDocument();
    expect(screen.getByText('456 Oak Ave, City, State')).toBeInTheDocument();
    expect(screen.getByText('ETA: 10 min')).toBeInTheDocument();
    expect(screen.getByText('ETA: 15 min')).toBeInTheDocument();
  });

  it('should show call and message buttons', () => {
    render(<OrderDetail order={baseOrder} />);
    
    expect(screen.getByText('Call')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
  });

  it('should show order notes when provided', () => {
    const orderWithNotes = { ...baseOrder, notes: 'Ring doorbell twice' };
    render(<OrderDetail order={orderWithNotes} />);
    
    expect(screen.getByText('Order Notes')).toBeInTheDocument();
    expect(screen.getByText('Ring doorbell twice')).toBeInTheDocument();
  });
});
