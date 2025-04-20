import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Alert,
  SafeAreaView,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import Svg, { Circle } from 'react-native-svg'
import { useFocusEffect } from '@react-navigation/native'

const questionsData = [
  {
    question: 'What is the main reason to use a magnetic screwdriver during a PC build?',
    options: ['For faster screw rotation', 'To attract dust', 'To prevent screws from falling', 'To reduce static electricity'],
    answer: 'To prevent screws from falling',
  },
  {
    question: 'What tool helps prevent static electricity from damaging your PC components?',
    options: ['Rubber gloves', 'Wire cutter', 'Anti-static wrist strap', 'Phillips screwdriver'],
    answer: 'Anti-static wrist strap',
  },
  {
    question: 'Where should you install the CPU?',
    options: ['GPU slot', 'Power connector', 'Motherboard socket', 'RAM slot'],
    answer: 'Motherboard socket',
  },
  {
    question: 'What ensures proper CPU placement on the motherboard?',
    options: ['USB guide', 'Retention bracket', 'Alignment arrow', 'Cooling fan'],
    answer: 'Alignment arrow',
  },
  {
    question: 'Which component should be pressed in until the latches click?',
    options: ['SSD', 'RAM', 'CPU', 'PSU'],
    answer: 'RAM',
  },
  {
    question: 'What part of the case should align with the motherboard\'s rear ports?',
    options: ['GPU', 'Side panel', 'I/O shield', 'RAM slot'],
    answer: 'I/O shield',
  },
  {
    question: 'Where is the power supply typically mounted in a case?',
    options: ['Inside the motherboard tray', 'Bottom or top of the case', 'On the GPU bracket', 'Near the CPU'],
    answer: 'Bottom or top of the case',
  },
  {
    question: 'What type of storage is usually installed in the M.2 slot?',
    options: ['HDD', 'SSD', 'Optical Drive', 'USB Drive'],
    answer: 'SSD',
  },
  {
    question: 'Why would you need a small screw for the M.2 SSD?',
    options: ['To hold the PSU', 'To mount the RAM', 'To secure the SSD', 'To align the CPU'],
    answer: 'To secure the SSD',
  },
  {
    question: 'Which slot is used for the GPU?',
    options: ['SATA', 'USB 3.0', 'PCI Express', 'CMOS'],
    answer: 'PCI Express',
  },
  {
    question: 'What must you connect to power the GPU if required?',
    options: ['HDMI cable', 'SATA cable', 'PSU power cable', 'Motherboard audio'],
    answer: 'PSU power cable',
  },
  {
    question: 'Why is cable management important in a PC build?',
    options: ['For faster internet', 'To prevent data loss', 'To improve airflow', 'To increase RGB effects'],
    answer: 'To improve airflow',
  },
  {
    question: 'What do you check in the BIOS after building the PC?',
    options: ['Screen resolution', 'Fan color', 'Component detection', 'Desktop wallpaper'],
    answer: 'Component detection',
  },
  {
    question: 'True or False: A clean and organized workspace makes PC building easier and safer.',
    options: ['True', 'False'],
    answer: 'True',
  },
  {
    question: 'True or False: You should force the CPU into the socket if it doesn’t fit easily.',
    options: ['True', 'False'],
    answer: 'False',
  },
  {
    question: 'True or False: The RAM must be aligned correctly with the slot notches before installation.',
    options: ['True', 'False'],
    answer: 'True',
  },
  {
    question: 'True or False: The GPU is installed before the motherboard.',
    options: ['True', 'False'],
    answer: 'False',
  },
  {
    question: 'True or False: All front-panel connectors should be connected before powering on.',
    options: ['True', 'False'],
    answer: 'True',
  },
  {
    question: 'True or False: The BIOS initializes your system and checks hardware when powered on.',
    options: ['True', 'False'],
    answer: 'True',
  },
  {
    question: 'True or False: If your fans spin, that means the operating system is installed.',
    options: ['True', 'False'],
    answer: 'False',
  },
]

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const initializeQuiz = () => {
  const randomizedQuestions = shuffleArray(questionsData).map((q) => {
    if (q.options.length > 2) {
      return { ...q, options: shuffleArray(q.options)}
    }
    return q
  })
  return randomizedQuestions
}

const interpolateColor = (color1, color2, factor) => {
  const intColor1 = parseInt(color1.slice(1), 16);
  const intColor2 = parseInt(color2.slice(1), 16);
  const r1 = (intColor1 >> 16) & 0xff;
  const g1 = (intColor1 >> 8) & 0xff;
  const b1 = intColor1 & 0xff;
  const r2 = (intColor2 >> 16) & 0xff;
  const g2 = (intColor2 >> 8) & 0xff;
  const b2 = intColor2 & 0xff;
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  return `rgb(${r},${g},${b})`;
};

const getTimerColor = (seconds) => {
  if (seconds > 15) {
    const factor = (30 - seconds) / 15;
    return interpolateColor('#03A9F4', '#FFA726', factor);
  } else {
    const factor = (15 - seconds) / 10;
    return interpolateColor('#FFA726', '#E53935', factor);
  }
};

const BuildScreen = ({ navigation, route }) => {
  const [questions, setQuestions] = useState(initializeQuiz())
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedOption, setSelectedOption] = useState(null)
    const [answers, setAnswers] = useState([])
    const [timer, setTimer] = useState(30)
    const [quizFinished, setQuizFinished] = useState(false)
  
    useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            if (!quizFinished) {
              Alert.alert('Quiz in progress')
              return true
            }
            return false
          };
          BackHandler.addEventListener('hardwareBackPress', onBackPress)
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress)
        }, [quizFinished])
    )
  
    useEffect(() => {
      if (!quizFinished) {
        setTimer(30);
        const interval = setInterval(() => {
          setTimer((prev) => {
            if (prev === 1) {
              clearInterval(interval);
              handleNext();
              return 30;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [currentQuestion, quizFinished]);
  
    const handleOptionPress = (option) => {
      if (selectedOption === null) {
        setSelectedOption(option)
        setAnswers([
          ...answers,
          {
            question: questions[currentQuestion].question,
            options: questions[currentQuestion].options,
            answer: questions[currentQuestion].answer,
            selected: option,
          },
        ])
      }
    }
  
    const handleNext = () => {
      setSelectedOption(null)
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setQuizFinished(true)
      }
    }
  
    const calculateScore = () => {
      return answers.filter(answer => answer.selected === answer.answer).length;
    };
  
    useEffect(() => {
      if (quizFinished) {
        const score = calculateScore();
        navigation.navigate('ReviewQuiz', { answers, score, onGoBack: route.params?.onGoBack });
        setQuestions(initializeQuiz());
        setCurrentQuestion(0);
        setAnswers([]);
        setQuizFinished(false);
      }
    }, [quizFinished, answers, navigation]);
  
  
    const current = questions[currentQuestion];
    const totalQuestions = questions.length;
    const progressFraction = (currentQuestion + 1) / totalQuestions;
    const progressWidth = `${Math.round(progressFraction * 100)}%`;
  
  
    const size = 60;
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = timer / 30;
    const strokeDashoffset = circumference * (1 - progress);
  
  
    return (
      <SafeAreaView style={styles.safeContainer}>
            <View style={styles.topBar}>
              <View style={styles.progressContainer}>
                <View style={[styles.progressFill, { width: progressWidth }]} />
              </View>
              <Text style={styles.topQuestionCount}>{`${currentQuestion + 1}/${totalQuestions}`}</Text>
            </View>
      
            <View style={styles.timerCircle}>
              <Svg height={size} width={size}>
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#e6e6e6"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={getTimerColor(timer)}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                />
              </Svg>
              <Text style={styles.timerCircleText}>{timer}</Text>
            </View>
      
            <View style={styles.questionCard}>
              <Text style={styles.questionText}>{current.question}</Text>
              {current.options.map((option, index) => {
                const isSelected = selectedOption === option;
                const isAnswer = option === current.answer;
                const backgroundColor = isSelected
                  ? isAnswer
                    ? '#4CAF50'
                    : '#FFCDD2'
                  : '#f0f0f0';
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleOptionPress(option)}
                    style={[styles.optionButton, { backgroundColor }]}
                    disabled={selectedOption !== null}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
      
            {selectedOption && (
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>
                  {currentQuestion === totalQuestions - 1 ? 'Finish' : 'Next'}
                </Text>
              </TouchableOpacity>
            )}
          </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: '#F9FAFB',
      padding: 30
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 16,
      marginTop: 20,
    },
    progressContainer: {
      flex: 1,
      height: 8,
      backgroundColor: '#E0E0E0',
      borderRadius: 4,
      marginRight: 8,
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#FFA726',
      borderRadius: 4,
    },
    topQuestionCount: {
      fontSize: 16,
      color: '#555',
    },
    timerCircle: {
      alignSelf: 'center',
      marginTop: 20,
      width: 60,
      height: 60,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },
    timerCircleText: {
      position: 'absolute',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#555',
    },
    questionCard: {
      backgroundColor: '#fff',
      marginHorizontal: 16,
      marginTop: 20,
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    questionText: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
      color: '#333',
    },
    optionButton: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      marginVertical: 8,
    },
    optionText: {
      fontSize: 16,
    },
    nextButton: {
      marginTop: 30,
      backgroundColor: '#1A73E8',
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginHorizontal: 16,
    },
    nextButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  })

export default BuildScreen