import { create } from 'zustand';
import type { Order, ProviderAPI, ProviderName, VehicleState, UIState, OrderStatus } from '../providers/Provider';
import doordash from '../providers/doordash';
import ubereats from '../providers/ubereats';
import instacart from '../providers/instacart';

type AppState = {
  orders: Order[];
  activeOrderId?: string;
  providers: Record<ProviderName, ProviderAPI>;
  vehicle: VehicleState;
  ui: UIState;
  actions: {
    refreshAll(): Promise<void>;
    setVehicle(v: Partial<VehicleState>): void;
    setActiveOrder(id?: string): void;
    acceptOrder(orderId: string): Promise<void>;
    declineOrder(orderId: string): Promise<void>;
    advanceFlow(orderId: string): Promise<void>;
    setError(error?: string): void;
    setTranscript(transcript?: string): void;
    toggleVoice(): void;
  };
};

const getNextStatus = (currentStatus: OrderStatus): OrderStatus => {
  switch (currentStatus) {
    case 'accepted':
      return 'enroute_pickup';
    case 'enroute_pickup':
      return 'picked_up';
    case 'picked_up':
      return 'enroute_dropoff';
    case 'enroute_dropoff':
      return 'delivered';
    default:
      return currentStatus;
  }
};

export const useAppStore = create<AppState>()((set, get) => ({
  orders: [],
  activeOrderId: undefined,
  providers: {
    doordash,
    ubereats,
    instacart,
  },
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
  },
  
  actions: {
    async refreshAll() {
      try {
        set(state => ({ ...state, ui: { ...state.ui, error: undefined } }));
        
        const { providers } = get();
        const allOrders = await Promise.all([
          providers.doordash.listAvailable(),
          providers.ubereats.listAvailable(),
          providers.instacart.listAvailable(),
        ]);
        
        const flatOrders = allOrders.flat();
        
        // Keep existing accepted/in-progress orders and add new available ones
        const currentOrders = get().orders;
        const activeOrders = currentOrders.filter(order => 
          order.status !== 'available' && order.status !== 'declined'
        );
        
        set(state => ({
          ...state,
          orders: [...activeOrders, ...flatOrders],
        }));
      } catch (error) {
        set(state => ({
          ...state,
          ui: { ...state.ui, error: 'Failed to refresh orders' }
        }));
      }
    },

    setVehicle(vehicleUpdate) {
      set(state => ({
        ...state,
        vehicle: { ...state.vehicle, ...vehicleUpdate },
      }));
    },

    setActiveOrder(id) {
      set(state => ({ ...state, activeOrderId: id }));
    },

    async acceptOrder(orderId) {
      try {
        const { orders, providers } = get();
        const order = orders.find(o => o.id === orderId);
        if (!order) throw new Error('Order not found');

        const provider = providers[order.provider];
        const acceptedOrder = await provider.accept(orderId);
        
        set(state => ({
          ...state,
          orders: state.orders.map(o => 
            o.id === orderId ? acceptedOrder : o
          ),
          activeOrderId: orderId,
          ui: { ...state.ui, error: undefined }
        }));
      } catch (error) {
        set(state => ({
          ...state,
          ui: { ...state.ui, error: 'Failed to accept order' }
        }));
      }
    },

    async declineOrder(orderId) {
      try {
        const { orders, providers } = get();
        const order = orders.find(o => o.id === orderId);
        if (!order) throw new Error('Order not found');

        const provider = providers[order.provider];
        await provider.decline(orderId);
        
        set(state => ({
          ...state,
          orders: state.orders.filter(o => o.id !== orderId),
          ui: { ...state.ui, error: undefined }
        }));
      } catch (error) {
        set(state => ({
          ...state,
          ui: { ...state.ui, error: 'Failed to decline order' }
        }));
      }
    },

    async advanceFlow(orderId) {
      try {
        const { orders, providers } = get();
        const order = orders.find(o => o.id === orderId);
        if (!order) throw new Error('Order not found');

        const nextStatus = getNextStatus(order.status);
        if (nextStatus === order.status) return; // No advancement possible

        const provider = providers[order.provider];
        const updatedOrder = await provider.updateStatus(orderId, nextStatus);
        
        set(state => ({
          ...state,
          orders: state.orders.map(o => 
            o.id === orderId ? updatedOrder : o
          ),
          ui: { ...state.ui, error: undefined }
        }));

        // Clear active order if delivered
        if (nextStatus === 'delivered') {
          set(state => ({ ...state, activeOrderId: undefined }));
        }
      } catch (error) {
        set(state => ({
          ...state,
          ui: { ...state.ui, error: 'Failed to update order status' }
        }));
      }
    },

    setError(error) {
      set(state => ({
        ...state,
        ui: { ...state.ui, error }
      }));
    },

    setTranscript(transcript) {
      set(state => ({
        ...state,
        ui: { ...state.ui, transcript }
      }));
    },

    toggleVoice() {
      set(state => ({
        ...state,
        ui: { ...state.ui, voiceEnabled: !state.ui.voiceEnabled }
      }));
    },
  },
}));
