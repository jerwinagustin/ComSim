import React, { useState, useRef, useEffect } from "react";
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
import Svg, { Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useNavigation, useLocalSearchParams, useFocusEffect } from "expo-router";
import { SharedElement } from "react-navigation-shared-element";
import { useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';






const ARROW_OFFSET = 5;
const ARROW_HALF_WIDTH = 10;
const PANEL_OPEN_HEIGHT = 500;

const CircularProgress = ({ score, size = 55, strokeWidth = 4, label }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = (score / 20) * 100;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  let strokeColor = "gray";
  if (score > 0 && score <= 9) {
    strokeColor = "red";
  } else if (score >= 10 && score <= 14) {
    strokeColor = "orange";
  } else if (score >= 15 && score < 20) {
    strokeColor =  "#108ee9";
  } else if (score === 20) {
    strokeColor = "#87d068";
  }

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={strokeColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={[StyleSheet.absoluteFill, styles.center]}>
        <Text style={styles.scoreText}>
          {label ? label : `${score}/20`}
        </Text>
      </View>
    </View>
  );
};


const QuizCard = ({ image, title, subtitle, score }) => {
  return (
    <View style={styles.quizCardContainer}>
      <View style={styles.quizCardLeft}>
        <Image source={image} style={styles.moduleImage} />
        <View style={{ flex: 1, marginLeft: 0 }}>
          <Text style={styles.moduleTitle}>{title}</Text>
          <Text style={styles.moduleSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.quizCardRight}>
        <CircularProgress
          score={score}
          label={score === 20 ? "PERFECT" : undefined}
        />
      </View>
    </View>
  );
};


const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isQuizPanelOpen, setIsQuizPanelOpen] = useState(false);
  const [partsScore, setPartsScore] = useState(0);
  const [ComponentsScore, setComponentsScore] = useState(0);
  const [BuildScore, setBuildScore] = useState(0);
  const [AfterBuildScore, setAfterBuildScore] = useState(0);
  const [introductionComplete, setIntroductionComplete] = useState(false);
  const [partsComplete, setPartsComplete] = useState(false);
  const [howToComplete, setHowToComplete] = useState(false);
  const [afterBuildComplete, setAfterBuildComplete] = useState(false);
  const router = useRouter();
  const panelHeight = useRef(new Animated.Value(0)).current;
  const arrowX = useRef(new Animated.Value(0)).current;
  const arrowY = useRef(new Animated.Value(0)).current;
  const containerRef = useRef(null);
  const learnRef = useRef(null);
  const quizRef = useRef(null);


 
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params?.partsScore !== undefined) {
      setPartsScore(Number(params.partsScore));
    }
  }, [params]);

  useEffect(() => {
    if (params?.ComponentsScore !== undefined) {
      setComponentsScore(Number(params.ComponentsScore));
    }
  }, [params]);


  useEffect(() => {
    if (params?.BuildScore !== undefined) {
      setBuildScore(Number(params.BuildScore));
    }
  }, [params]);
  useEffect(() => {
    if (params?.AfterBuildScore !== undefined) {
      setAfterBuildScore(Number(params.AfterBuildScore));
    }
  }, [params]);



  useEffect(() => {
    const loadCompletionFlags = async () => {
      const intro = await AsyncStorage.getItem("introComplete");
      const parts = await AsyncStorage.getItem("partsComplete");
      const howTo = await AsyncStorage.getItem("howToComplete");
      const afterBuild = await AsyncStorage.getItem("afterBuildComplete");
  
      setIntroductionComplete(intro === "true");
      setPartsComplete(parts === "true");
      setHowToComplete(howTo === "true");
      setAfterBuildComplete(afterBuild === "true");
    };
  
    const unsubscribe = navigation.addListener('focus', loadCompletionFlags);
    return unsubscribe;
  }, [navigation]);

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

  const moveArrow = (buttonRef) => {
    if (!buttonRef.current || !containerRef.current) return;
    buttonRef.current.measureLayout(
      containerRef.current,
      (x, y, width, height) => {
        Animated.spring(arrowX, {
          toValue: x + width / 2 - ARROW_HALF_WIDTH,
          useNativeDriver: false,
          easing: Easing.ease
        }).start();
        Animated.spring(arrowY, {
          toValue: y + height + ARROW_OFFSET,
          useNativeDriver: false,
          easing: Easing.ease
        }).start();
      },
      (err) => console.log("measureLayout error:", err)
    );
  };

  const handlePress = (button) => {
    setSelectedButton(button);
    if (button === "learn") {
      moveArrow(learnRef);
      if (isQuizPanelOpen) {
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


        <View style={styles.mainTextRow}>
          <Text style={styles.mainLeft}>Assemble. Customize. Optimize.</Text>
          <Text style={styles.mainRight}>Go Beyond!</Text>
        </View>


        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/Build_it_Today.png")}
            style={styles.pcImage}
          />
          <Text style={styles.buildText}>Build it Today!</Text>
        </View>

        <Text style={styles.sectionTitle}>Get Started</Text>

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

        {/* Animated Panel */}
        <Animated.View style={[styles.panel, { height: panelHeight }]}>
          {isPanelOpen && selectedButton === "learn" && (
            <LinearGradient
              colors={["#E2DFDF", "#ffffff"]}
              style={styles.gradientPanel}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Introduction", {onGoBack: () => setIntroductionComplete(true)})}>

                <ModuleCard
                  image={require("@/assets/images/ComponentMod.png")}
                  title="Introduction to pc components"
                  subtitle="A module where you can learn the basics of components."
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Parts", {onGoBack: () => setPartsComplete(true)})}>

                <ModuleCard
                  image={require("@/assets/images/SelectionMod.png")}
                  title="Parts selection guide for building pc"
                  subtitle="Select, upgrade, and know everything about the parts."
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("How_To", {onGoBack: () => setHowToComplete(true)})}>

                <ModuleCard
                  image={require("@/assets/images/BuildingMod.png")}
                  title="How to build your pc?"
                  subtitle="Get started at how to build it from scratch!"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("After_Build", {onGoBack: () => setAfterBuildComplete(true)})}>

                <ModuleCard
                  image={require("@/assets/images/AfterMod.png")}
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
              <TouchableOpacity 
              disabled={!introductionComplete}
              style={{ opacity: introductionComplete ? 1 : 0.4 }}
              onPress={() => navigation.navigate("ComponentsQuiz", { onGoBack: (score) => setComponentsScore(score) })}
              > 
                <QuizCard
                  image={require("@/assets/images/ComponentMod.png")}
                  title="PC Components Quiz"
                  subtitle="Tackle Your Knowledge of PC Components"
                  score={ComponentsScore}
                />
              </TouchableOpacity>

              <TouchableOpacity 
              disabled={!partsComplete}
              style={{ opacity: partsComplete ? 1 : 0.4 }}
              onPress={() => navigation.navigate("PartsQuiz", { onGoBack: (score) => setPartsScore(score) })}
              >
                <QuizCard 
                  image={require("@/assets/images/SelectionMod.png")}
                  title="PC Parts Quiz"
                  subtitle="Do you know how to choose the right PC parts? Take this quiz to find out!"
                  score={partsScore}
                />

              </TouchableOpacity>

              <TouchableOpacity 
              disabled={!howToComplete}
              style={{ opacity: howToComplete ? 1 : 0.4 }}
              onPress={() => navigation.navigate("BuildQuiz", { onGoBack: (score) => setBuildScore(score) })}
              >
                <QuizCard
                  image={require("@/assets/images/BuildingMod.png")}
                  title="PC Builder Quiz"
                  subtitle="Think you're ready to build a PC? Building a PC is essential—test your knowledge with this quiz!"
                  score={BuildScore}
                />
              </TouchableOpacity>

              <TouchableOpacity 
              disabled={!afterBuildComplete}
              style={{ opacity: afterBuildComplete ? 1 : 0.4 }}
              onPress={() => navigation.navigate("AfterBuildingQuiz", { onGoBack: (score) => setAfterBuildScore(score) })}
              >
                <QuizCard
                  image={require("@/assets/images/AfterMod.png")}
                  title="PC Setup Quiz"
                  subtitle="Do you know exactly what to do after building your PC? Take the quiz to find out!"
                  score={AfterBuildScore}
                />
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
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
  },
  quizCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  quizCardLeft: {
    flexDirection: "row",
    alignItems: "Center",
    flex: 1,
  },
  quizCardRight: {
    marginLeft: 10,
  },
});

export default HomeScreen;
