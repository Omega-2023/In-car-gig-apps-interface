import { FaMapMarkerAlt, FaClock, FaDollarSign, FaRoute } from 'react-icons/fa';
import type { Order } from '../providers/Provider';
import { useAppStore } from '../store/useAppStore';
import styles from './OrderCard.module.css';

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
  showActions?: boolean;
}

export const OrderCard = ({ order, onClick, showActions = false }: OrderCardProps) => {
  const { vehicle, actions } = useAppStore();
  
  const score = (order.payoutUsd / order.distanceMi).toFixed(2);
  const totalTime = order.pickupEtaMin + order.dropoffEtaMin;
  
  const getProviderClass = (provider: string) => {
    return `provider-${provider}`;
  };

  const handleAccept = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await actions.acceptOrder(order.id);
  };

  const handleDecline = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await actions.declineOrder(order.id);
  };

  const isActionDisabled = !vehicle.isParked && showActions;

  return (
    <div 
      className={`${styles.card} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
    >
      <div className={styles.header}>
        <div className={styles.providerInfo}>
          <span className={`provider-badge ${getProviderClass(order.provider)}`}>
            {order.provider}
          </span>
          <span className={styles.restaurant}>{order.restaurant}</span>
        </div>
        <div className={styles.score}>
          <span className={styles.scoreValue}>${score}/mi</span>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.location}>
          <FaMapMarkerAlt />
          <span>{order.customer}</span>
        </div>
        
        <div className={styles.metrics}>
          <div className={styles.metric}>
            <FaDollarSign />
            <span>${order.payoutUsd.toFixed(2)}</span>
          </div>
          <div className={styles.metric}>
            <FaRoute />
            <span>{order.distanceMi} mi</span>
          </div>
          <div className={styles.metric}>
            <FaClock />
            <span>{totalTime} min</span>
          </div>
        </div>
      </div>

      {order.notes && (
        <div className={styles.notes}>
          {order.notes}
        </div>
      )}

      {showActions && order.status === 'available' && (
        <div className={styles.actions}>
          <button 
            className="btn btn-error"
            onClick={handleDecline}
            disabled={isActionDisabled}
          >
            Decline
          </button>
          <button 
            className="btn btn-success btn-large"
            onClick={handleAccept}
            disabled={isActionDisabled}
          >
            Accept ${order.payoutUsd.toFixed(2)}
          </button>
        </div>
      )}
    </div>
  );
};
