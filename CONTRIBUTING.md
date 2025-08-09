# Contributing to In-Car Gig Apps

Thank you for your interest in contributing to the In-Car Gig Apps project! This document provides guidelines for contributing to this Tesla-style interface for gig economy workers.

## 🚗 Project Overview

This project is a prototype React application that demonstrates how gig workers could safely manage delivery orders from multiple platforms (DoorDash, Uber Eats, Instacart) directly from their vehicle interface.

## 🛠 Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/in-car-gig-apps.git
   cd in-car-gig-apps
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## 📝 How to Contribute

### 🐛 Bug Reports

When filing an issue, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser/device information

### ✨ Feature Requests

For new features, please:
- Check existing issues first
- Describe the use case
- Explain why it would benefit gig workers
- Consider safety implications for in-vehicle use

### 🔧 Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation if needed

4. **Test your changes**
   ```bash
   npm test
   npm run build
   ```

5. **Commit with clear messages**
   ```bash
   git commit -m "feat: add voice command for customer messaging"
   ```

6. **Push and create a PR**

## 🎨 Code Style Guidelines

### TypeScript
- Use TypeScript for all new files
- Prefer `type` imports where possible
- Add proper type annotations

### React Components
- Use functional components with hooks
- Follow the existing CSS Modules pattern
- Ensure components are accessible

### Safety First
- All new features must consider driver safety
- Touch targets should be 44px minimum
- Test with "driving mode" enabled
- Voice commands should have clear feedback

### File Organization
```
src/
├── components/     # Reusable UI components
├── routes/        # Main screens/pages  
├── store/         # State management
├── providers/     # API adapters
├── utils/         # Helper functions
├── styles/        # Global styles
└── tests/         # Test files
```

## 🧪 Testing

- Write unit tests for utility functions
- Add component tests for complex UI logic
- Test voice commands and safety features
- Ensure mobile responsiveness

## 🚨 Safety Considerations

This app is designed for in-vehicle use. All contributions must prioritize driver safety:

- **Driving Mode**: When `vehicle.isParked = false`, only large buttons and voice commands should work
- **Touch Targets**: Minimum 44px for accessibility
- **Voice First**: Critical actions should have voice alternatives
- **Clear Feedback**: Visual and audio confirmation for actions
- **Error Handling**: Graceful failure without driver distraction

## 📱 Adding New Gig Providers

To add a new provider (e.g., Grubhub):

1. **Create provider file**
   ```typescript
   // src/providers/grubhub.ts
   class GrubhubProvider implements ProviderAPI {
     // Implement interface methods
   }
   ```

2. **Update types**
   ```typescript
   // src/providers/Provider.ts  
   export type ProviderName = 'doordash' | 'ubereats' | 'instacart' | 'grubhub';
   ```

3. **Register in store**
   ```typescript
   // src/store/useAppStore.ts
   providers: {
     doordash,
     ubereats, 
     instacart,
     grubhub, // Add here
   }
   ```

4. **Add styling**
   ```css
   /* src/styles/theme.css */
   .provider-grubhub {
     background: #ff8000;
     color: white;
   }
   ```

## 🗺 Map Integration

The current app uses a mock SVG map. To integrate real maps:

1. Choose provider (Mapbox, Google Maps, etc.)
2. Replace `MapPanel.tsx` component
3. Add API key management
4. Implement turn-by-turn directions
5. Ensure map works in driving mode

## 🎤 Voice Command Guidelines

When adding new voice commands:

- Keep phrases natural and short
- Handle variations ("accept", "take", "yes")
- Provide clear audio/visual feedback
- Test with background noise
- Gracefully handle recognition errors

## 🔄 Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release PR
4. Tag release after merge
5. GitHub Actions will build and deploy

## 📞 Getting Help

- 📧 Open an issue for questions
- 💬 Join discussions in GitHub Discussions
- 📖 Check the README for setup help

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Annual contributor highlights

Thank you for helping make gig work safer and more efficient! 🚗✨
