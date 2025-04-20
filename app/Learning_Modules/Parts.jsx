import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, View, Dimensions } from "react-native";
import { useFocusEffect, useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Parts = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [completed, setCompleted] = useState(false);
  const navigation = useNavigation();

  const handleScroll = (event) => {
    if (completed) return; // lock once completed

    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollY = event.nativeEvent.contentOffset.y;
    const visibleHeight = event.nativeEvent.layoutMeasurement.height;
    const totalScrollableHeight = contentHeight - visibleHeight;
    const scrolled = Math.min(scrollY / totalScrollableHeight, 1);

    if (scrolled >= 1) {
      setCompleted(true);
      setScrollPercentage(1);
      AsyncStorage.setItem(	"partsComplete", "true");

    } else {
      setScrollPercentage(scrolled);
    }
  };

  // decide fill color based on completion
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
          <Text style={styles.heading}>1. CPU (Central Processing Unit)</Text>
          <Text style={styles.text}>
            The CPU is often called the "brain" of your computer. It processes the instructions from your programs and operating system.{"\n\n"}
            When choosing a CPU, consider what you’ll use your PC for—like gaming, video editing, or general productivity. Intel and AMD are the two main brands. Both offer excellent options, but you need to make sure the CPU you choose is compatible with your motherboard.{"\n\n"}
            A higher number of cores is better for multitasking and heavy workloads (like video rendering or running virtual machines), while higher clock speeds benefit gaming and basic tasks.{"\n\n"}
            For most users looking for a balance between gaming and productivity, the AMD Ryzen 5 offers strong performance at a reasonable price.
          </Text>
        </View>

        {/* Motherboard Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>2. Motherboard</Text>
          <Text style={styles.text}>
            The motherboard connects all your computer parts together. It's essential to match the chipset and socket of the motherboard to your CPU to ensure they work properly.{"\n\n"}
            Motherboards also come with a variety of features, so choose one that fits your needs. Consider the number of RAM slots—more slots mean you can add more memory later.{"\n\n"}
            For light use, two RAM slots are usually enough. For gaming or professional work, choose a board with four or more slots so you can upgrade easily.{"\n\n"}
            Also look at expansion options, like:
            {"\n"}- PCIe slots for graphics cards or Wi-Fi cards
            {"\n"}- M.2 slots for fast SSDs
            {"\n"}- Plenty of USB ports for peripherals{"\n\n"}
            Choosing the right motherboard ensures better performance, upgrade potential, and smooth compatibility.
          </Text>
        </View>

        {/* RAM Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>3. RAM (Memory)</Text>
          <Text style={styles.text}>
            RAM helps your computer run multiple programs at once. The more RAM you have, the more tasks your computer can handle smoothly.{"\n\n"}
            For gaming and general productivity, 16GB of RAM is the sweet spot. It allows you to game, browse the web, and run programs without slowdowns.{"\n\n"}
            If you want even better performance, choose RAM that supports XMP (for Intel) or DOCP (for AMD). These profiles let your RAM run at higher speeds than the default settings, improving performance in games and apps.{"\n\n"}
            When buying RAM, also check:
            {"\n"}- Speed (MHz): Faster RAM improves performance in some tasks
            {"\n"}- Latency (CL): Lower numbers are better{"\n\n"}
            Make sure your motherboard supports the RAM type (like DDR4 or DDR5) and the speed you're buying.
          </Text>
        </View>

        {/* Storage Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>4. Storage</Text>
          <Text style={styles.text}>
            Your storage drive holds all your files, games, and the operating system.{"\n\n"}
            - SSD (Solid State Drive): Much faster than traditional hard drives. It helps your PC boot quickly and loads programs fast.{"\n"}
            - HDD (Hard Disk Drive): Slower, but good for storing large files like movies or backups.{"\n"}
            - NVMe M.2 SSD: The fastest type of storage. Ideal for those who want top performance with quick game and program loading times.{"\n\n"}
            Many users combine a smaller SSD for speed and a larger HDD for storage.
          </Text>
        </View>

        {/* GPU Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>5. GPU (Graphics Card)</Text>
          <Text style={styles.text}>
            The GPU handles everything you see on the screen. It's especially important for gaming, video editing, and 3D design.{"\n\n"}
            - For gaming, look for a GPU that can run your favorite games smoothly at your desired resolution.{"\n"}
            - For creative work (like editing or rendering), choose one with more VRAM (video memory).{"\n"}
            - Also check cooling—a well-cooled GPU runs better and lasts longer.{"\n\n"}
            Nvidia and AMD are the two main GPU brands. Choose based on your needs and budget.
          </Text>
        </View>

        {/* PSU Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>6. Power Supply (PSU)</Text>
          <Text style={styles.text}>
            The power supply gives energy to all your PC parts. It's important to get the right wattage and quality.{"\n\n"}
            - Use an online PSU calculator to estimate how much power your system needs based on your CPU, GPU, and other parts.{"\n"}
            - Choose a high-efficiency PSU rated 80+ Bronze, Silver, Gold, or higher. These are safer, more reliable, and help reduce electricity use.{"\n\n"}
            A good PSU ensures your PC runs smoothly and protects it from power-related damage.
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
});

export default Parts;
