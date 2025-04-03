import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SharedElement } from "react-navigation-shared-element";

const ARROW_OFFSET = 5;
const ARROW_HALF_WIDTH = 10;
const PANEL_OPEN_HEIGHT = 500;

const HomeScreen = () => {
  const [selectedButton, setSelectedButton] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isQuizPanelOpen, setIsQuizPanelOpen] = useState(false);
  const router = useRouter();

  const panelHeight = useRef(new Animated.Value(0)).current;

  // Arrow position
  const arrowX = useRef(new Animated.Value(0)).current;
  const arrowY = useRef(new Animated.Value(0)).current;

  // Refs for measuring
  const containerRef = useRef(null);
  const learnRef = useRef(null);
  const quizRef = useRef(null);

  // Toggle the Learning panel open/close
  const togglePanel = () => {
    if (isPanelOpen) {
      Animated.timing(panelHeight, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => setIsPanelOpen(false));
    } else {
      setIsPanelOpen(true);
      Animated.timing(panelHeight, {
        toValue: PANEL_OPEN_HEIGHT,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  // Toggle the Quiz panel open/close (fixed useNativeDriver typo)
  const toggleQuizPanel = () => {
    if (isQuizPanelOpen) {
      Animated.timing(panelHeight, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => setIsQuizPanelOpen(false));
    } else {
      setIsQuizPanelOpen(true);
      Animated.timing(panelHeight, {
        toValue: PANEL_OPEN_HEIGHT,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  // Move arrow under tapped button
  const moveArrow = (buttonRef) => {
    if (!buttonRef.current || !containerRef.current) return;
    buttonRef.current.measureLayout(
      containerRef.current,
      (x, y, width, height) => {
        Animated.spring(arrowX, {
          toValue: x + width / 2 - ARROW_HALF_WIDTH,
          useNativeDriver: false,
        }).start();
        Animated.spring(arrowY, {
          toValue: y + height + ARROW_OFFSET,
          useNativeDriver: false,
        }).start();
      },
      (err) => console.log("measureLayout error:", err)
    );
  };

  // Button press handler
  const handlePress = (button) => {
    setSelectedButton(button);
    if (button === "learn") {
      moveArrow(learnRef);
      if (isQuizPanelOpen) {
        // Close the quiz panel first then open the learning panel
        Animated.timing(panelHeight, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start(() => {
          setIsQuizPanelOpen(false);
          togglePanel();
        });
      } else {
        togglePanel();
      }
    } else if (button === "quiz") {
      moveArrow(quizRef);
      if (isPanelOpen) {
        // Close the learning panel first then open the quiz panel
        Animated.timing(panelHeight, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start(() => {
          setIsPanelOpen(false);
          toggleQuizPanel();
        });
      } else {
        toggleQuizPanel();
      }
    }
  };

  // Keep arrow aligned under the button while scrolling
  const handleScroll = () => {
    if (selectedButton === "learn") moveArrow(learnRef);
    if (selectedButton === "quiz") moveArrow(quizRef);
  };

  return (
    <ScrollView
      style={styles.container}
      scrollEventThrottle={16}
      onScroll={handleScroll}
    >
      <View ref={containerRef} style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/CpuLogo.png")}
            style={styles.logo}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.comsim}>ComSim</Text>
            <Text style={styles.tagline}>
              Simulate Your Dream PC, Learn the Skills
            </Text>
          </View>
        </View>

        {/* Slogan */}
        <View style={styles.mainTextRow}>
          <Text style={styles.mainLeft}>Assemble. Customize. Optimize.</Text>
          <Text style={styles.mainRight}>Go Beyond!</Text>
        </View>

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/Build_it_Today.png")}
            style={styles.pcImage}
          />
          <Text style={styles.buildText}>Build it Today!</Text>
        </View>

        {/* "Get Started" Title */}
        <Text style={styles.sectionTitle}>Get Started</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            ref={learnRef}
            style={[
              styles.button,
              selectedButton === "learn" && styles.selectedButton,
            ]}
            onPress={() => handlePress("learn")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedButton === "learn" && styles.selectedButtonText,
              ]}
            >
              Learn
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            ref={quizRef}
            style={[
              styles.button,
              selectedButton === "quiz" && styles.selectedButton,
            ]}
            onPress={() => handlePress("quiz")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedButton === "quiz" && styles.selectedButtonText,
              ]}
            >
              Quiz
            </Text>
          </TouchableOpacity>
        </View>

        {/* Arrow */}
        {selectedButton !== "" && (
          <Animated.View
            style={[
              styles.arrow,
              {
                transform: [{ translateX: arrowX }, { translateY: arrowY }],
              },
            ]}
          />
        )}

        {/* Single animated panel that conditionally renders content */}
        <Animated.View style={[styles.panel, { height: panelHeight }]}>
          {isPanelOpen && selectedButton === "learn" && (
            <LinearGradient
              colors={["#E2DFDF", "#ffffff"]}
              style={styles.gradientPanel}
            >
              <TouchableOpacity onPress={() => router.push("/Learning_Modules/Introduction")}>
                <ModuleCard
                  image={require("@/assets/images/ComponentMod.png")}
                  title="Introduction to pc components"
                  subtitle="A module where you can learn the basics of components."
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/LearningModules/Parts")}>
                <ModuleCard
                  image={require("@/assets/images/SelectionMod.png")}
                  title="Parts selection guide for building pc"
                  subtitle="Select, upgrade, and know everything about the parts."
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/How_To")}>
                <ModuleCard
                  image={require("@/assets/images/BuildingMod.png")}
                  title="How to build your pc?"
                  subtitle="Get started at how to build it from scratch!"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/After_Build")}>
                <ModuleCard
                  image={require("@/assets/images/AfterBuildMod.png")}
                  title="What to do after building your pc?"
                  subtitle="Having trouble after building your pc? this module is for you."
                />
              </TouchableOpacity>
            </LinearGradient>
          )}

          {isQuizPanelOpen && selectedButton === "quiz" && (
            <LinearGradient
              colors={["#E2DFDF", "#ffffff"]}
              style={styles.gradientPanel}
            >

              <TouchableOpacity onPress={() => router.push("")}>

              </TouchableOpacity>
             
            </LinearGradient>
          )}
        </Animated.View>

        <View style={{ height: 0 }} />
      </View>
    </ScrollView>
  );
};

const ModuleCard = ({ image, title, subtitle }) => (
  <View style={styles.moduleCard}>
    <Image source={image} style={styles.moduleImage} />
    <View style={{ flex: 1 }}>
      <Text style={styles.moduleTitle}>{title}</Text>
      <Text style={styles.moduleSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    position: "relative",
    padding: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 50,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginBottom: 50,
    top: 50,
  },
  headerTextContainer: {
    justifyContent: "center",
  },
  comsim: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1A73E8",
  },
  tagline: {
    fontSize: 12,
    fontWeight: "300",
    color: "#212121",
  },
  mainTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    alignItems: "center",
  },
  mainLeft: {
    fontSize: 12,
    fontWeight: "300",
    color: "#212121",
  },
  mainRight: {
    fontSize: 12,
    fontWeight: "300",
    color: "#1A73E8",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
  },
  pcImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
  buildText: {
    position: "absolute",
    bottom: 10,
    left: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    padding: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "400",
    color: "#1A73E8",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
  selectedButton: {
    backgroundColor: "#FFD700",
  },
  selectedButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  arrow: {
    position: "absolute",
    zIndex: 999,
    width: 0,
    height: 0,
    borderLeftWidth: ARROW_HALF_WIDTH,
    borderRightWidth: ARROW_HALF_WIDTH,
    borderTopWidth: ARROW_HALF_WIDTH,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#FFD700",
  },
  panel: {
    width: "100%",
    overflow: "hidden",
    marginTop: 20,
  },
  gradientPanel: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  moduleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  moduleImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  moduleTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "capitalize",
  },
  moduleSubtitle: {
    fontSize: 12,
    color: "#666",
  },
});

export default HomeScreen;
