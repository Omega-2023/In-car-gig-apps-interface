import { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp } from 'react-icons/fa';
import { useAppStore } from '../store/useAppStore';
import { createVoiceController, parseVoiceCommand } from '../utils/voice';
import type { VoiceCommand } from '../utils/voice';
import styles from './VoiceControls.module.css';

export const VoiceControls = () => {
  const { ui, vehicle, orders, activeOrderId, actions } = useAppStore();
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');
  const voiceController = useRef(createVoiceController());

  useEffect(() => {
    const controller = voiceController.current;
    
    controller.onResult((transcript, isFinal) => {
      actions.setTranscript(transcript);
      
      if (isFinal) {
        const command = parseVoiceCommand(transcript);
        if (command) {
          handleVoiceCommand(command);
          setLastCommand(transcript);
        }
        // Clear transcript after processing
        setTimeout(() => actions.setTranscript(undefined), 2000);
      }
    });

    controller.onError((error) => {
      actions.setError(`Voice error: ${error}`);
      setIsListening(false);
    });

    return () => {
      controller.stopListening();
    };
  }, [actions]);

  const handleVoiceCommand = async (command: VoiceCommand) => {
    try {
      const activeOrder = activeOrderId ? orders.find(o => o.id === activeOrderId) : null;
      
      switch (command) {
        case 'accept order':
          // Find the best available order and accept it
          const availableOrders = orders.filter(o => o.status === 'available');
          if (availableOrders.length > 0) {
            const bestOrder = availableOrders.sort((a, b) => 
              (b.payoutUsd / b.distanceMi) - (a.payoutUsd / a.distanceMi)
            )[0];
            await actions.acceptOrder(bestOrder.id);
          }
          break;
          
        case 'decline':
          if (activeOrder && activeOrder.status === 'available') {
            await actions.declineOrder(activeOrder.id);
          }
          break;
          
        case 'next step':
        case 'start navigation':
        case 'arrived':
        case 'picked up':
        case 'delivered':
          if (activeOrder) {
            await actions.advanceFlow(activeOrder.id);
          }
          break;
          
        case 'call customer':
          if (activeOrder) {
            console.log('Voice command: Calling customer');
            // In real app, would initiate call
          }
          break;
          
        case 'message customer':
          if (activeOrder) {
            console.log('Voice command: Messaging customer');
            // In real app, would open message interface
          }
          break;
      }
    } catch (error) {
      actions.setError('Failed to execute voice command');
    }
  };

  const toggleListening = () => {
    if (isListening) {
      voiceController.current.stopListening();
      setIsListening(false);
    } else {
      voiceController.current.startListening();
      setIsListening(true);
    }
  };

  const isVoiceAvailable = ui.voiceEnabled && voiceController.current.isSupported;

  if (!isVoiceAvailable) {
    return (
      <div className={styles.unavailable}>
        <FaMicrophoneSlash />
        <span>Voice controls unavailable</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <button
          className={`${styles.micButton} ${isListening ? styles.listening : ''}`}
          onClick={toggleListening}
          disabled={!vehicle.isParked && !isListening}
        >
          {isListening ? <FaVolumeUp /> : <FaMicrophone />}
          <span>{isListening ? 'Listening...' : 'Voice'}</span>
        </button>
        
        <button
          className="btn btn-secondary"
          onClick={actions.toggleVoice}
        >
          {ui.voiceEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>
      </div>

      {ui.transcript && (
        <div className={styles.transcript}>
          <div className={styles.transcriptLabel}>Listening:</div>
          <div className={styles.transcriptText}>"{ui.transcript}"</div>
        </div>
      )}

      {lastCommand && (
        <div className={styles.lastCommand}>
          <div className={styles.commandLabel}>Last command:</div>
          <div className={styles.commandText}>"{lastCommand}"</div>
        </div>
      )}

      <div className={styles.hints}>
        <div className={styles.hintsTitle}>Voice Commands:</div>
        <div className={styles.hintsList}>
          <span>"Accept order"</span>
          <span>"Decline"</span>
          <span>"Next step"</span>
          <span>"Arrived"</span>
          <span>"Picked up"</span>
          <span>"Delivered"</span>
          <span>"Call customer"</span>
        </div>
      </div>
    </div>
  );
};
