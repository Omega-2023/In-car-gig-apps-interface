import type { ProviderAPI, Order, OrderStatus } from './Provider';
import mockOrders from '../data/mockOrders.json';

class UberEatsProvider implements ProviderAPI {
  name = 'ubereats' as const;

  async listAvailable(): Promise<Order[]> {
    await new Promise(resolve => setTimeout(resolve, 120));
    return mockOrders.filter(order => 
      order.provider === 'ubereats' && order.status === 'available'
    ) as Order[];
  }

  async accept(orderId: string): Promise<Order> {
    await new Promise(resolve => setTimeout(resolve, 180));
    const order = mockOrders.find(o => o.id === orderId) as Order;
    if (!order) throw new Error('Order not found');
    
    return { ...order, status: 'accepted' };
  }

  async decline(orderId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 90));
    console.log(`Declined Uber Eats order ${orderId}`);
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<Order> {
    await new Promise(resolve => setTimeout(resolve, 140));
    const order = mockOrders.find(o => o.id === orderId) as Order;
    if (!order) throw new Error('Order not found');
    
    return { ...order, status };
  }
}

export default new UberEatsProvider();
