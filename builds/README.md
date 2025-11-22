# ComSim APK Builds

This directory contains the APK builds for the ComSim application.

## How to Build the APK

Due to Windows limitations with local Android builds, use one of these methods:

### Method 1: EAS Build (Recommended - Cloud Build)

1. Install EAS CLI:

   ```bash
   npm install -g eas-cli
   ```

2. Login to your Expo account:

   ```bash
   eas login
   ```

3. Build the APK:

   ```bash
   eas build --platform android --profile production
   ```

4. Download the generated APK from the link provided or from your Expo dashboard.

5. Move the downloaded APK to this directory and rename it to `ComSim-v1.0.0.apk`

### Method 2: Using Linux/macOS or WSL2

If you have access to Linux or macOS:

1. Generate the Android project:

   ```bash
   npx expo prebuild --platform android
   ```

2. Build using Gradle:

   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. The APK will be located at:

   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

4. Copy it to this directory:
   ```bash
   cp android/app/build/outputs/apk/release/app-release.apk ../builds/ComSim-v1.0.0.apk
   ```

### Method 3: GitHub Actions (Automated)

Set up GitHub Actions to automatically build the APK on every release. See `.github/workflows/` for the workflow configuration (to be added).

## Current Build

- **Version:** 1.0.0
- **Build Date:** Pending
- **File:** ComSim-v1.0.0.apk (To be generated)

## Installation

Once you have the APK file:

1. Transfer the APK to your Android device
2. Enable "Install from Unknown Sources" in your device settings
3. Open the APK file to install
4. Grant necessary permissions when prompted

## Notes

- The APK is unsigned (debug mode) or signed with a release key (production mode)
- For production releases, ensure you sign the APK with a proper keystore
- The minimum Android version required is Android 5.0 (API 21)
