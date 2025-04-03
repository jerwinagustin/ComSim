import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";

const After_Build = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Module 4: What to Do After Building Your PC</Text>

      <Text style={styles.description}>
        After building your PC, you need to configure and optimize it for
        maximum performance. This module will cover BIOS settings, installing
        drivers, setting up the operating system, and securing your PC.
      </Text>

      <View style={styles.section}>
        <Text style={styles.heading}>1. Configure BIOS Settings</Text>
        <Text style={styles.text}> After turning on your new PC, enter the BIOS by pressing the designated function key during boot.
           Adjust key settings like the boot drive order and enable features such as XMP to ensure your RAM is running at its rated speed. 
           This step guarantees that your system hardware is properly recognized and optimized right from startup.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>2. Install the Operating System</Text>
        <Text style={styles.text}>
        With the BIOS configured, install the operating system (typically Windows 10 or Windows 11) using a bootable USB drive. 
        Following Microsoft’s guidelines, you’ll set up the core software environment that your PC will run on, making it essential 
        for everything else to function.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>3. Install and Update Drivers</Text>
        <Text style={styles.text}>
        Once the OS is installed, update your drivers to ensure that each component—from the motherboard and graphics card 
        to peripherals—communicates correctly with the system
         While many drivers may install automatically, checking the manufacturer’s website for the latest updates can help prevent 
         issues like suboptimal performance or display problems.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>4. Secure Your PC</Text>
        <Text style={styles.text}>
        Protect your new build by installing antivirus and antispyware software. Regular scans and updates 
        will help guard against malware and other security threats, ensuring that your system 
        and data remain safe once connected to the internet.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>5. Install Programs and Games</Text>
        <Text style={styles.text}>
        Now that the system is secure, you can install your essential software, applications, and games.
        It’s recommended to keep the operating system and frequently updated software on one drive, while placing games and 
        larger applications on a separate drive to optimize storage and performance.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>6. Back Up Your Data</Text>
        <Text style={styles.text}>
        Before you dive into daily use, set up a backup solution—whether it’s an external SSD or a cloud-based service—to protect your 
        important files and data. Regular backups ensure you won’t lose progress or critical information in the event of a system issue.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>7. Personalize Your PC</Text>
        <Text style={styles.text}>
        Finally, customize your PC to suit your preferences. This can involve changing system settings like the lock screen and taskbar arrangement,
        tweaking RGB lighting and effects with control software, and even upgrading peripherals to create your ideal workspace.
        </Text>
      </View>
      
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

export default After_Build;