# 🚀 Portfolio APK Setup Guide

## Goal: Make APK Available for Recruiters

This guide will help you build and publish the APK so recruiters can easily download and test your app.

---

## ⚡ Quick Option: Use EAS Build + GitHub Releases (Recommended)

### Step 1: Fix the Build Issues

The build is currently failing. Let's diagnose:

```powershell
# 1. Check the build logs at:
# https://expo.dev/accounts/jerwin/projects/ComSim/builds

# 2. Common fixes - clean everything
Remove-Item -Path ".expo" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "node_modules" -Recurse -Force
npm install
```

### Step 2: Build APK with EAS

```powershell
# Try building again
eas build --platform android --profile preview

# This creates an APK file you can download
```

### Step 3: Download the APK

Once the build succeeds:

1. EAS will provide a download link
2. Download the APK file
3. Rename it to `ComSim-v1.0.0.apk`

### Step 4: Create GitHub Release

1. **Go to your GitHub repository**

   - https://github.com/jerwinagustin/ComSim

2. **Click "Releases" → "Create a new release"**

3. **Fill in the details:**

   - Tag: `v1.0.0`
   - Title: `ComSim v1.0.0 - Initial Release`
   - Description:

     ```markdown
     # ComSim v1.0.0 - PC Building Simulator & Learning App

     ## 📱 What's New

     - Interactive PC building simulation
     - Comprehensive learning modules on computer components
     - Quiz system with instant feedback
     - Modern UI with smooth animations

     ## 📥 Installation

     1. Download the APK below
     2. Enable "Install from Unknown Sources" in your Android settings
     3. Open the APK file to install
     4. Launch ComSim and start learning!

     ## 🎯 Features

     - Learn about CPU, GPU, RAM, Motherboard, Storage, and more
     - Build virtual PC configurations
     - Test your knowledge with quizzes
     - Clean, intuitive mobile interface

     ## 🛠️ Tech Stack

     React Native • Expo • TypeScript • React Hooks

     ---

     **For recruiters:** This app demonstrates mobile development skills,
     UI/UX design, state management, and educational content delivery.
     ```

4. **Upload the APK**

   - Drag and drop `ComSim-v1.0.0.apk` into the release assets

5. **Publish the release**

### Step 5: Test the Download

1. Click the release link: `https://github.com/jerwinagustin/ComSim/releases/latest`
2. Verify the APK downloads correctly
3. Test installation on an Android device

---

## 🎯 Alternative: Direct Upload to Repository (Simpler)

If EAS build keeps failing, here's a simpler approach:

### Option A: Build Locally (If you have access to Linux/Mac)

```bash
# On Linux/Mac or WSL2
npx expo prebuild --platform android
cd android
./gradlew assembleRelease
cp app/build/outputs/apk/release/app-release.apk ../builds/ComSim-v1.0.0.apk
```

### Option B: Use Expo Go + APK Tool

```powershell
# 1. Export the JavaScript bundle
npx expo export --platform android

# 2. Use online APK builders like:
# - https://appetize.io/
# - https://apk-builder.com/
# Note: These might not work for Expo apps
```

### Option C: Ask a Developer Friend

If you have a friend with Linux/Mac:

1. Send them your code
2. They can build the APK
3. Send it back to you

---

## 📦 After You Have the APK

### Option 1: GitHub Releases (Professional)

✅ **Recommended for portfolio**

**Pros:**

- Professional presentation
- Easy download link
- Version management
- Release notes visible
- Automatic "Latest" badge

**URL to share:**

```
https://github.com/jerwinagustin/ComSim/releases/latest
```

### Option 2: Commit to Repository (Simple)

✅ **Quick and easy**

```powershell
# 1. Place APK in builds folder
# (builds/ComSim-v1.0.0.apk)

# 2. The .gitignore now allows this specific file
git add builds/ComSim-v1.0.0.apk
git commit -m "feat: add production APK for recruiters"
git push origin main
```

**URL to share:**

```
https://github.com/jerwinagustin/ComSim/raw/main/builds/ComSim-v1.0.0.apk
```

**Pros:**

- Simple, direct download
- No extra steps needed
- Works immediately

**Cons:**

- Makes repository larger (~30-50MB)
- Not the "standard" way
- Harder to update versions

### Option 3: Use Google Drive / Dropbox

```powershell
# 1. Upload APK to Google Drive
# 2. Set sharing to "Anyone with link"
# 3. Get shareable link
```

Then update README with the link.

---

## 🎨 Update Your Portfolio

### On GitHub README:

Already done! It now says:

```markdown
**Direct APK Download:** [Get the latest APK here →](https://github.com/jerwinagustin/ComSim/releases/latest)
```

### On Your Portfolio Website:

```html
<a
  href="https://github.com/jerwinagustin/ComSim/releases/latest"
  class="download-btn"
>
  📱 Download ComSim APK
</a>
```

### On Your Resume:

```
ComSim - PC Building Simulator
React Native | Expo | TypeScript
[GitHub] [Live APK] [Demo Video]
```

---

## ⚠️ Troubleshooting EAS Build

If builds keep failing:

### Check Build Logs

1. Go to https://expo.dev/accounts/jerwin/projects/ComSim/builds
2. Click on the failed build
3. Look at the "Run gradlew" phase
4. Look for specific error messages

### Common Issues:

**Issue 1: Image Files**

```
Error: AAPT: error: file failed to compile
```

**Fix:** Check `assets/images/` for files with uppercase or spaces

**Issue 2: Dependencies**

```
Error: Could not resolve dependencies
```

**Fix:**

```powershell
Remove-Item node_modules -Recurse -Force
npm install
eas build --platform android --profile preview
```

**Issue 3: Memory Issues**

```
Error: Java heap space
```

**Fix:** Add to `eas.json`:

```json
{
  "build": {
    "preview": {
      "android": {
        "gradleCommand": ":app:assembleRelease -x :app:lintVitalRelease"
      }
    }
  }
}
```

---

## 🎯 What Recruiters Will See

### With GitHub Releases:

1. Click your portfolio link
2. See professional release page
3. One-click download
4. Clear installation instructions
5. Version history

### With Direct Commit:

1. Click your portfolio link
2. See README with download button
3. One-click download
4. Automatic file download

**Both work great!** GitHub Releases is more "professional" but direct commit is simpler.

---

## 📊 My Recommendation

### For Your Situation:

**Step 1:** Try fixing the EAS build one more time

```powershell
# Clean everything
Remove-Item .expo -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item node_modules -Recurse -Force
npm install

# Build
eas build --platform android --profile preview --clear-cache
```

**Step 2:** If it works → Use GitHub Releases ✨

**Step 3:** If it still fails → Consider these options:

- **Quick fix:** Use a cloud service like GitHub Actions
- **Best practice:** Fix the underlying build issue (check logs)
- **Temporary:** Build on a Linux VM or WSL2

---

## 🚀 Final Checklist

Before sharing with recruiters:

- [ ] APK is built and tested on real device
- [ ] GitHub README has working download link
- [ ] Release notes are professional
- [ ] App opens without crashes
- [ ] All features work correctly
- [ ] Screenshots/demo video added to README (optional but impressive)

---

## 💡 Pro Tips

1. **Test on Multiple Devices**

   - Different Android versions
   - Different screen sizes
   - Different manufacturers

2. **Add QR Code to README**

   ```markdown
   ![Download APK](https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=YOUR_DOWNLOAD_LINK)

   Scan to download →
   ```

3. **Create Demo Video**

   - Record screen while using app
   - Upload to YouTube
   - Add to README
   - Shows recruiters what to expect

4. **Add to Portfolio Site**
   - Dedicated project page
   - Screenshots
   - Download button
   - Tech stack badges

---

**Need Help?**

If builds continue failing, share the build log URL and I can help diagnose the specific issue!
