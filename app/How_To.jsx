import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";

const Module3 = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Module 3: How to Build a PC</Text>

      <Text style={styles.description}>
        Now that you know about the parts, it's time to put them together! This
        module will walk you through the step-by-step process of building a PC
        — from installing the CPU to powering it on for the first time.
      </Text>

      {/* Steps */}
      {[
        "Gather Your Tools and Components",
        "Install the CPU",
        "Install the RAM",
        "Mount the Motherboard",
        "Install the Power Supply",
        "Install Storage",
        "Install the GPU",
        "Connect Cables",
        "Power On and Test",
      ].map((step, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.heading}>{`${index + 1}. ${step}`}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a73e8",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    lineHeight: 22,
  },
  section: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 2,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
});

export default Module3;