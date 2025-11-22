# ComSim Build Guide

This guide provides detailed instructions for building the ComSim Android APK.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Build Methods](#build-methods)
  - [Method 1: EAS Build (Cloud)](#method-1-eas-build-cloud---recommended)
  - [Method 2: Local Build (Linux/macOS)](#method-2-local-build-linuxmacos)
  - [Method 3: Using WSL2 on Windows](#method-3-using-wsl2-on-windows)
- [Troubleshooting](#troubleshooting)
- [Publishing](#publishing)

---

## Prerequisites

### Common Requirements

- Node.js v16 or higher
- npm or yarn package manager
- Git (for cloning the repository)
- Expo account (for EAS Build)

### For Local Builds (Linux/macOS)

- Java Development Kit (JDK) 17
- Android SDK (via Android Studio)
- Gradle (comes with Android project)

### Environment Variables (for local builds)

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

---

## Quick Start

### Install Dependencies

```bash
npm install
```

### Choose Your Build Method

1. **EAS Build (Recommended for all platforms)**

   ```bash
   npm install -g eas-cli
   eas login
   eas build --platform android --profile production
   ```

2. **Local Build (Linux/macOS only)**
   ```bash
   npm run prebuild:android
   npm run build:apk
   ```

---

## Build Methods

### Method 1: EAS Build (Cloud) - **Recommended**

EAS Build is Expo's cloud build service. It works on all platforms (Windows, Linux, macOS).

#### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

#### Step 2: Login to Expo

```bash
eas login
```

Enter your Expo credentials. If you don't have an account, create one at https://expo.dev

#### Step 3: Configure EAS (First time only)

```bash
eas build:configure
```

This creates/updates the `eas.json` file (already included in this project).

#### Step 4: Build the APK

```bash
# For production build
eas build --platform android --profile production

# For preview/testing build
eas build --platform android --profile preview
```

#### Step 5: Download the APK

- Option 1: The build link will be displayed in the terminal
- Option 2: Visit https://expo.dev/accounts/[your-username]/projects/ComSim/builds
- Option 3: Use EAS CLI:
  ```bash
  eas build:list
  ```

#### Build Profiles

The `eas.json` file includes three profiles:

- **development**: For development testing with Expo Dev Client
- **preview**: Creates an APK for internal testing
- **production**: Creates a production-ready APK

---

### Method 2: Local Build (Linux/macOS)

Local builds give you more control but require proper Android development environment setup.

#### Step 1: Install Android Studio

Download and install Android Studio from https://developer.android.com/studio

#### Step 2: Setup Android SDK

1. Open Android Studio
2. Go to Settings → Appearance & Behavior → System Settings → Android SDK
3. Install:
   - Android SDK Platform 33 or higher
   - Android SDK Build-Tools 33.0.0 or higher
   - Android SDK Command-line Tools

#### Step 3: Set Environment Variables

Add to your `~/.bashrc`, `~/.zshrc`, or equivalent:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

Reload your shell:

```bash
source ~/.bashrc  # or source ~/.zshrc
```

#### Step 4: Generate Native Code

```bash
npx expo prebuild --platform android
```

Or use the npm script:

```bash
npm run prebuild:android
```

#### Step 5: Build the APK

```bash
cd android
./gradlew assembleRelease
```

Or from the root directory:

```bash
npm run build:apk
```

For a clean build:

```bash
npm run build:apk:clean
```

#### Step 6: Locate the APK

The APK will be at:

```
android/app/build/outputs/apk/release/app-release.apk
```

Copy it to the builds directory:

```bash
mkdir -p builds
cp android/app/build/outputs/apk/release/app-release.apk builds/ComSim-v1.0.0.apk
```

---

### Method 3: Using WSL2 on Windows

If you're on Windows, you can use Windows Subsystem for Linux (WSL2) to build locally.

#### Step 1: Install WSL2

```powershell
# Run in PowerShell as Administrator
wsl --install
```

Restart your computer.

#### Step 2: Install Ubuntu

```powershell
wsl --install -d Ubuntu
```

#### Step 3: Setup in Ubuntu

Open Ubuntu terminal and follow Method 2 instructions above.

#### Step 4: Access Files

Your Windows files are accessible at `/mnt/c/` in WSL.

```bash
# Navigate to your project
cd /mnt/c/Users/[YourUsername]/Desktop/ComSim

# Follow Method 2 steps
```

---

## Build Configuration

### Customizing the Build

#### Update Version

Edit `app.json`:

```json
{
  "expo": {
    "version": "1.0.0",
    "android": {
      "versionCode": 1
    }
  }
}
```

- `version`: User-facing version string (e.g., "1.0.0")
- `versionCode`: Internal version number (increment for each release)

#### Update Package Name

In `app.json`:

```json
{
  "expo": {
    "android": {
      "package": "com.comsim.app"
    }
  }
}
```

#### Signing the APK (Production)

For production releases, you need to sign your APK:

1. Generate a keystore:

   ```bash
   keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Update `android/app/build.gradle`:
   ```gradle
   android {
       signingConfigs {
           release {
               storeFile file('my-release-key.keystore')
               storePassword 'your-password'
               keyAlias 'my-key-alias'
               keyPassword 'your-password'
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
           }
       }
   }
   ```

> **Security Note:** Never commit keystores or passwords to version control!

---

## Troubleshooting

### Common Issues

#### 1. "SDK location not found"

**Solution:** Set the Android SDK path in `android/local.properties`:

```properties
sdk.dir=/path/to/Android/Sdk
```

#### 2. "Gradle build failed"

**Solutions:**

- Clean the build: `cd android && ./gradlew clean`
- Update Gradle wrapper: `cd android && ./gradlew wrapper --gradle-version=8.0`
- Check Java version: `java -version` (should be JDK 17)

#### 3. "AAPT: error: file failed to compile"

**Solution:** This usually means an image file has issues.

- Check image filenames (avoid uppercase, spaces, special characters)
- Verify image formats (PNG, JPG recommended)
- Try optimizing images

#### 4. "Execution failed for task ':app:mergeReleaseResources'"

**Solution:**

- Run `cd android && ./gradlew clean`
- Delete `android/.gradle` and rebuild
- Check for duplicate resources

#### 5. Windows: "process cannot access the file"

**Solution:**

- Stop Gradle daemon: `cd android && ./gradlew --stop`
- Close Android Studio
- Use EAS Build instead (recommended for Windows)

#### 6. "Unable to load script"

**Solution:**

- Ensure Metro bundler is running
- Clear cache: `npx expo start --clear`
- Delete `node_modules` and reinstall: `npm install`

#### 7. "BUILD FAILED" without clear reason

**Solutions:**

- Check logs in `android/app/build/outputs/logs/`
- Run with more verbose output: `./gradlew assembleRelease --info`
- Try debug build first: `./gradlew assembleDebug`

---

## Build Variants

### Debug Build

Faster build, includes debugging tools:

```bash
cd android
./gradlew assembleDebug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release Build

Optimized for production:

```bash
cd android
./gradlew assembleRelease
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

---

## Publishing

### Google Play Store

1. **Prepare Assets**

   - App icon (512x512)
   - Feature graphic (1024x500)
   - Screenshots (minimum 2)
   - Privacy policy URL

2. **Create Store Listing**

   - Go to https://play.google.com/console
   - Create a new app
   - Fill in store listing details

3. **Upload APK**

   - Go to Release → Production
   - Create new release
   - Upload signed APK
   - Set rollout percentage

4. **Submit for Review**
   - Complete all required sections
   - Submit app for review

### Direct Distribution

1. **Host the APK**

   - Upload to GitHub Releases
   - Host on your website
   - Use cloud storage (Google Drive, Dropbox)

2. **Share Installation Instructions**
   ```
   1. Download the APK
   2. Enable "Install from Unknown Sources"
   3. Open the APK to install
   4. Grant permissions
   ```

---

## Automated Builds (CI/CD)

### GitHub Actions Example

Create `.github/workflows/build.yml`:

```yaml
name: Build APK

on:
  push:
    tags:
      - "v*"

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install

      - name: Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Build APK
        run: eas build --platform android --non-interactive --no-wait
```

---

## Next Steps

After building:

1. **Test the APK** on real devices
2. **Verify all features** work correctly
3. **Check app size** and optimize if needed
4. **Run on different Android versions**
5. **Gather feedback** from beta testers
6. **Prepare for production release**

---

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [React Native Documentation](https://reactnative.dev/)
- [Android Developer Guide](https://developer.android.com/)
- [Google Play Console](https://play.google.com/console)

---

## Support

If you encounter issues:

1. Check this guide's [Troubleshooting](#troubleshooting) section
2. Search [Expo Forums](https://forums.expo.dev/)
3. Check [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)
4. Open an issue on [GitHub](https://github.com/jerwinagustin/ComSim/issues)

---

**Happy Building! 🚀**
