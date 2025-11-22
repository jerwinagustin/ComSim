# ComSim Quick Start Guide

Get ComSim up and running in minutes!

## 🚀 For Users

### Install & Run

1. **Download the APK** (when available)

   - Get it from the [Releases page](https://github.com/jerwinagustin/ComSim/releases)
   - Or build it yourself (see below)

2. **Install on Android**
   - Transfer APK to your device
   - Enable "Install from Unknown Sources"
   - Tap the APK to install

### Or Run with Expo Go

1. **Install Expo Go**

   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)

2. **Visit the project**
   - Ask the developer for the Expo project URL
   - Scan the QR code with Expo Go

---

## 👨‍💻 For Developers

### Prerequisites

- Node.js 16+ ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/))

### 3-Minute Setup

```bash
# 1. Clone
git clone https://github.com/jerwinagustin/ComSim.git
cd ComSim

# 2. Install
npm install

# 3. Run
npm start
```

**That's it!** Scan the QR code with Expo Go.

### Run on Emulator/Simulator

```bash
# Android (requires Android Studio)
npm run android

# iOS (macOS only, requires Xcode)
npm run ios

# Web browser
npm run web
```

---

## 🔨 Build APK

### Quick Build (Cloud)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build
eas build --platform android --profile production
```

Download the APK from the link provided!

### Local Build (Linux/macOS)

```bash
# Generate Android project
npm run prebuild:android

# Build APK
npm run build:apk
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

> **Windows users:** Use EAS Build (cloud) or WSL2

**Full details:** See [BUILD_GUIDE.md](./BUILD_GUIDE.md)

---

## 📁 Project Structure

```
app/                # Screens and routes
├── index.jsx       # Home screen
├── module2.jsx     # Learning modules
└── explore.tsx     # Exploration features

components/         # Reusable components
├── ui/            # UI components
└── __tests__/     # Tests

assets/            # Images, fonts
constants/         # App constants
hooks/             # Custom hooks
```

---

## 🛠️ Common Tasks

### Add a New Screen

1. Create file in `app/` directory
2. Expo Router handles routing automatically

### Add a Component

1. Create in `components/` directory
2. Import where needed

### Update Styles

- Modify `constants/Colors.ts` for theme colors
- Use StyleSheet.create() in components

### Run Tests

```bash
npm test
```

---

## 📚 Learn More

- **Full README:** [README.md](./README.md)
- **Build Guide:** [BUILD_GUIDE.md](./BUILD_GUIDE.md)
- **Contributing:** [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Expo Docs:** https://docs.expo.dev
- **React Native:** https://reactnative.dev

---

## 🐛 Issues?

### Common Solutions

**Metro bundler not starting:**

```bash
npx expo start --clear
```

**Dependencies issues:**

```bash
rm -rf node_modules
npm install
```

**Android build fails:**

- Use EAS Build
- Check [BUILD_GUIDE.md](./BUILD_GUIDE.md)

**Still stuck?**

- Check [Issues](https://github.com/jerwinagustin/ComSim/issues)
- Create a new issue

---

## 🎯 What to Build?

### Good First Tasks

- [ ] Add new learning module
- [ ] Improve existing UI
- [ ] Add quiz questions
- [ ] Fix bugs
- [ ] Improve documentation

### Feature Ideas

- [ ] 3D component visualization
- [ ] PC build sharing
- [ ] Price comparison
- [ ] Dark mode
- [ ] More interactive tutorials

---

## 💡 Tips

- **Hot Reload:** Save files to see changes instantly
- **Debug:** Shake device for debug menu
- **Logs:** Check terminal for console.log output
- **Reload:** Press 'r' in terminal to reload app

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md)

1. Fork the repo
2. Create a branch
3. Make changes
4. Submit PR

---

## 📞 Need Help?

- **GitHub Issues:** [Report bugs/request features](https://github.com/jerwinagustin/ComSim/issues)
- **Discussions:** [Ask questions](https://github.com/jerwinagustin/ComSim/discussions)
- **Email:** [Contact developer]

---

**Happy Coding! 🚀**

Made with ❤️ for PC building enthusiasts
