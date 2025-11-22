@echo off
REM ComSim APK Build Script for Windows
REM This script helps you build the Android APK using EAS Build (Cloud)

echo ========================================
echo   ComSim APK Build Script (Windows)
echo ========================================
echo.

echo NOTE: Local Android builds are not supported on Windows.
echo This script will help you build using EAS Build (cloud service).
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
echo.

REM Check if npm is installed
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed.
    pause
    exit /b 1
)

echo [OK] npm is installed
echo.

echo Installing/Checking EAS CLI...
call npm list -g eas-cli >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing EAS CLI globally...
    call npm install -g eas-cli
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install EAS CLI
        pause
        exit /b 1
    )
) else (
    echo [OK] EAS CLI is already installed
)
echo.

echo ========================================
echo   Build Options
echo ========================================
echo.
echo 1. Build using EAS (Recommended)
echo 2. View build instructions
echo 3. Exit
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" goto build_eas
if "%choice%"=="2" goto show_instructions
if "%choice%"=="3" goto end
goto invalid_choice

:build_eas
echo.
echo ========================================
echo   Building with EAS
echo ========================================
echo.
echo Step 1: Login to Expo
echo.
call eas login
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Login failed. Please try again.
    pause
    exit /b 1
)

echo.
echo Step 2: Building APK...
echo This will take several minutes.
echo.
call eas build --platform android --profile production

echo.
echo ========================================
echo Build initiated!
echo.
echo The build is processing in the cloud.
echo You'll receive a link to download the APK when it's ready.
echo.
echo You can also check the build status at:
echo https://expo.dev
echo ========================================
echo.
pause
goto end

:show_instructions
echo.
echo ========================================
echo   Build Instructions
echo ========================================
echo.
echo OPTION 1: EAS Build (Cloud - Recommended for Windows)
echo ----------------------------------------
echo 1. Install EAS CLI:
echo    npm install -g eas-cli
echo.
echo 2. Login to Expo:
echo    eas login
echo.
echo 3. Build the APK:
echo    eas build --platform android --profile production
echo.
echo 4. Download the APK from the provided link
echo.
echo.
echo OPTION 2: Using WSL2 (Windows Subsystem for Linux)
echo ----------------------------------------
echo 1. Install WSL2:
echo    wsl --install
echo.
echo 2. Install Ubuntu
echo.
echo 3. Follow the Linux build instructions in BUILD_GUIDE.md
echo.
echo.
echo For more details, see BUILD_GUIDE.md
echo.
pause
goto end

:invalid_choice
echo.
echo Invalid choice. Please enter 1, 2, or 3.
echo.
pause
goto end

:end
echo.
echo Thank you for using ComSim Build Script!
echo.
pause
