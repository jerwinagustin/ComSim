import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import Svg, { Path } from 'react-native-svg';

const How_To = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Module 3: How to Build a PC</Text>

      <Text style={styles.description}>
        Now that you know about the parts, it's time to put them together! This
        module will walk you through the step-by-step process of building a PC
        — from installing the CPU to powering it on for the first time.
      </Text>

      
      <View style={styles.section}>
        <Text style={styles.heading}>1. Gather Your Tools and Components </Text>
          <Text style={styles.text}>
          Begin by assembling all necessary tools such as a magnetic screwdriver set, 
          various Phillips bits, a grounding strap, and a parts tray to keep screws and 
          small components organized. Make sure you have a clear, well-lit workspace 
          and protect surfaces from scratches.
          </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.heading}>2. Install the CPU</Text>
        <Text style={styles.text}>
        Carefully remove the CPU from its packaging. Locate the alignment arrow on both the 
        processor and the motherboard’s socket. Gently place the CPU into the socket without forcing it,
        then secure it by lowering the retention lever. This step is critical to ensure the processor 
        makes proper contact with the socket pins.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>3. Install the RAM</Text>
        <Text style={styles.text}>
        Identify the correct memory slots as advised by your motherboard manual (often using a specific configuration for dual-channel setups). 
        Align the notches on the RAM modules with the keys in the slots and firmly press them in until the latches click into place.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>4. Mount the Motherboard</Text>
        <Text style={styles.text}>
        Prepare your PC case by installing or confirming the placement of standoffs and the I/O shield. Place the motherboard
        in the case, ensuring the rear ports align with the I/O shield. Then secure it with screws, 
        starting from the center to maintain proper alignment.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>5. Install the Power Supply</Text>
        <Text style={styles.text}>
        Position the power supply unit (PSU) in its designated area within the case (usually at the bottom or top). 
        Connect the required PSU cables—such as the 24-pin main connector, CPU power cable,
        and any PCI Express or SATA cables—before securing the PSU in place.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.heading}>6. Install Storage</Text>
        <Text style={styles.text}>
        Install your primary storage device, typically an M.2 SSD for the boot drive. Remove any heatsinks covering the M.2 
        slot if necessary, align the SSD with the slot’s notch, and secure it with the provided screw. Additional storage 
        devices (like a hard drive) can be mounted in dedicated drive bays.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>7. Install the GPU</Text>
        <Text style={styles.text}>
        Insert your graphics card into the appropriate PCI Express slot. Ensure that the card is firmly seated and secure it with screws. 
        Connect any required power cables from the PSU to the graphics card to ensure proper function.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>8. Connect Cables</Text>
        <Text style={styles.text}>
        Route and connect all necessary cables, including front-panel connectors (for power switches, reset buttons, LEDs, USB, and audio).
        Carefully manage cable routing to avoid obstructing airflow and to maintain a neat build.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>9. Power On and Test</Text>
        <Text style={styles.text}>
        Once everything is connected and secured, power on the system. Verify that the BIOS detects all components, and check that fans, lights, 
        and other peripherals are functioning properly before proceeding with the operating system installation.
        </Text>
      </View>

      {/*
        "Power On and Test",
      */}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f4f4f4",
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
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3
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
});

export default How_To;