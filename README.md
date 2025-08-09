# 🚗 In-Car Gig Apps Interface

[![CI/CD Pipeline](https://github.com/yourusername/in-car-gig-apps/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/yourusername/in-car-gig-apps/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7+-646CFF.svg)](https://vitejs.dev/)

A Tesla-style React app prototype for managing gig-economy orders (DoorDash, Uber Eats, Instacart) safely from a vehicle interface.

> **⚠️ Safety First**: This prototype prioritizes driver safety with voice-first controls and driving mode restrictions.

## 📸 Screenshots

*Coming soon - Upload screenshots showing the interface in action*

<!-- 
### Main Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Driving Mode Safety
![Safety Mode](docs/screenshots/driving-mode.png)

### Voice Controls
![Voice Controls](docs/screenshots/voice-controls.png)
-->

## 🚗 Features

### Core Functionality
- **Unified Dashboard**: Aggregates orders from multiple gig providers
- **Safety-First Design**: Locks unsafe actions when vehicle is moving
- **Voice Controls**: Hands-free operation using Web Speech API
- **Tesla-Style UI**: Dark theme with large touch targets
- **Step-by-Step Flow**: Accept → Navigate → Pickup → Deliver

### Safety Model
- **Driving Mode**: When `vehicle_speed > 0`, only voice commands and "Next Step" button are available
- **Parked Mode**: Full UI functionality enabled
- **Visual Indicators**: Safety banner and locked UI elements
- **Voice Fallback**: Button-based fallback when voice is unavailable

### Supported Voice Commands
- "Accept order" - Accept the best available order
- "Decline" - Decline current order
- "Next step" - Advance to next phase
- "Arrived" - Mark arrival at location
- "Picked up" - Mark order as picked up
- "Delivered" - Mark order as delivered
- "Call customer" - Initiate customer call
- "Message customer" - Open messaging interface

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **State**: Zustand
- **Routing**: React Router
- **Styling**: CSS Modules with Tesla-inspired dark theme
- **Icons**: React Icons
- **Voice**: Web Speech API
- **Testing**: Vitest + React Testing Library

## 🚀 Quick Start

### 📱 Live Demo
🌟 **[Try the Live Demo](https://in-car-gig-apps.vercel.app)** *(Deploy your own to add this link)*

### 💻 Local Development

```bash
# Clone the repository  
git clone https://github.com/yourusername/in-car-gig-apps.git
cd in-car-gig-apps

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

Visit http://localhost:5173 to see the app.

### 🎯 Quick Demo Steps
1. **Browse Orders**: See the aggregated feed from multiple providers
2. **Test Voice**: Click the microphone and say "Accept order"
3. **Driving Mode**: Go to Settings → Set speed > 0 to see safety lockouts
4. **Complete Flow**: Accept an order and step through to delivery

## 📱 Demo Scenarios

### Scenario 1: Parked & Ready
```bash
# In Settings, set:
- Vehicle Speed: 0 (Parked)
- Voice: Enabled
- Battery: 85%

# Try:
1. Browse available orders
2. Accept an order by voice: "Accept order"
3. Step through the delivery flow
```

### Scenario 2: Driving Mode
```bash
# In Settings, set:
- Vehicle Speed: 45 mph
- Voice: Enabled

# Observe:
1. Safety banner appears
2. UI elements are locked
3. Only voice commands work
4. "Next Step" button remains available
```

### Scenario 3: Voice Disabled
```bash
# In Settings:
- Turn off voice recognition
- Set vehicle to driving

# Result:
- Only "Next Step" button works while driving
- Safety banner shows voice unavailable message
```

## 🏗 Project Structure

```
src/
├── components/           # UI components
│   ├── Header.tsx       # Battery, time, connectivity
│   ├── SafetyBanner.tsx # Driving mode warnings
│   ├── OrderCard.tsx    # Order summary cards
│   ├── OrderDetail.tsx  # Step-by-step order flow
│   ├── AggregatedOrderList.tsx # Multi-provider feed
│   ├── MapPanel.tsx     # Mock navigation map
│   ├── VoiceControls.tsx # Speech recognition
│   └── Navigation.tsx   # Side navigation
├── routes/              # Main screens
│   ├── OrdersScreen.tsx
│   ├── OrderDetailScreen.tsx
│   ├── StatusScreen.tsx
│   └── SettingsScreen.tsx
├── store/               # Zustand state management
│   └── useAppStore.ts
├── providers/           # Gig provider adapters
│   ├── Provider.ts      # Shared interface
│   ├── doordash.ts
│   ├── ubereats.ts
│   └── instacart.ts
├── utils/               # Utilities
│   ├── voice.ts         # Speech API wrapper
│   └── format.ts        # Display formatters
├── data/
│   └── mockOrders.json  # Sample order data
├── styles/
│   └── theme.css        # Tesla-style design system
└── tests/               # Test suites
```

## 🎯 Key Design Decisions

### Safety Model
The app implements a strict safety model based on vehicle state:
- **Speed > 0**: Only large buttons and voice commands work
- **Speed = 0**: Full touch interface enabled
- Clear visual feedback for locked states

### Provider Abstraction
Each gig provider implements a shared interface:
```typescript
interface ProviderAPI {
  name: ProviderName;
  listAvailable(): Promise<Order[]>;
  accept(orderId: string): Promise<Order>;
  decline(orderId: string): Promise<void>;
  updateStatus(orderId: string, status: OrderStatus): Promise<Order>;
}
```

### State Machine
Orders flow through clear states:
`available` → `accepted` → `enroute_pickup` → `picked_up` → `enroute_dropoff` → `delivered`

### Voice Integration
- Uses Web Speech API with graceful fallbacks
- Commands mapped to common driver actions
- Visual feedback for recognition status

## 🔧 Adding Real Providers

To integrate with actual gig APIs:

1. **Implement Provider Interface**:
```typescript
// src/providers/newprovider.ts
class NewProviderAPI implements ProviderAPI {
  async listAvailable() {
    const response = await fetch('/api/newprovider/orders');
    return response.json();
  }
  // ... implement other methods
}
```

2. **Register Provider**:
```typescript
// src/store/useAppStore.ts
providers: {
  doordash,
  ubereats,
  instacart,
  newprovider, // Add here
}
```

3. **Update Types**:
```typescript
// src/providers/Provider.ts
export type ProviderName = 'doordash' | 'ubereats' | 'instacart' | 'newprovider';
```

## 🗺 Map Integration

Currently uses a mock SVG map. To add real maps:

1. **Install Map SDK** (e.g., Mapbox):
```bash
npm install mapbox-gl
```

2. **Replace MapPanel.tsx**:
```typescript
import mapboxgl from 'mapbox-gl';
// Implement real map with routing
```

3. **Add Navigation**:
- Integrate with vehicle navigation system
- Real-time traffic updates
- Turn-by-turn directions

## ⚡ Performance Considerations

- **Lazy Loading**: Routes are code-split
- **Optimistic Updates**: UI updates before API confirmation
- **Efficient Re-renders**: Zustand minimizes unnecessary updates
- **Touch Targets**: 44px minimum for accessibility

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test OrderCard.test.tsx

# Run tests with UI
npm run test:ui

# Coverage report
npm test -- --coverage
```

Test categories:
- **Unit Tests**: Store logic, utility functions
- **Component Tests**: UI behavior, prop handling
- **Safety Tests**: Driving mode restrictions
- **Integration Tests**: End-to-end flows

## 🎨 Design System

The app uses a Tesla-inspired design system:

- **Colors**: Dark theme with accent blues/greens
- **Typography**: SF Pro Display font family
- **Spacing**: 4px base unit scale
- **Touch Targets**: 44px+ for mobile accessibility
- **Animations**: Subtle transitions and micro-interactions

## 📝 License

MIT License - feel free to use this prototype as a starting point for your own in-vehicle interfaces.

---

**Note**: This is a prototype for demonstration purposes. Real implementations should include additional safety testing, vehicle integration APIs, and compliance with automotive UI standards.