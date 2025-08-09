import type { ProviderAPI, Order, OrderStatus } from './Provider';
import mockOrders from '../data/mockOrders.json';

class InstacartProvider implements ProviderAPI {
  name = 'instacart' as const;

  async listAvailable(): Promise<Order[]> {
    await new Promise(resolve => setTimeout(resolve, 150));
    return mockOrders.filter(order => 
      order.provider === 'instacart' && order.status === 'available'
    ) as Order[];
  }

  async accept(orderId: string): Promise<Order> {
    await new Promise(resolve => setTimeout(resolve, 220));
    const order = mockOrders.find(o => o.id === orderId) as Order;
    if (!order) throw new Error('Order not found');
    
    return { ...order, status: 'accepted' };
  }

  async decline(orderId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 110));
    console.log(`Declined Instacart order ${orderId}`);
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<Order> {
    await new Promise(resolve => setTimeout(resolve, 160));
    const order = mockOrders.find(o => o.id === orderId) as Order;
    if (!order) throw new Error('Order not found');
    
    return { ...order, status };
  }
}

export default new InstacartProvider();
