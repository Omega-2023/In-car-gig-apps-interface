import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../store/useAppStore';

describe('App Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAppStore.setState({
      orders: [],
      activeOrderId: undefined,
      vehicle: {
        speedKph: 0,
        batteryPct: 78,
        isParked: true,
        outsideTempC: 22,
      },
      ui: {
        voiceEnabled: true,
        error: undefined,
        transcript: undefined,
      }
    });
  });

  it('should initialize with default state', () => {
    const state = useAppStore.getState();
    
    expect(state.orders).toEqual([]);
    expect(state.activeOrderId).toBeUndefined();
    expect(state.vehicle.isParked).toBe(true);
    expect(state.vehicle.batteryPct).toBe(78);
    expect(state.ui.voiceEnabled).toBe(true);
  });

  it('should set vehicle state correctly', () => {
    const { actions } = useAppStore.getState();
    
    actions.setVehicle({ speedKph: 50, isParked: false });
    
    const state = useAppStore.getState();
    expect(state.vehicle.speedKph).toBe(50);
    expect(state.vehicle.isParked).toBe(false);
    expect(state.vehicle.batteryPct).toBe(78); // unchanged
  });

  it('should toggle voice controls', () => {
    const { actions } = useAppStore.getState();
    
    expect(useAppStore.getState().ui.voiceEnabled).toBe(true);
    
    actions.toggleVoice();
    expect(useAppStore.getState().ui.voiceEnabled).toBe(false);
    
    actions.toggleVoice();
    expect(useAppStore.getState().ui.voiceEnabled).toBe(true);
  });

  it('should set error messages', () => {
    const { actions } = useAppStore.getState();
    
    actions.setError('Test error');
    expect(useAppStore.getState().ui.error).toBe('Test error');
    
    actions.setError(undefined);
    expect(useAppStore.getState().ui.error).toBeUndefined();
  });

  it('should calculate score correctly for orders', () => {
    const mockOrder = {
      id: 'test',
      provider: 'doordash' as const,
      restaurant: 'Test Restaurant',
      customer: 'Test Customer',
      pickupEtaMin: 10,
      dropoffEtaMin: 15,
      distanceMi: 5.0,
      payoutUsd: 15.0,
      status: 'available' as const,
      pickupAddress: 'Test Pickup',
      dropoffAddress: 'Test Dropoff',
    };

    const score = mockOrder.payoutUsd / mockOrder.distanceMi;
    expect(score).toBe(3.0); // $15 / 5 miles = $3/mile
  });
});
