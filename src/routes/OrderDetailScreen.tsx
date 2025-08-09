import { useParams, Navigate } from 'react-router-dom';
import { OrderDetail } from '../components/OrderDetail';
import { MapPanel } from '../components/MapPanel';
import { VoiceControls } from '../components/VoiceControls';
import { useAppStore } from '../store/useAppStore';
import styles from './OrderDetailScreen.module.css';

export const OrderDetailScreen = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders, ui } = useAppStore();
  
  const order = orders.find(o => o.id === orderId);
  
  if (!order) {
    return <Navigate to="/orders" replace />;
  }

  const shouldShowRoute = order.status !== 'available' && order.status !== 'delivered';

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <OrderDetail order={order} />
        
        {ui.voiceEnabled && (
          <VoiceControls />
        )}
      </div>
      
      <div className={styles.rightPanel}>
        <MapPanel order={order} showRoute={shouldShowRoute} />
      </div>
    </div>
  );
};
