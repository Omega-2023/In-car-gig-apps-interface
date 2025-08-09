export type ProviderName = 'doordash' | 'ubereats' | 'instacart';

export type OrderStatus = 
  | 'available' 
  | 'accepted' 
  | 'enroute_pickup' 
  | 'picked_up' 
  | 'enroute_dropoff' 
  | 'delivered' 
  | 'declined';

export type Order = {
  id: string;
  provider: ProviderName;
  restaurant: string;
  customer: string;
  pickupEtaMin: number;
  dropoffEtaMin: number;
  distanceMi: number;
  payoutUsd: number;
  notes?: string;
  status: OrderStatus;
  pickupAddress: string;
  dropoffAddress: string;
};

export interface ProviderAPI {
  name: ProviderName;
  listAvailable(): Promise<Order[]>;
  accept(orderId: string): Promise<Order>;
  decline(orderId: string): Promise<void>;
  updateStatus(orderId: string, status: OrderStatus): Promise<Order>;
}

export type VehicleState = { 
  speedKph: number; 
  batteryPct: number; 
  isParked: boolean;
  outsideTempC: number;
};

export type UIState = { 
  voiceEnabled: boolean; 
  error?: string;
  transcript?: string;
};
