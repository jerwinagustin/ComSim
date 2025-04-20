import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Alert,
  SafeAreaView,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useFocusEffect } from '@react-navigation/native';

// Define your full quiz data with 20 questions
const questionsData = [
  {
    question: 'What is the main function of the CPU in a computer?',
    options: ['Store data', 'Render graphics', 'Process instructions', 'Control internet speed'],
    answer: 'Process instructions',
  },
  {
    question: 'Which brand is NOT mentioned as a CPU manufacturer in the module?',
    options: ['Intel', 'AMD', 'NVIDIA', 'None of the above'],
    answer: 'NVIDIA',
  },
  {
    question: 'A higher number of CPU cores is best for:',
    options: ['Gaming only', 'Single-task operations', 'Multitasking and heavy workloads', 'Watching videos'],
    answer: 'Multitasking and heavy workloads',
  },
  {
    question: 'What must match between the CPU and motherboard to ensure compatibility?',
    options: ['GPU type', 'Socket and chipset', 'PSU wattage', 'Number of USB ports'],
    answer: 'Socket and chipset',
  },
  {
    question: 'What is the benefit of having more RAM slots on a motherboard?',
    options: ['More RGB lighting', 'Better internet speed', 'Easier memory upgrades', 'Faster GPU'],
    answer: 'Easier memory upgrades',
  },
  {
    question: 'Which slot is primarily used for installing a graphics card?',
    options: ['USB', 'M.2', 'PCIe', 'SATA'],
    answer: 'PCIe',
  },
  {
    question: 'Which type of RAM profile helps unlock higher memory speeds?',
    options: ['SSD', 'PCIe', 'XMP/DOCP', 'HDMI'],
    answer: 'XMP/DOCP',
  },
  {
    question: 'What is considered the “sweet spot” amount of RAM for gaming and productivity?',
    options: ['4GB', '8GB', '16GB', '32GB'],
    answer: '16GB',
  },
  {
    question: 'Which storage option provides the fastest performance?',
    options: ['HDD', 'NVMe M.2 SSD', 'SATA SSD', 'USB Flash Drive'],
    answer: 'NVMe M.2 SSD',
  },
  {
    question: 'What combination of storage devices is commonly used by many users?',
    options: ['2 HDDs', 'Only USB storage', 'SSD for speed, HDD for storage', 'Only NVMe SSD'],
    answer: 'SSD for speed, HDD for storage',
  },
  {
    question: 'Which component is responsible for displaying images on your screen?',
    options: ['PSU', 'CPU', 'GPU', 'RAM'],
    answer: 'GPU',
  },
  {
    question: 'What GPU feature is especially important for video editing?',
    options: ['RGB lighting', 'VRAM', 'Core count', 'Screen resolution'],
    answer: 'VRAM',
  },
  {
    question: 'Which GPU brands are mentioned in the module?',
    options: ['AMD and Intel', 'Nvidia and AMD', 'Intel and Apple', 'Nvidia and ASUS'],
    answer: 'Nvidia and AMD',
  },
  {
    question: 'What rating should you look for in a quality power supply?',
    options: ['60+ Bronze', '80+ Bronze or higher', '100+ Gold', '40+ Platinum'],
    answer: '80+ Bronze or higher',
  },
  {
    question: 'Why is using a PSU calculator recommended?',
    options: ['To check GPU compatibility', 'To design your PC case', 'To estimate power needs', 'To increase internet speed'],
    answer: 'To estimate power needs',
  },
  // True or False questions – options remain unshuffled
  {
    question: 'True or False: A higher RAM speed (in MHz) can improve performance in some tasks.',
    options: ['True', 'False'],
    answer: 'True',
  },
  {
    question: 'True or False: The CPU and GPU are the same component in a computer.',
    options: ['True', 'False'],
    answer: 'False',
  },
  {
    question: 'True or False: M.2 slots are used for high-speed SSDs.',
    options: ['True', 'False'],
    answer: 'True',
  },
  {
    question: 'True or False: More VRAM in a GPU helps with multitasking in office applications.',
    options: ['True', 'False'],
    answer: 'False',
  },
  {
    question: 'True or False: A high-quality PSU can protect your PC from power damage.',
    options: ['True', 'False'],
    answer: 'True',
  },
];

// Utility function to shuffle an array (Fisher–Yates shuffle)
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Randomize questions and, for multiple-choice questions, randomize the options.
const initializeQuiz = () => {
  const randomizedQuestions = shuffleArray(questionsData).map((q) => {
    if (q.options.length > 2) {
      return { ...q, options: shuffleArray(q.options) };
    }
    return q;
  });
  return randomizedQuestions;
};

// Helper: Interpolate between two colors (hex strings) given a factor (0 to 1)
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

// Compute timer stroke color based on remaining seconds
// 30 sec = blue (#03A9F4), 15 sec = orange (#FFA726), 5 sec = red (#E53935)
const getTimerColor = (seconds) => {
  if (seconds > 15) {
    const factor = (30 - seconds) / 15; // 0 at 30 sec, 1 at 15 sec
    return interpolateColor('#03A9F4', '#FFA726', factor);
  } else {
    const factor = (15 - seconds) / 10; // 0 at 15 sec, 1 at 5 sec
    return interpolateColor('#FFA726', '#E53935', factor);
  }
};

const PartScreen = ({ navigation, route }) => {
  const [questions, setQuestions] = useState(initializeQuiz());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(30);
  const [quizFinished, setQuizFinished] = useState(false);

  // Disable back navigation during quiz
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (!quizFinished) {
          Alert.alert('Quiz in progress');
          return true;
        }
        return false;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [quizFinished])
  );

  // Timer effect per question
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
      setSelectedOption(option);
      setAnswers([
        ...answers,
        {
          question: questions[currentQuestion].question,
          options: questions[currentQuestion].options,
          answer: questions[currentQuestion].answer,
          selected: option,
        },
      ]);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // When quiz finishes, navigate to the review screen
  // Add this function to calculate the score
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
  );
};

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
});

export default PartScreen;
