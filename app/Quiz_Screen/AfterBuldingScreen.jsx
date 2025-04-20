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
    question: 'What is the BIOS responsible for?',
    options: ['Installing games', 'Detecting viruses', 'Initializing hardware before the OS loads', 'Controlling Wi-Fi connections'],
    answer: 'Initializing hardware before the OS loads',
  },
  {
    question: 'Which key setting should be adjusted in the BIOS to ensure the system boots correctly?',
    options: ['Screen brightness', 'Boot order', 'Background color', 'Resolution setting'],
    answer: 'Boot order',
  },
  {
    question: 'What does XMP do?',
    options: ['Increases fan speed', 'Enables safe mode', 'Optimizes RAM performance', 'Locks the BIOS'],
    answer: 'Optimizes RAM performance',
  },
  {
    question: 'How do you typically install an operating system on a new PC?',
    options: ['Insert a CD', 'Use a bootable USB drive', 'Download from BIOS', 'Use a smartphone'],
    answer: 'Use a bootable USB drive',
  },
  {
    question: 'Which operating systems are most commonly installed after a PC build?',
    options: ['Linux Mint or Android', 'macOS or DOS', 'Windows 10 or Windows 11', 'ChromeOS or Ubuntu'],
    answer: 'Windows 10 or Windows 11',
  },
  {
    question: 'What are drivers used for?',
    options: ['Controlling fan lights', 'Connecting the internet', 'Letting the OS communicate with hardware', 'Managing your password'],
    answer: 'Letting the OS communicate with hardware',
  },
  {
    question: 'Where should you go to get the most up-to-date drivers?',
    options: ['Local store', 'YouTube', 'Manufacturer’s website', 'Recycle bin'],
    answer: 'Manufacturer’s website',
  },
  {
    question: 'Why is antivirus software important after a PC build?',
    options: ['To speed up downloads', 'To boost gaming FPS', 'To protect your system from malware', 'To update drivers automatically'],
    answer: 'To protect your system from malware',
  },
  {
    question: 'Which feature helps protect your personal information online?',
    options: ['RGB control', 'Disk cleaner', 'Real-time protection', 'Bluetooth pairing'],
    answer: 'Real-time protection',
  },
  {
    question: 'What should you do before installing games?',
    options: ['Adjust the monitor', 'Back up your files', 'Install essential software and security', 'Paint your PC case'],
    answer: 'Install essential software and security',
  },
  {
    question: 'Where is it best to install large games for better storage management?',
    options: ['On the desktop', 'In the cloud', 'On a separate drive', 'Inside BIOS'],
    answer: 'On a separate drive',
  },
  {
    question: 'What is a benefit of backing up your data?',
    options: ['Reduces lag', 'Improves screen resolution', 'Protects your files in case of system failure', 'Extends battery life'],
    answer: 'Protects your files in case of system failure',
  },
  {
    question: 'Which of the following is a form of PC personalization?',
    options: ['Replacing your motherboard', 'Disabling all RGB lights', 'Setting a desktop background', 'Running in safe mode'],
    answer: 'Setting a desktop background',
  },
  {
    question: 'True or False: BIOS can only be accessed after Windows is fully loaded.',
    options: ['True', 'False'],
    answer: 'False',
  },
  {
    question: 'True or False: Installing the operating system is one of the final steps after building a PC.',
    options: ['True', 'False'],
    answer: 'True',
  },
  {
    question: 'True or False: Windows automatically installs every driver you need.',
    options: ['True', 'False'],
    answer: 'False',
  },
  {
    question: 'True or False: An unprotected PC is vulnerable as soon as it connects to the internet.',
    options: ['True', 'False'],
    answer: 'True',
  },
  {
    question: "True or False: It's unnecessary to back up files if you're not using the cloud.",
    options: ['True', 'False'],
    answer: 'False',
  },
  {
    question: 'True or False: Personalizing your desktop helps improve your workflow and comfort.',
    options: ['True', 'False'],
    answer: 'True',
  },
  {
    question: 'True or False: Games should be installed before updating your drivers.',
    options: ['True', 'False'],
    answer: 'False',
  },
];

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



const AfterBuldingScreen = ({ navigation, route }) => {
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

export default AfterBuldingScreen