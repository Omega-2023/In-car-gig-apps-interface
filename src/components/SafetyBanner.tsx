import { FaExclamationTriangle, FaMicrophone } from 'react-icons/fa';
import { useAppStore } from '../store/useAppStore';
import styles from './SafetyBanner.module.css';

export const SafetyBanner = () => {
  const { vehicle, ui } = useAppStore();

  if (vehicle.isParked) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <FaExclamationTriangle className={styles.icon} />
        <div className={styles.text}>
          <div className={styles.title}>Driving Mode Active</div>
          <div className={styles.subtitle}>
            {ui.voiceEnabled ? (
              <>
                <FaMicrophone className={styles.micIcon} />
                Use voice commands or the "Next Step" button for safety
              </>
            ) : (
              'Voice is disabled. Only the "Next Step" button is available while driving.'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
