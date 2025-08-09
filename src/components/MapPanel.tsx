import { FaMapMarkerAlt, FaRoute, FaFlag } from 'react-icons/fa';
import type { Order } from '../providers/Provider';
import styles from './MapPanel.module.css';

interface MapPanelProps {
  order?: Order;
  showRoute?: boolean;
}

export const MapPanel = ({ order, showRoute = false }: MapPanelProps) => {
  // Mock map with simple visualization
  const mapImageUrl = 'data:image/svg+xml;base64,' + btoa(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bg)"/>
      
      <!-- Streets -->
      <line x1="0" y1="100" x2="400" y2="100" stroke="#404040" stroke-width="2"/>
      <line x1="0" y1="150" x2="400" y2="150" stroke="#404040" stroke-width="2"/>
      <line x1="0" y1="200" x2="400" y2="200" stroke="#404040" stroke-width="2"/>
      <line x1="100" y1="0" x2="100" y2="300" stroke="#404040" stroke-width="2"/>
      <line x1="200" y1="0" x2="200" y2="300" stroke="#404040" stroke-width="2"/>
      <line x1="300" y1="0" x2="300" y2="300" stroke="#404040" stroke-width="2"/>
      
      <!-- Current location (center) -->
      <circle cx="200" cy="150" r="8" fill="#00d4ff" stroke="#ffffff" stroke-width="2"/>
      
      ${order ? `
        <!-- Pickup location -->
        <circle cx="120" cy="120" r="6" fill="#00ff88" stroke="#ffffff" stroke-width="2"/>
        
        <!-- Dropoff location -->
        <circle cx="280" cy="180" r="6" fill="#ff4444" stroke="#ffffff" stroke-width="2"/>
        
        ${showRoute ? `
          <!-- Route line -->
          <polyline points="200,150 120,120 280,180" stroke="#00d4ff" stroke-width="3" fill="none" stroke-dasharray="5,5">
            <animate attributeName="stroke-dashoffset" values="0;-10" dur="1s" repeatCount="indefinite"/>
          </polyline>
        ` : ''}
      ` : ''}
    </svg>
  `);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <FaRoute />
          Map View
        </h3>
        {order && (
          <div className={styles.distance}>
            {order.distanceMi.toFixed(1)} mi
          </div>
        )}
      </div>

      <div className={styles.mapContainer}>
        <img 
          src={mapImageUrl} 
          alt="Navigation Map" 
          className={styles.mapImage}
        />
        
        {order && (
          <div className={styles.overlay}>
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <div className={`${styles.dot} ${styles.current}`}></div>
                <span>Your Location</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.dot} ${styles.pickup}`}></div>
                <span>Pickup</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.dot} ${styles.dropoff}`}></div>
                <span>Dropoff</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {order && (
        <div className={styles.addresses}>
          <div className={styles.address}>
            <FaMapMarkerAlt className={styles.pickupIcon} />
            <div>
              <div className={styles.addressLabel}>Pickup</div>
              <div className={styles.addressText}>{order.pickupAddress}</div>
            </div>
          </div>
          <div className={styles.address}>
            <FaFlag className={styles.dropoffIcon} />
            <div>
              <div className={styles.addressLabel}>Dropoff</div>
              <div className={styles.addressText}>{order.dropoffAddress}</div>
            </div>
          </div>
        </div>
      )}

      {!order && (
        <div className={styles.noOrder}>
          <FaMapMarkerAlt className={styles.noOrderIcon} />
          <p>Select an order to view route</p>
        </div>
      )}
    </div>
  );
};
