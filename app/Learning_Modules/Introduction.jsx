import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, View, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Image asset imports
const images = {
  AM5: require("@/assets/images/Introduction/AM5.png"),
  LGA1700: require("@/assets/images/Introduction/LGA1700.png"),
  MotherBoard: require("@/assets/images/Introduction/MotherBoard.png"),
  RAM: require("@/assets/images/Introduction/RAM.png"),
  HDD: require("@/assets/images/Introduction/HDD.png"),
  SATA_SSD: require("@/assets/images/Introduction/SATA_SSD.png"),
  NVME_SSD: require("@/assets/images/Introduction/NVME_SSD.png"),
  POWER_SUPPLY: require("@/assets/images/Introduction/POWER_SUPPLY.png"),
  GPU: require("@/assets/images/Introduction/GPU.png"),
  AIR_COOLER: require("@/assets/images/Introduction/AIR_COOLER.png"),
  Thermal_Paste: require("@/assets/images/Introduction/Thermal_Paste.png"),
  AIO: require("@/assets/images/Introduction/AIO.png"),
  Case_Fans: require("@/assets/images/Introduction/Case_Fans.png"),
  CASE: require("@/assets/images/Introduction/CASE.png"),
};

const Introduction = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleScroll = (event) => {
    if (completed) return;
    const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;
    const totalScrollable = contentSize.height - layoutMeasurement.height;
    const scrolled = Math.min(contentOffset.y / totalScrollable, 1);
    setScrollPercentage(scrolled);
    if (scrolled >= 1) {
      setCompleted(true);
      AsyncStorage.setItem("introComplete", "true");
    }
  };

  const fillColor = completed ? "#87d068" : "#1A73E8";

  return (
    <View style={styles.wrapper}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${scrollPercentage * 100}%`, backgroundColor: fillColor }]} />
        <Text style={styles.progressText}>{completed ? "Components Mastered" : `${Math.floor(scrollPercentage * 100)}%`}</Text>
      </View>

      <ScrollView style={styles.container} onScroll={handleScroll} scrollEventThrottle={16}>

        <Text style={styles.title}>Module 1: PC Components Deep Dive</Text>
        <Text style={styles.description}>
          Explore each core PC component—what it does, how it works, and key specs to look for when building or upgrading.
        </Text>

        {/* CPU */}
        <View style={styles.section}>
          <Text style={styles.heading}>CPU (Central Processing Unit)</Text>
          <Text style={styles.text}>The CPU is the brain of your PC, executing instructions and managing tasks.</Text>
          <Text style={styles.subBullet}>• Socket & Chipset: Ensure CPU socket (e.g., AM5, LGA1700) matches motherboard; chipset (X670, Z790) defines PCIe lanes, memory support.</Text>
          <Text style={styles.subBullet}>• Cores & Threads: More cores/threads (e.g., 8C/16T) improve multitasking and multi-threaded apps like rendering.</Text>
          <Text style={styles.subBullet}>• Clock Speed: Base vs. boost clocks in GHz; higher speeds benefit single-thread tasks.</Text>
          <Text style={styles.subBullet}>• TDP & Power Delivery: Thermal Design Power indicates cooling needs; pair with suitable cooler and quality VRMs.</Text>
          <View style={styles.inlineImages}>
            <Image source={images.AM5} style={styles.image} />
            <Image source={images.LGA1700} style={styles.image} />
          </View>
        </View>

        {/* Motherboard */}
        <View style={styles.section}>
          <Text style={styles.heading}>Motherboard</Text>
          <Text style={styles.text}>The motherboard connects all parts and provides power, data interfaces, and expansion.</Text>
          <Text style={styles.subBullet}>• Form Factor: ATX, Micro-ATX, Mini-ITX determine size and expansion slots.</Text>
          <Text style={styles.subBullet}>• VRM & Power Phases: Higher phase counts (e.g., 12+2) yield stable power, essential for overclocking.</Text>
          <Text style={styles.subBullet}>• Memory Slots & Channels: Dual or quad-channel RAM slots; populate correct slots for optimal bandwidth.</Text>
          <Text style={styles.subBullet}>• Storage Connectors: M.2 (PCIe/SATA), SATA ports; check supported NVMe speeds (PCIe Gen4/5).</Text>
          <Text style={styles.subBullet}>• I/O Features: USB types, Ethernet speed, audio codecs, onboard Wi-Fi options.</Text>
          <Image source={images.MotherBoard} style={styles.image} />
        </View>

        {/* Memory */}
        <View style={styles.section}>
          <Text style={styles.heading}>Memory (RAM)</Text>
          <Text style={styles.text}>RAM stores data for quick access by the CPU.</Text>
          <Text style={styles.subBullet}>• DDR4 vs. DDR5: DDR5 offers higher bandwidth and on-die ECC; ensure motherboard support.</Text>
          <Text style={styles.subBullet}>• Capacity: 16GB minimum; 32GB+ for heavy multitasking, editing, virtualization.</Text>
          <Text style={styles.subBullet}>• Speed & Latency: Measured in MHz and CL timings; choose balanced kits (e.g., 3600MHz CL16).</Text>
          <Image source={images.RAM} style={styles.image} />
        </View>

        {/* Storage */}
        <View style={styles.section}>
          <Text style={styles.heading}>Storage</Text>
          <Text style={styles.text}>Storage holds your OS, applications, and files.</Text>
          <Text style={styles.subBullet}>• HDD: Affordable, high capacity (~100–200 MB/s). Best for bulk storage.</Text>
          <Image source={images.HDD} style={styles.image} />
          <Text style={styles.subBullet}>• SATA SSD: Mid-range speed (500–600 MB/s), cost-effective OS drive.</Text>
          <Image source={images.SATA_SSD} style={styles.image} />
          <Text style={styles.subBullet}>• NVMe SSD: High speed (1,500–7,000 MB/s) via M.2 slot; ideal for OS and workloads.</Text>
          <Image source={images.NVME_SSD} style={styles.image} />
          <Text style={styles.subBullet}>• TBW Rating: Terabytes Written indicates drive endurance; higher for write-intensive tasks.</Text>
        </View>

        {/* Power Supply */}
        <View style={styles.section}>
          <Text style={styles.heading}>Power Supply (PSU)</Text>
          <Text style={styles.text}>PSU converts AC from the wall to DC for components.</Text>
          <Text style={styles.subBullet}>• Wattage: Sum component TDPs and add ~20% headroom (e.g., 750W for high-end GPU + CPU).</Text>
          <Text style={styles.subBullet}>• Efficiency: Look for 80 PLUS Bronze, Gold, or Platinum ratings for lower heat and bills.</Text>
          <Text style={styles.subBullet}>• Modular Cables: Fully/semi-modular units allow tidy builds by detaching unused cables.</Text>
          <Image source={images.POWER_SUPPLY} style={styles.image} />
        </View>

        {/* Graphics Card */}
        <View style={styles.section}>
          <Text style={styles.heading}>Graphics Card (GPU)</Text>
          <Text style={styles.text}>GPU renders images, video, and compute tasks.</Text>
          <Text style={styles.subBullet}>• Integrated vs. Dedicated: Integrated GPUs handle basic tasks; dedicated cards (NVIDIA/AMD) for gaming/editing.</Text>
          <Text style={styles.subBullet}>• VRAM: 4GB minimum; 8–12GB for 1080p–4K gaming, AI workloads.</Text>
          <Text style={styles.subBullet}>• PCIe Slot & Power: Requires PCIe x16 slot and PCIe power connector(s) (e.g., 6-pin, 8-pin).</Text>
          <Image source={images.GPU} style={styles.image} />
        </View>

        {/* Cooling Solutions */}
        <View style={styles.section}>
          <Text style={styles.heading}>Cooling Solutions</Text>
          <Text style={styles.text}>Cooling prevents overheating and maintains performance.</Text>
          <Text style={styles.subBullet}>• Air Coolers: Tower heatsinks with fans; choose according to TDP support and case clearance.</Text>
          <Image source={images.AIR_COOLER} style={styles.image} />
          <Text style={styles.subBullet}>• Thermal Paste: Apply pea-sized dot; transfer heat between CPU and cooler base.</Text>
          <Image source={images.Thermal_Paste} style={styles.image} />
          <Text style={styles.subBullet}>• AIO Liquid Coolers: Radiator sizes (120/240/360mm) dissipate heat; ensure case compatibility.</Text>
          <Image source={images.AIO} style={styles.image} />
          <Text style={styles.subBullet}>• Case Fans: Position for positive airflow (intake front/bottom, exhaust top/rear).</Text>
          <Image source={images.Case_Fans} style={styles.image} />
        </View>

        {/* Case & Airflow */}
        <View style={styles.section}>
          <Text style={styles.heading}>Case & Airflow</Text>
          <Text style={styles.text}>Case houses all components and directs airflow.</Text>
          <Text style={styles.subBullet}>• Form Factor: Full, mid, or mini tower determines motherboard size support.</Text>
          <Text style={styles.subBullet}>• GPU & Cooler Clearance: Check max GPU length and CPU cooler height.</Text>
          <Text style={styles.subBullet}>• Dust Filters & Cable Management: Removable filters and routing channels keep build clean.</Text>
          <Image source={images.CASE} style={styles.image} />
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { 
    flex: 1, 
    backgroundColor: "#f4f4f4" 
  },
  progressBarContainer: { 
    height: 30, 
    justifyContent: "center", 
    backgroundColor: "#e0e0e0", 
    position: "relative" 
  },
  progressBarFill: { 
    height: "100%", 
    position: "absolute", 
    left: 0, 
    top: 0 
  },
  progressText: { 
    zIndex: 1, 
    textAlign: "center", 
    color: "#000", 
    fontWeight: "bold" },
  container: { 
    flex: 1, 
    padding: 12 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    textAlign: "center", 
    color: "#1A73E8",
    marginTop: 30, 
    marginBottom: 20 
  },
  description: { 
    fontSize: 16, 
    color: "#555", 
    marginBottom: 12, 
    lineHeight: 22 
  },
  section: { 
    marginBottom: 24, 
    padding: 16, 
    backgroundColor: "#fff", 
    borderRadius: 16, 
    elevation: 2, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4 
  },
  heading: { 
    fontSize: 20, 
    fontWeight: "600", 
    color: "#222", 
    marginBottom: 8 
  },
  text: { 
    fontSize: 16, 
    color: "#555", 
    marginBottom: 8, 
    lineHeight: 22 
  },
  subBullet: { 
    fontSize: 15, 
    color: "#555", 
    marginLeft: 16, 
    marginBottom: 6, 
    lineHeight: 20 
  },
  image: {
    width: 120,
    height: 80,
    marginTop: 8,
    resizeMode: "contain"
  },
  inlineImages: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 10
  }
});

export default Introduction;
