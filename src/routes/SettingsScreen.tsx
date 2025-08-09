import { useState } from 'react';
import { FaMicrophone, FaCar, FaSlidersH, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { useAppStore } from '../store/useAppStore';
import { formatSpeed, formatTemperature } from '../utils/format';
import styles from './SettingsScreen.module.css';

export const SettingsScreen = () => {
  const { vehicle, ui, actions } = useAppStore();
  const [tempSpeed, setTempSpeed] = useState(vehicle.speedKph);

  const handleSpeedChange = (newSpeed: number) => {
    setTempSpeed(newSpeed);
    actions.setVehicle({ 
      speedKph: newSpeed,
      isParked: newSpeed === 0
    });
  };

  const handleBatteryChange = (newBattery: number) => {
    actions.setVehicle({ batteryPct: newBattery });
  };

  const handleTempChange = (newTemp: number) => {
    actions.setVehicle({ outsideTempC: newTemp });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      
      <div className={styles.grid}>
        {/* Voice Settings */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <FaMicrophone />
            Voice Controls
          </h2>
          <div className={styles.settingGroup}>
            <div className={styles.setting}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Voice Recognition</div>
                <div className={styles.settingDescription}>
                  Enable voice commands for hands-free operation
                </div>
              </div>
              <button
                className={`${styles.toggle} ${ui.voiceEnabled ? styles.toggleOn : styles.toggleOff}`}
                onClick={actions.toggleVoice}
              >
                {ui.voiceEnabled ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
            
            <div className={styles.voiceCommands}>
              <div className={styles.commandsTitle}>Available Commands:</div>
              <div className={styles.commandsList}>
                <span>"Accept order"</span>
                <span>"Decline"</span>
                <span>"Next step"</span>
                <span>"Arrived"</span>
                <span>"Picked up"</span>
                <span>"Delivered"</span>
                <span>"Call customer"</span>
                <span>"Message customer"</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Simulation */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <FaCar />
            Vehicle Simulation
          </h2>
          <div className={styles.settingGroup}>
            <div className={styles.setting}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Vehicle Speed</div>
                <div className={styles.settingDescription}>
                  {formatSpeed(tempSpeed)} • {vehicle.isParked ? 'Parked' : 'Driving'}
                </div>
              </div>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={tempSpeed}
                  onChange={(e) => handleSpeedChange(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderLabels}>
                  <span>Parked</span>
                  <span>Driving</span>
                </div>
              </div>
            </div>

            <div className={styles.setting}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Battery Level</div>
                <div className={styles.settingDescription}>
                  {vehicle.batteryPct}% • ~{Math.round((vehicle.batteryPct / 100) * 300)} mi range
                </div>
              </div>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={vehicle.batteryPct}
                  onChange={(e) => handleBatteryChange(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderLabels}>
                  <span>5%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <div className={styles.setting}>
              <div className={styles.settingInfo}>
                <div className={styles.settingLabel}>Outside Temperature</div>
                <div className={styles.settingDescription}>
                  {formatTemperature(vehicle.outsideTempC)}
                </div>
              </div>
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  min="-10"
                  max="40"
                  value={vehicle.outsideTempC}
                  onChange={(e) => handleTempChange(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderLabels}>
                  <span>14°F</span>
                  <span>104°F</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Features */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <FaSlidersH />
            Safety Features
          </h2>
          <div className={styles.settingGroup}>
            <div className={styles.safetyInfo}>
              <div className={styles.safetyTitle}>Driving Mode Protection</div>
              <div className={styles.safetyDescription}>
                When the vehicle is moving, the following safety measures are active:
              </div>
              <ul className={styles.safetyList}>
                <li>Text inputs are disabled</li>
                <li>Small touch targets are locked</li>
                <li>Only voice commands and "Next Step" button are available</li>
                <li>Safety banner is displayed</li>
              </ul>
            </div>
            
            <div className={styles.safetyStatus}>
              <div className={styles.statusItem}>
                <span>Current Status:</span>
                <span className={`${styles.statusValue} ${vehicle.isParked ? styles.safe : styles.warning}`}>
                  {vehicle.isParked ? 'Safe Mode (Parked)' : 'Driving Mode (Active)'}
                </span>
              </div>
              <div className={styles.statusItem}>
                <span>Voice Commands:</span>
                <span className={`${styles.statusValue} ${ui.voiceEnabled ? styles.enabled : styles.disabled}`}>
                  {ui.voiceEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Scenarios */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Demo Scenarios</h2>
          <div className={styles.settingGroup}>
            <div className={styles.demoDescription}>
              Try these scenarios to test the app:
            </div>
            <div className={styles.demoButtons}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  handleSpeedChange(0);
                  actions.setVehicle({ batteryPct: 85 });
                }}
              >
                Parked & Ready
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  handleSpeedChange(45);
                  actions.setVehicle({ batteryPct: 65 });
                }}
              >
                Driving Scenario
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  actions.setVehicle({ batteryPct: 15 });
                }}
              >
                Low Battery Alert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
