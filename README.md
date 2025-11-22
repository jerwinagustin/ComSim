# ComSim - PC Building Simulator & Learning Platform

<div align="center">
  <img src="./assets/images/CpuLogo.png" alt="ComSim Logo" width="120"/>
  
  ### Simulate Your Dream PC, Learn the Skills
  
  **Assemble. Customize. Optimize. Go Beyond!**
  
  ---
  
  **[📱 Download](#-download-apk) • [🚀 Quick Start](./QUICKSTART.md) • [🔨 Build Guide](./BUILD_GUIDE.md) • [🤝 Contributing](./CONTRIBUTING.md)**
  
</div>

---

## 📱 Download & Try ComSim

### 🎯 For Recruiters & Evaluators

**📥 [Download ComSim APK (v1.0.0)](https://github.com/jerwinagustin/ComSim/raw/main/builds/ComSim-v1.0.0.apk)**

> **Quick Install Guide:**
>
> 1. Download the APK using the link above
> 2. On your Android device, go to Settings → Security → Enable "Install from Unknown Sources"
> 3. Open the downloaded APK file
> 4. Tap "Install" and wait for installation to complete
> 5. Launch ComSim and explore!

**System Requirements:**

- Android 5.0 (Lollipop) or higher
- ~50 MB storage space
- Internet connection for initial setup (optional)

### 💻 For Developers

Want to build from source or contribute? See the [Build Guide](./BUILD_GUIDE.md) and [Quick Start](./QUICKSTART.md).

---

## 🎯 About ComSim

ComSim is an interactive educational mobile application designed to help users learn about computer hardware components and PC building through simulation and interactive modules. Whether you're a beginner looking to understand PC components or an enthusiast wanting to test configurations, ComSim provides an engaging platform to explore, learn, and build virtual PCs.

### ✨ Key Features

- **📚 Interactive Learning Modules**

  - Comprehensive lessons on PC components (CPU, GPU, RAM, Motherboard, Storage, PSU, etc.)
  - Visual guides and explanations
  - Progressive difficulty levels

- **🎯 Simulation Mode**

  - Build virtual PCs with realistic component selection
  - Compatibility checking between components
  - Performance estimation and bottleneck analysis

- **📝 Quiz & Assessment**

  - Test your knowledge with interactive quizzes
  - Track your learning progress
  - Instant feedback and explanations

- **🎨 Modern UI/UX**
  - Clean, intuitive interface
  - Smooth animations and transitions
  - Responsive design for various screen sizes

---

## 🖼️ Features & Screenshots

> **Note:** ComSim demonstrates modern mobile app development with React Native, featuring interactive UI components, smooth animations, and educational content management.

### Main Features Showcase

- **Home Screen** - Animated panels with smooth transitions and gradient backgrounds
- **Learning Modules** - Interactive tutorials on PC components (CPU, GPU, RAM, Motherboard, Storage, PSU)
- **Quiz System** - Knowledge assessment with instant feedback
- **Component Browser** - Explore different PC parts with detailed specifications
- **Simulation Mode** - Build virtual PCs with compatibility checking

_Screenshots and demo videos can be added here once the app is running_

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development) or Xcode (for iOS development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jerwinagustin/ComSim.git
   cd ComSim
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app (Android/iOS)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Press `w` for web browser

---

## 📱 Running on Physical Device

### Option 1: Expo Go (Development)

1. Install Expo Go from [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or [Apple App Store](https://apps.apple.com/app/expo-go/id982107779)
2. Run `npx expo start` in the project directory
3. Scan the QR code displayed in the terminal

### Option 2: Development Build

1. Run `npx expo run:android` or `npx expo run:ios`
2. The app will be installed on your connected device or emulator

---

## 🔨 Building from Source

### Building for Android

#### Method 1: Using EAS Build (Cloud Build - Recommended)

1. **Install EAS CLI**

   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**

   ```bash
   eas login
   ```

3. **Configure EAS**

   ```bash
   eas build:configure
   ```

4. **Build APK**

   ```bash
   eas build --platform android --profile production
   ```

5. **Download the APK**
   - Once the build completes, download the APK from the provided link
   - Or check your Expo dashboard at https://expo.dev

#### Method 2: Local Build (Linux/macOS)

1. **Generate Android project**

   ```bash
   npx expo prebuild --platform android
   ```

2. **Build the APK**

   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. **Locate the APK**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

> **Note:** Local Android builds are not supported on Windows. Use EAS Build or WSL2 with Linux.

### Building for iOS (macOS only)

```bash
npx expo prebuild --platform ios
cd ios
pod install
xcodebuild -workspace ComSim.xcworkspace -scheme ComSim -configuration Release
```

---

## 📂 Project Structure

```
ComSim/
├── app/                      # Main application screens
│   ├── index.jsx            # Home screen
│   ├── Introduction.jsx     # Introduction/Tutorial
│   ├── module2.jsx          # Learning modules
│   ├── explore.tsx          # Exploration features
│   ├── Panel.jsx            # UI panel components
│   └── _layout.tsx          # Layout configuration
├── assets/                   # Images, fonts, and static resources
│   ├── fonts/               # Custom fonts
│   └── images/              # App images and icons
├── components/              # Reusable React components
│   ├── ui/                  # UI components
│   └── __tests__/           # Component tests
├── constants/               # App constants and configurations
│   └── Colors.ts            # Color theme definitions
├── hooks/                   # Custom React hooks
├── scripts/                 # Build and utility scripts
├── app.json                 # Expo configuration
├── package.json             # Node dependencies
├── tsconfig.json            # TypeScript configuration
└── eas.json                 # EAS Build configuration
```

---

## 🛠️ Tech Stack

- **Framework:** React Native with Expo
- **Navigation:** Expo Router (file-based routing)
- **Language:** TypeScript & JavaScript
- **Styling:** React Native StyleSheet
- **UI Components:**
  - Expo Linear Gradient
  - Expo Blur
  - React Native Reanimated
  - React Native Gesture Handler
  - React Native SVG
- **State Management:** React Hooks (useState, useRef)
- **Testing:** Jest with React Native Testing Library

### 💡 Skills Demonstrated

This project showcases:

- ✅ **Mobile Development** - Cross-platform React Native application
- ✅ **Modern JavaScript** - ES6+, async/await, hooks, functional components
- ✅ **UI/UX Design** - Animations, transitions, responsive layouts
- ✅ **State Management** - React hooks, component lifecycle
- ✅ **Navigation** - File-based routing with Expo Router
- ✅ **Build Automation** - EAS Build, Gradle configuration
- ✅ **Version Control** - Git, GitHub, proper .gitignore setup
- ✅ **Documentation** - Comprehensive README, build guides, contribution guidelines

---

## 🎓 Learning Modules

ComSim includes comprehensive learning modules covering:

1. **Introduction to PC Components**

   - Overview of computer architecture
   - Understanding component roles

2. **Component Deep Dives**

   - Central Processing Unit (CPU)
   - Graphics Processing Unit (GPU)
   - Random Access Memory (RAM)
   - Motherboards and Chipsets
   - Storage Solutions (SSD, HDD, NVMe)
   - Power Supply Units (PSU)
   - Cooling Solutions

3. **Building Process**

   - Step-by-step assembly guide
   - Cable management tips
   - First boot procedures

4. **Optimization & Troubleshooting**
   - Performance tuning
   - Common issues and solutions
   - Compatibility checking

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Jerwin Agustin**

- GitHub: [@jerwinagustin](https://github.com/jerwinagustin)

---

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev)
- Icons and images created for educational purposes
- Thanks to the React Native community

---

## 📞 Support

For support, issues, or feature requests:

- Open an issue on [GitHub](https://github.com/jerwinagustin/ComSim/issues)
- Contact: [Your Email]

---

## 🗺️ Roadmap

- [ ] Add more interactive quizzes
- [ ] Implement 3D component visualization
- [ ] Add community PC builds sharing
- [ ] Include price comparison features
- [ ] Support for custom component specifications
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Offline mode capabilities

---

<div align="center">
  
  **Made with ❤️ for PC Building Enthusiasts**
  
  ⭐ Star this repo if you find it helpful!
  
</div>
