#!/bin/bash

# ComSim APK Build Script
# This script helps build the Android APK for ComSim

echo "========================================"
echo "  ComSim APK Build Script"
echo "========================================"
echo ""

# Check if we're on a supported platform
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    echo "❌ ERROR: Local Android builds are not supported on Windows."
    echo ""
    echo "Please use one of these alternatives:"
    echo ""
    echo "1. EAS Build (Cloud Build - Recommended):"
    echo "   npm install -g eas-cli"
    echo "   eas login"
    echo "   eas build --platform android --profile production"
    echo ""
    echo "2. Use WSL2 (Windows Subsystem for Linux) and run this script there"
    echo ""
    echo "3. Use a Linux or macOS machine"
    echo ""
    exit 1
fi

echo "📱 Building ComSim Android APK..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ ERROR: npm is not installed."
    exit 1
fi

echo "✓ Node.js and npm are installed"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Prebuild Android project
echo "🔧 Generating native Android project..."
npx expo prebuild --platform android
echo ""

# Navigate to android directory
cd android || exit 1

# Check if gradlew exists
if [ ! -f "./gradlew" ]; then
    echo "❌ ERROR: gradlew not found. Prebuild may have failed."
    exit 1
fi

# Make gradlew executable
chmod +x ./gradlew

# Build the release APK
echo "🏗️  Building release APK..."
./gradlew clean assembleRelease

# Check if build was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    
    # Copy APK to builds directory
    mkdir -p ../builds
    cp app/build/outputs/apk/release/app-release.apk ../builds/ComSim-v1.0.0.apk
    
    echo "📦 APK Location: builds/ComSim-v1.0.0.apk"
    echo ""
    echo "File size:"
    ls -lh ../builds/ComSim-v1.0.0.apk | awk '{print $5}'
    echo ""
    echo "🎉 Build complete! You can now install the APK on your Android device."
else
    echo ""
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
