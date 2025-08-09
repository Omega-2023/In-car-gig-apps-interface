## 🚗 In-Car Gig Apps - Pull Request

### 📝 Description
<!-- Briefly describe what this PR accomplishes -->

### 🎯 Type of Change
<!-- Mark the relevant option with an [x] -->
- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📖 Documentation update
- [ ] 🎨 Style/formatting changes
- [ ] ♻️ Code refactoring
- [ ] ⚡ Performance improvement
- [ ] 🧪 Test improvements

### 🛡️ Safety Considerations
<!-- This app is designed for in-vehicle use. Please confirm: -->
- [ ] Changes maintain large touch targets (44px minimum)
- [ ] New features work properly in driving mode (when `isParked = false`)
- [ ] Voice commands have been tested (if applicable)
- [ ] UI changes don't introduce driver distraction
- [ ] Error states are handled gracefully

### 🧪 Testing
<!-- Mark completed testing with [x] -->
- [ ] Unit tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] Linter passes (`npm run lint`)
- [ ] Manual testing in browser
- [ ] Tested with voice controls (if applicable)
- [ ] Tested driving mode behavior (if applicable)
- [ ] Responsive design tested on mobile

### 📱 Screenshots/Demo
<!-- If this changes the UI, please include screenshots or a GIF -->

### 🔗 Related Issues
<!-- Link any related issues -->
Fixes #(issue number)

### 🧩 Components Changed
<!-- List the main components/files modified -->
- [ ] Provider APIs (`src/providers/`)
- [ ] UI Components (`src/components/`)
- [ ] Routes/Screens (`src/routes/`)
- [ ] State Management (`src/store/`)
- [ ] Voice Controls (`src/utils/voice.ts`)
- [ ] Styling (`src/styles/`)
- [ ] Tests (`src/tests/`)
- [ ] Documentation

### 🎤 Voice Commands
<!-- If you added/modified voice commands, list them -->
- Added: `"command name"` - Description
- Modified: `"command name"` - Changes made
- Removed: `"command name"` - Reason for removal

### 📋 Checklist
<!-- Ensure all items are completed before requesting review -->
- [ ] Code follows the existing style guidelines
- [ ] Self-review of the code has been performed
- [ ] Comments added to hard-to-understand areas
- [ ] Documentation updated (README, CONTRIBUTING, etc.)
- [ ] No console.log statements left in production code
- [ ] TypeScript types are properly defined
- [ ] Accessibility considerations addressed

### 🚀 Deployment Notes
<!-- Any special deployment considerations -->
- [ ] No environment variables needed
- [ ] Database migrations required: (none/describe)
- [ ] Feature flags needed: (none/describe)
- [ ] Third-party API changes: (none/describe)

### 📞 Reviewer Notes
<!-- Anything specific you want reviewers to focus on -->

---

**For Reviewers:**
- Please test voice commands if they're part of this change
- Verify safety features still work as expected
- Check that driving mode properly locks unsafe interactions
- Ensure Tesla-style design consistency is maintained
