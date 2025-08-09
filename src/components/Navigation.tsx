import { NavLink } from 'react-router-dom';
import { FaList, FaChartLine, FaCog } from 'react-icons/fa';
import { useAppStore } from '../store/useAppStore';
import styles from './Navigation.module.css';

export const Navigation = () => {
  const { orders, vehicle } = useAppStore();
  
  const availableCount = orders.filter(o => o.status === 'available').length;
  const activeCount = orders.filter(o => 
    o.status !== 'available' && o.status !== 'declined' && o.status !== 'delivered'
  ).length;

  const isDisabled = !vehicle.isParked;

  return (
    <nav className={styles.nav}>
      <div className={styles.navItems}>
        <NavLink 
          to="/orders" 
          className={({ isActive }) => 
            `${styles.navItem} ${isActive ? styles.active : ''} ${isDisabled ? styles.disabled : ''}`
          }
        >
          <FaList />
          <span>Orders</span>
          {availableCount > 0 && (
            <span className={styles.badge}>{availableCount}</span>
          )}
        </NavLink>

        <NavLink 
          to="/status" 
          className={({ isActive }) => 
            `${styles.navItem} ${isActive ? styles.active : ''} ${isDisabled ? styles.disabled : ''}`
          }
        >
          <FaChartLine />
          <span>Status</span>
          {activeCount > 0 && (
            <span className={styles.badge}>{activeCount}</span>
          )}
        </NavLink>

        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `${styles.navItem} ${isActive ? styles.active : ''} ${isDisabled ? styles.disabled : ''}`
          }
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>
      </div>

      {isDisabled && (
        <div className={styles.drivingNotice}>
          <div className={styles.noticeText}>
            Limited access while driving
          </div>
        </div>
      )}
    </nav>
  );
};
