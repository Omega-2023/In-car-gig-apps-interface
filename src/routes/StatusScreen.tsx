import { FaBatteryThreeQuarters, FaRoute, FaClock, FaDollarSign } from 'react-icons/fa';
import { useAppStore } from '../store/useAppStore';
import { formatTemperature, formatSpeed } from '../utils/format';
import styles from './StatusScreen.module.css';

export const StatusScreen = () => {
  const { orders, vehicle, activeOrderId } = useAppStore();
  
  const activeOrder = activeOrderId ? orders.find(o => o.id === activeOrderId) : null;
  const acceptedOrders = orders.filter(o => o.status !== 'available' && o.status !== 'declined');
  const totalEarnings = acceptedOrders
    .filter(o => o.status === 'delivered')
    .reduce((sum, order) => sum + order.payoutUsd, 0);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Navigate to pickup';
      case 'enroute_pickup':
        return 'Arriving at restaurant';
      case 'picked_up':
        return 'Navigate to customer';
      case 'enroute_dropoff':
        return 'Delivering order';
      case 'delivered':
        return 'Order complete';
      default:
        return 'Unknown status';
    }
  };

  // Mock range calculation based on battery
  const estimatedRange = Math.round((vehicle.batteryPct / 100) * 300);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Driver Status</h1>
      
      <div className={styles.grid}>
        {/* Vehicle Status */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <FaBatteryThreeQuarters />
            Vehicle Status
          </h2>
          <div className={styles.metrics}>
            <div className={styles.metric}>
              <span className={styles.label}>Battery</span>
              <span className={`${styles.value} ${vehicle.batteryPct > 20 ? styles.good : styles.warning}`}>
                {vehicle.batteryPct}%
              </span>
            </div>
            <div className={styles.metric}>
              <span className={styles.label}>Range</span>
              <span className={styles.value}>{estimatedRange} mi</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.label}>Speed</span>
              <span className={styles.value}>
                {formatSpeed(vehicle.speedKph)}
              </span>
            </div>
            <div className={styles.metric}>
              <span className={styles.label}>Outside Temp</span>
              <span className={styles.value}>
                {formatTemperature(vehicle.outsideTempC)}
              </span>
            </div>
            <div className={styles.metric}>
              <span className={styles.label}>Status</span>
              <span className={`${styles.value} ${vehicle.isParked ? styles.good : styles.warning}`}>
                {vehicle.isParked ? 'Parked' : 'Driving'}
              </span>
            </div>
          </div>
        </div>

        {/* Current Order */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <FaRoute />
            Current Order
          </h2>
          {activeOrder ? (
            <div className={styles.orderInfo}>
              <div className={styles.orderHeader}>
                <span className={`provider-badge provider-${activeOrder.provider}`}>
                  {activeOrder.provider}
                </span>
                <span className={styles.orderPayout}>
                  ${activeOrder.payoutUsd.toFixed(2)}
                </span>
              </div>
              <div className={styles.orderDetails}>
                <div className={styles.restaurant}>{activeOrder.restaurant}</div>
                <div className={styles.customer}>→ {activeOrder.customer}</div>
                <div className={styles.status}>
                  {getStatusText(activeOrder.status)}
                </div>
              </div>
              <div className={styles.orderMetrics}>
                <div className={styles.orderMetric}>
                  <FaRoute />
                  <span>{activeOrder.distanceMi} mi</span>
                </div>
                <div className={styles.orderMetric}>
                  <FaClock />
                  <span>{activeOrder.pickupEtaMin + activeOrder.dropoffEtaMin} min</span>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.noOrder}>
              <p>No active order</p>
              <p className={styles.noOrderSubtext}>
                Accept an order to see it here
              </p>
            </div>
          )}
        </div>

        {/* Earnings Summary */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <FaDollarSign />
            Today's Earnings
          </h2>
          <div className={styles.earnings}>
            <div className={styles.totalEarnings}>
              ${totalEarnings.toFixed(2)}
            </div>
            <div className={styles.earningsBreakdown}>
              <div className={styles.earningsMetric}>
                <span className={styles.label}>Completed Orders</span>
                <span className={styles.value}>
                  {orders.filter(o => o.status === 'delivered').length}
                </span>
              </div>
              <div className={styles.earningsMetric}>
                <span className={styles.label}>Active Orders</span>
                <span className={styles.value}>
                  {orders.filter(o => o.status !== 'available' && o.status !== 'declined' && o.status !== 'delivered').length}
                </span>
              </div>
              <div className={styles.earningsMetric}>
                <span className={styles.label}>Available Orders</span>
                <span className={styles.value}>
                  {orders.filter(o => o.status === 'available').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
