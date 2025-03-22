import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import Svg, { Path } from 'react-native-svg';

const Introduction = () => {
  return (
    // ScrollView allows the content to be scrollable in case it's too long for the screen
    
    <ScrollView style={styles.container}>
      {/* Title of the module */}
      
      
      <Text style={styles.title}>Introduction to PC Components</Text>

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
    padding: 12, // Adds padding inside the container
    backgroundColor: "#f4f4f4", // Light gray background color
  },
  title: {
    fontSize: 24, // Large font size for the title
    fontWeight: "bold", // Makes the title bold
    textAlign: "center",
    marginTop: 30,
    color: "#1a73e8", // Blue color for the title
    marginBottom: 50, // Adds space below the title
  },
  description: {
    fontSize: 16, // Regular font size for description
    color: "#555", // Dark gray color for text
    textAlign: "justify",
    marginBottom: 20, // Adds space below the description
    lineHeight: 22, // Increases line spacing for readability
  },
  section: {
    marginBottom: 16, // Adds space between sections
    padding: 12, // Adds padding inside each section
    backgroundColor: "#ffffff", // White background for sections
    borderRadius: 16, // Rounds the corners of the section boxes
    elevation: 2, // Adds a shadow effect to the sections
    shadowColor: "#000", // Black shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 3, // Shadow blur radius
  },
  heading: {
    fontSize: 18, // Slightly larger font for headings
    fontWeight: "600", // Semi-bold font weight for headings
    color: "#222", // Darker color for headings
    marginBottom: 4, // Adds space below the heading
  },
  text: {
    fontSize: 16, // Regular font size for text
    color: "#555", // Dark gray text color
    lineHeight: 22, // Increases line spacing for readability
    textAlign: "justify",
  },
});

export default Introduction;
