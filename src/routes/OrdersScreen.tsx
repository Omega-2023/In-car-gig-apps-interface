import { AggregatedOrderList } from '../components/AggregatedOrderList';
import { VoiceControls } from '../components/VoiceControls';
import { useAppStore } from '../store/useAppStore';
import styles from './OrdersScreen.module.css';

export const OrdersScreen = () => {
  const { ui } = useAppStore();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Available Orders</h1>
        
        {ui.voiceEnabled && (
          <VoiceControls />
        )}
        
        <AggregatedOrderList />
      </div>
    </div>
  );
};
