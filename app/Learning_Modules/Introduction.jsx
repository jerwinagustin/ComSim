import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import Svg, { Path } from 'react-native-svg';
import { SharedElement } from "react-navigation-shared-element";

const Introduction = () => {
  return (
    // ScrollView allows the content to be scrollable in case it's too long for the screen
    
    <ScrollView style={styles.container}>
      {/* Title of the module */}
      
      
      <Text style={styles.title}>Module 1: Introduction to PC Components</Text>

      {/* Description of what the module is about */}
      <Text style={styles.description}>
        In this module, you'll learn about the core parts that make up a computer. Understanding how each part works will help you make better decisions when upgrading or fixing your PC. You'll explore the CPU, motherboard, RAM, storage, power supply, GPU, and cooling system — all the key parts that keep your computer running smoothly!
      </Text>
      

      {/* Section for CPU (Central Processing Unit) */}
      <View style={styles.section}>
        <Text style={styles.heading}>1. CPU (Central Processing Unit)</Text>
        <Text style={styles.text}>
          The CPU is the brain of the computer. It processes instructions and manages data flow. A faster CPU will make your system run better and allow for smoother multitasking.
        </Text>
      </View>

      {/* Section for Motherboard */}
      <View style={styles.section}>
        <Text style={styles.heading}>2. Motherboard</Text>
        <Text style={styles.text}>
          The motherboard is the main circuit board that connects all the hardware components together. It determines what kind of CPU, RAM, and other components your computer can use.
        </Text>
      </View>

      {/* Section for RAM (Random Access Memory) */}
      <View style={styles.section}>
        <Text style={styles.heading}>3. RAM (Random Access Memory)</Text>
        <Text style={styles.text}>
          RAM is temporary storage that helps your computer access data quickly. More RAM means you can do more things at once, like running multiple apps without slowing down.
        </Text>
      </View>

      {/* Section for Storage */}
      <View style={styles.section}>
        <Text style={styles.heading}>4. Storage</Text>
        <Text style={styles.text}>
          Storage is where your computer keeps all your files, operating system, and software. SSDs (Solid-State Drives) are much faster than traditional HDDs (Hard Disk Drives), making your computer feel snappier.
        </Text>
      </View>

      {/* Section for Power Supply */}
      <View style={styles.section}>
        <Text style={styles.heading}>5. Power Supply (PSU)</Text>
        <Text style={styles.text}>
          The power supply converts electricity from your wall outlet into the type of power your components need. A stronger PSU is required if you have more powerful components.
        </Text>
      </View>

      {/* Section for GPU (Graphics Processing Unit) */}
      <View style={styles.section}>
        <Text style={styles.heading}>6. GPU (Graphics Processing Unit)</Text>
        <Text style={styles.text}>
          The GPU is responsible for rendering images, videos, and animations. It plays a major role in gaming and video editing performance.
        </Text>
      </View>

      {/* Section for Cooling System */}
      <View style={styles.section}>
        <Text style={styles.heading}>7. Cooling System</Text>
        <Text style={styles.text}>
          A good cooling system keeps your computer from overheating. This is especially important during heavy use, like gaming or video rendering, to ensure your components stay at a safe temperature.
        </Text>
      </View>
    </ScrollView>
  );
};

// Styles for the components
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

export default Introduction;
