export interface VoiceController {
  isSupported: boolean;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  onResult: (callback: (transcript: string, isFinal: boolean) => void) => void;
  onError: (callback: (error: string) => void) => void;
}

class WebSpeechVoiceController implements VoiceController {
  private recognition: any | null = null;
  private resultCallback: ((transcript: string, isFinal: boolean) => void) | null = null;
  private errorCallback: ((error: string) => void) | null = null;
  
  constructor() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
    }
  }

  get isSupported(): boolean {
    return this.recognition !== null;
  }

  get isListening(): boolean {
    return this.recognition !== null && this.recognition.toString() !== '[object SpeechRecognition]';
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      let transcript = '';
      let isFinal = false;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        transcript += result[0].transcript;
        if (result.isFinal) {
          isFinal = true;
        }
      }

      if (this.resultCallback) {
        this.resultCallback(transcript.trim(), isFinal);
      }
    };

    this.recognition.onerror = (event: any) => {
      if (this.errorCallback) {
        this.errorCallback(event.error);
      }
    };

    this.recognition.onend = () => {
      // Auto-restart if needed
    };
  }

  startListening() {
    if (this.recognition) {
      try {
        this.recognition.start();
      } catch (error) {
        if (this.errorCallback) {
          this.errorCallback('Failed to start voice recognition');
        }
      }
    }
  }

  stopListening() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  onResult(callback: (transcript: string, isFinal: boolean) => void) {
    this.resultCallback = callback;
  }

  onError(callback: (error: string) => void) {
    this.errorCallback = callback;
  }
}

export const createVoiceController = (): VoiceController => {
  return new WebSpeechVoiceController();
};

export type VoiceCommand = 
  | 'accept order'
  | 'decline'
  | 'start navigation'
  | 'arrived'
  | 'picked up'
  | 'delivered'
  | 'next step'
  | 'call customer'
  | 'message customer';

export const parseVoiceCommand = (transcript: string): VoiceCommand | null => {
  const text = transcript.toLowerCase().trim();
  
  // Accept variations
  if (text.includes('accept') || text.includes('take') || text.includes('yes')) {
    return 'accept order';
  }
  
  // Decline variations
  if (text.includes('decline') || text.includes('no') || text.includes('skip')) {
    return 'decline';
  }
  
  // Navigation
  if (text.includes('navigate') || text.includes('direction') || text.includes('go')) {
    return 'start navigation';
  }
  
  // Status updates
  if (text.includes('arrived') || text.includes('here')) {
    return 'arrived';
  }
  
  if (text.includes('picked up') || text.includes('pickup') || text.includes('got it')) {
    return 'picked up';
  }
  
  if (text.includes('delivered') || text.includes('complete') || text.includes('done')) {
    return 'delivered';
  }
  
  // Next step
  if (text.includes('next') || text.includes('continue')) {
    return 'next step';
  }
  
  // Communication
  if (text.includes('call') || text.includes('phone')) {
    return 'call customer';
  }
  
  if (text.includes('message') || text.includes('text')) {
    return 'message customer';
  }
  
  return null;
};
