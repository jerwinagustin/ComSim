import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";

const Module4 = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Module 4: What to Do After Building Your PC</Text>

      <Text style={styles.description}>
        After building your PC, you need to configure and optimize it for
        maximum performance. This module will cover BIOS settings, installing
        drivers, setting up the operating system, and securing your PC.
      </Text>

      {/* Steps */}
      {[
        "Configure BIOS Settings",
        "Install the Operating System",
        "Install and Update Drivers",
        "Secure Your PC",
        "Install Programs and Games",
        "Back Up Your Data",
        "Personalize Your PC",
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

export default Module4;