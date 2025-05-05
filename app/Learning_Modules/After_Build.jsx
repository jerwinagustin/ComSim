import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, View, Dimensions } from "react-native";
import { useFocusEffect, useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const After_Build = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [completed, setCompleted] = useState(false);
  const navigation = useNavigation();

  const handleScroll = event => {
    if (completed) return;

    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollY = event.nativeEvent.contentOffset.y;
    const visibleHeight = event.nativeEvent.layoutMeasurement.height;
    const totalScrollableHeight = contentHeight - visibleHeight;
    const scrolled = Math.min(scrollY / totalScrollableHeight, 1);

    if (scrolled >= 1) {
      setCompleted(true);
      setScrollPercentage(1);
      AsyncStorage.setItem("afterBuildComplete", "true");
    } else {
      setScrollPercentage(scrolled);
    }
  };

  const fillColor = completed ? "#90EE90" /* light green */ : "#1A73E8";

  return (
    <View style={styles.wrapper}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${scrollPercentage * 100}%`, backgroundColor: fillColor },
          ]}
        />
        <Text style={styles.progressText}>
          {completed ? "Ready to Take Quiz" : `${Math.floor(scrollPercentage * 100)}%`}
        </Text>
      </View>

      <ScrollView
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Text style={styles.title}>
          Module 4: What to Do After Building Your PC
        </Text>

        <Text style={styles.description}>
          After building your PC, you need to configure and optimize it for maximum performance.{"\n\n"}
          This module will cover important tasks like adjusting BIOS settings, installing the operating system, updating drivers, securing your system,
          installing your favorite programs and games, backing up data, and personalizing the desktop experience.
        </Text>

        <View style={styles.section}>
          <Text style={styles.heading}>1. Configure BIOS Settings</Text>
          <Text style={styles.text}>
            After turning on your new PC, enter the BIOS by pressing the designated function key during startup.{"\n\n"}
            <Text style={styles.bold}>BIOS</Text> (Basic Input/Output System) is the firmware that initializes and tests your hardware before the OS loads.{"\n\n"}
            Adjust key settings like the boot drive order to tell the computer which drive to use first, and enable features such as <Text style={styles.bold}>XMP</Text> (Extreme Memory Profile) to ensure your RAM is running at its rated speed.{"\n\n"}
            These adjustments ensure that your hardware is properly recognized and optimized from the moment you power up your system.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>2. Install the Operating System</Text>
          <Text style={styles.text}>
            With your BIOS configured, the next step is to install an <Text style={styles.bold}>Operating System (OS)</Text>—typically Windows 10 or Windows 11.{"\n\n"}
            You will use a bootable USB drive to start the installation process. This OS will be the foundation of your computer, 
            managing hardware and software resources and providing a platform for all your applications.{"\n\n"}
            Follow Microsoft’s detailed guidelines to complete the setup, ensuring that your PC has a stable and secure environment.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>3. Install and Update Drivers</Text>
          <Text style={styles.text}>
            Once the OS is installed, it's essential to update your drivers. Drivers are small software programs that allow the operating system 
            to communicate correctly with each component—from the motherboard and graphics card to peripherals like printers and keyboards.{"\n\n"}
            While many drivers are automatically installed by Windows, visiting the manufacturer’s website for the latest versions can help avoid issues like poor performance or display glitches.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>4. Secure Your PC</Text>
          <Text style={styles.text}>
            Protect your new build by installing reliable antivirus and antispyware software.{"\n\n"}
            Regular scans, automatic updates, and real-time protection are crucial to safeguarding your system from malware, viruses, and other security threats.{"\n\n"}
            A secure PC means your data and personal information remain safe once you connect to the internet.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>5. Install Programs and Games</Text>
          <Text style={styles.text}>
            With your system secure and stable, you can now install essential software, applications, and games.{"\n\n"}
            It is a good practice to keep your operating system and frequently updated applications on one drive (usually an SSD for speed), while placing larger programs and games on a separate drive to optimize overall performance and storage management.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>6. Back Up Your Data</Text>
          <Text style={styles.text}>
            Before diving into regular usage, set up a reliable backup solution.{"\n\n"}
            This might be an external SSD or a cloud-based service, which will automatically back up your important files and documents.{"\n\n"}
            Regular backups provide peace of mind, ensuring that your critical data is safe in the event of hardware failure or other system issues.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>7. Personalize Your PC</Text>
          <Text style={styles.text}>
            Finally, make your new PC truly yours by personalizing it.{"\n\n"}
            This can include changing system settings such as the lock screen, desktop background, and taskbar layout, as well as configuring RGB lighting or other hardware-specific features using dedicated control software.{"\n\n"}
            Personalization not only enhances your user experience but also helps create a more efficient and enjoyable workspace.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  progressBarContainer: {
    height: 30,
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    position: "relative",
  },
  progressBarFill: {
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
  },
  progressText: {
    zIndex: 1,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1A73E8",
    marginTop: 30,
    marginBottom: 50,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "justify",
    marginBottom: 20,
    lineHeight: 22,
  },
  section: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    textAlign: "justify",
  },
  bold: {
    fontWeight: "bold",
  },
});

export default After_Build;
