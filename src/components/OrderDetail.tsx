import { FaPhone, FaComment, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { FaLocationArrow } from 'react-icons/fa';
import type { Order, OrderStatus } from '../providers/Provider';
import { useAppStore } from '../store/useAppStore';
import styles from './OrderDetail.module.css';

interface OrderDetailProps {
  order: Order;
}

export const OrderDetail = ({ order }: OrderDetailProps) => {
  const { vehicle, actions } = useAppStore();
  
  const getStepInfo = (status: OrderStatus) => {
    switch (status) {
      case 'accepted':
        return {
          title: 'Navigate to Restaurant',
          subtitle: `Head to ${order.restaurant}`,
          action: 'Start Navigation',
          icon: <FaLocationArrow />
        };
      case 'enroute_pickup':
        return {
          title: 'Arriving at Restaurant',
          subtitle: 'Tap when you arrive and order is ready',
          action: 'Mark Picked Up',
          icon: <FaCheckCircle />
        };
      case 'picked_up':
        return {
          title: 'Navigate to Customer',
          subtitle: `Deliver to ${order.customer}`,
          action: 'Start Navigation',
          icon: <FaLocationArrow />
        };
      case 'enroute_dropoff':
        return {
          title: 'Delivering Order',
          subtitle: 'Tap when order is delivered',
          action: 'Mark Delivered',
          icon: <FaCheckCircle />
        };
      case 'delivered':
        return {
          title: 'Order Complete',
          subtitle: 'Great job! Ready for your next order.',
          action: 'Find Next Order',
          icon: <FaCheckCircle />
        };
      default:
        return {
          title: 'Order Details',
          subtitle: '',
          action: 'Continue',
          icon: <FaCheckCircle />
        };
    }
  };

  const stepInfo = getStepInfo(order.status);
  
  const handleNextStep = async () => {
    if (order.status === 'delivered') {
      // Navigate back to orders list
      actions.setActiveOrder(undefined);
      return;
    }
    await actions.advanceFlow(order.id);
  };

  const handleCall = () => {
    // In a real app, this would initiate a call
    console.log('Calling customer:', order.customer);
  };

  const handleMessage = () => {
    // In a real app, this would open messaging
    console.log('Messaging customer:', order.customer);
  };

  const isActionDisabled = !vehicle.isParked;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.orderInfo}>
          <span className={`provider-badge provider-${order.provider}`}>
            {order.provider}
          </span>
          <h2 className={styles.restaurant}>{order.restaurant}</h2>
          <p className={styles.customer}>
            <FaMapMarkerAlt />
            {order.customer}
          </p>
        </div>
        <div className={styles.payout}>
          <span className={styles.amount}>${order.payoutUsd.toFixed(2)}</span>
          <span className={styles.distance}>{order.distanceMi} mi</span>
        </div>
      </div>

      <div className={styles.step}>
        <div className={styles.stepHeader}>
          <div className={styles.stepIcon}>
            {stepInfo.icon}
          </div>
          <div className={styles.stepText}>
            <h3 className={styles.stepTitle}>{stepInfo.title}</h3>
            <p className={styles.stepSubtitle}>{stepInfo.subtitle}</p>
          </div>
        </div>
      </div>

      <div className={styles.addresses}>
        <div className={styles.address}>
          <div className={styles.addressLabel}>Pickup</div>
          <div className={styles.addressText}>{order.pickupAddress}</div>
          <div className={styles.addressEta}>ETA: {order.pickupEtaMin} min</div>
        </div>
        <div className={styles.address}>
          <div className={styles.addressLabel}>Dropoff</div>
          <div className={styles.addressText}>{order.dropoffAddress}</div>
          <div className={styles.addressEta}>ETA: {order.dropoffEtaMin} min</div>
        </div>
      </div>

      {order.notes && (
        <div className={styles.notes}>
          <div className={styles.notesLabel}>Order Notes</div>
          <div className={styles.notesText}>{order.notes}</div>
        </div>
      )}

      <div className={styles.actions}>
        <div className={styles.secondaryActions}>
          <button 
            className="btn btn-secondary"
            onClick={handleCall}
            disabled={isActionDisabled}
          >
            <FaPhone />
            Call
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleMessage}
            disabled={isActionDisabled}
          >
            <FaComment />
            Message
          </button>
        </div>
        
        <button 
          className="btn btn-primary btn-large"
          onClick={handleNextStep}
        >
          {stepInfo.action}
        </button>
      </div>
    </div>
  );
};
