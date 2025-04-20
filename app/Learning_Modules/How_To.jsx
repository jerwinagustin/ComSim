import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, View, Dimensions } from "react-native";
import { useFocusEffect, useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const How_To = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [completed, setCompleted] = useState(false);
  const navigation = useNavigation();

  const handleScroll = (event) => {
    if (completed) return; // once completed, lock in place

    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollY = event.nativeEvent.contentOffset.y;
    const visibleHeight = event.nativeEvent.layoutMeasurement.height;
    const totalScrollableHeight = contentHeight - visibleHeight;
    const scrolled = Math.min(scrollY / totalScrollableHeight, 1);

    if (scrolled >= 1) {
      setCompleted(true);
      setScrollPercentage(1);
      AsyncStorage.setItem("howToComplete", "true");
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
          Module 3: How to Build a PC
        </Text>

        <Text style={styles.description}>
          Now that you know about the parts, it's time to put them together!{"\n\n"}
          This module will walk you through the process of building a PC — from installing the CPU (Central Processing Unit) to powering it on for the first time.
        </Text>

        <View style={styles.section}>
          <Text style={styles.heading}>
            1. Gather Your Tools and Components
          </Text>
          <Text style={styles.text}>
            Before you begin, it's important to have all your tools and components organized.{"\n\n"}
            Here’s a more detailed look at what you'll need and why:
          </Text>
          <Text style={styles.text}>
            • <Text style={styles.bold}>Magnetic Screwdriver Set:</Text> This ensures that screws stick to the tip, making it easier to secure components without losing small screws.{"\n\n"}
            • <Text style={styles.bold}>Various Phillips Bits:</Text> Different parts may require different sizes of Phillips screws, so having several sizes is essential.{"\n\n"}
            • <Text style={styles.bold}>Anti-Static Wrist Strap:</Text> Also known as a grounding strap, this tool prevents static electricity from damaging sensitive electronics.{"\n\n"}
            • <Text style={styles.bold}>Parts Tray or Organizer:</Text> Keeping your screws, cables, and small components organized prevents misplacing items and ensures a smoother build process.{"\n\n"}
            • <Text style={styles.bold}>Workspace Preparation:</Text> Choose a large, flat surface in a well-lit area. Lay down a soft mat or cloth to protect your components from scratches and accidental falls.{"\n\n"}
            Taking a few extra minutes to prepare your workspace not only helps prevent mistakes but also makes the process more enjoyable and less stressful.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>
            2. Install the CPU
          </Text>
          <Text style={styles.text}>
            Carefully remove the CPU (Central Processing Unit) from its packaging.{"\n\n"}
            Locate the alignment arrow on both the processor and the motherboard’s socket. Gently place the CPU into the socket without forcing it, then secure it by lowering the retention lever.{"\n\n"}
            This step is critical to ensure that the processor makes proper contact with the socket pins.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>
            3. Install the RAM
          </Text>
          <Text style={styles.text}>
            Identify the correct memory slots as advised by your motherboard manual (RAM stands for Random Access Memory and is used for temporary data storage when your computer is on).{"\n\n"}
            Align the notches on the RAM modules with the keys in the slots and firmly press them in until the latches click into place.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>
            4. Mount the Motherboard
          </Text>
          <Text style={styles.text}>
            Prepare your PC (Personal Computer) case by installing or confirming the placement of standoffs and the I/O shield.{"\n\n"}
            Place the motherboard in the case, ensuring the rear ports align correctly with the I/O shield, then secure it with screws, starting from the center to maintain proper alignment.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>
            5. Install the Power Supply
          </Text>
          <Text style={styles.text}>
            Position the power supply unit (PSU stands for Power Supply Unit) in its designated area within the case (usually at the bottom or top).{"\n\n"}
            Connect the required PSU cables — such as the 24-pin main connector, CPU power cable, and any PCI Express or SATA cables — before securing the PSU in place.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>
            6. Install Storage
          </Text>
          <Text style={styles.text}>
            Install your primary storage device, typically an M.2 SSD (SSD stands for Solid State Drive, a fast storage solution).{"\n\n"}
            Remove any heatsinks covering the M.2 slot if necessary, align the SSD with the slot’s notch, and secure it with the provided screw. Additional storage devices (like a traditional hard drive) can be mounted in dedicated drive bays.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>
            7. Install the GPU
          </Text>
          <Text style={styles.text}>
            Insert your graphics card, known as the GPU (Graphics Processing Unit, which handles rendering images and videos), into the appropriate PCI Express slot.{"\n\n"}
            Ensure that the card is firmly seated and secure it with screws, then connect any required power cables from the PSU to the graphics card.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>
            8. Connect Cables
          </Text>
          <Text style={styles.text}>
            Route and connect all necessary cables, including front-panel connectors (for power switches, reset buttons, LEDs, USB, and audio).{"\n\n"}
            Carefully manage cable routing to avoid obstructing airflow and to maintain a neat build.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>
            9. Power On and Test
          </Text>
          <Text style={styles.text}>
            Once everything is connected and secured, power on the system.{"\n\n"}
            Verify that the BIOS (Basic Input/Output System, the firmware that initializes hardware) detects all components, and check that fans, lights, and other peripherals are functioning properly before proceeding with the operating system installation.
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

export default How_To;
