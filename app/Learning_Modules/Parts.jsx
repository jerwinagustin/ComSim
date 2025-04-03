import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";

const Parts = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Module Title */}
      <Text style={styles.title}>Module 2: Parts Selection Guide</Text>

      {/* Module Description */}
      <Text style={styles.description}>
        Choosing the right components is critical when building a PC. This
        module will guide you through the process of selecting a compatible and
        performance-optimized setup. You'll learn how to pick the right CPU,
        motherboard, RAM, GPU, storage, and power supply based on your budget
        and performance goals.
      </Text>

      {/* CPU Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>1. CPU</Text>
        <Text style={styles.text}>
          Choose a processor based on your budget and performance needs.  
          - Intel or AMD – Ensure motherboard compatibility  
          - Higher core count improves multitasking performance  
        </Text>
      </View>

      {/* Motherboard Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>2. Motherboard</Text>
        <Text style={styles.text}>
          Match the chipset with your CPU. Consider the number of RAM slots and
          expansion ports.
        </Text>
      </View>

      {/* RAM Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>3. RAM</Text>
        <Text style={styles.text}>
          - Minimum 16GB for gaming and productivity  
          - Ensure XMP support for higher memory speeds  
        </Text>
      </View>

      {/* Storage Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>4. Storage</Text>
        <Text style={styles.text}>
          - SSD for fast load times, HDD for mass storage  
          - NVMe M.2 SSD for maximum performance  
        </Text>
      </View>

      {/* GPU Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>5. GPU</Text>
        <Text style={styles.text}>
          - Choose based on gaming or creative needs  
          - Consider VRAM capacity and cooling  
        </Text>
      </View>

      {/* PSU Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>6. Power Supply (PSU)</Text>
        <Text style={styles.text}>
          - Use a power supply calculator to estimate wattage  
          - Choose a high-efficiency PSU (80+ Gold or better)  
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

export default Parts;