import type { ProviderAPI, Order, OrderStatus } from './Provider';
import mockOrders from '../data/mockOrders.json';

class DoorDashProvider implements ProviderAPI {
  name = 'doordash' as const;

  async listAvailable(): Promise<Order[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockOrders.filter(order => 
      order.provider === 'doordash' && order.status === 'available'
    ) as Order[];
  }

  async accept(orderId: string): Promise<Order> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const order = mockOrders.find(o => o.id === orderId) as Order;
    if (!order) throw new Error('Order not found');
    
    return { ...order, status: 'accepted' };
  }

  async decline(orderId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
    // In real implementation, would call API to decline
    console.log(`Declined DoorDash order ${orderId}`);
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<Order> {
    await new Promise(resolve => setTimeout(resolve, 150));
    const order = mockOrders.find(o => o.id === orderId) as Order;
    if (!order) throw new Error('Order not found');
    
    return { ...order, status };
  }
}

export default new DoorDashProvider();
