import { FaBatteryThreeQuarters, FaWifi, FaClock } from 'react-icons/fa';
import { useAppStore } from '../store/useAppStore';
import styles from './Header.module.css';

export const Header = () => {
  const { vehicle } = useAppStore();
  
  const formatTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatTemp = (tempC: number) => {
    const tempF = Math.round((tempC * 9/5) + 32);
    return `${tempF}°F`;
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.time}>
          <FaClock />
          <span>{formatTime()}</span>
        </div>
        <div className={styles.temp}>
          {formatTemp(vehicle.outsideTempC)}
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.logo}>
          GigDrive
        </div>
        <div className={styles.status}>
          FSD Ready
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.connectivity}>
          <FaWifi className={styles.connectedIcon} />
          <span>LTE</span>
        </div>
        <div className={styles.battery}>
          <FaBatteryThreeQuarters 
            className={vehicle.batteryPct > 20 ? styles.batteryGood : styles.batteryLow} 
          />
          <span>{vehicle.batteryPct}%</span>
        </div>
      </div>
    </header>
  );
};
