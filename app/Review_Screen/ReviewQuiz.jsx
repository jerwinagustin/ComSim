import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const PartReview = ({ route, navigation }) => {
  const { answers, score } = route.params;

  const handleBackToHome = () => {
    if (route.params?.onGoBack) {
      route.params.onGoBack(score);
    }
    navigation.popToTop();
  };
  
  
  
  
  React.useEffect(() => {
    navigation.setParams({ partsScore: score });
  }, [score, navigation]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleBackToHome();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.reviewTitle}>Review Your Answers</Text>
        {answers.map((item, index) => (
          <View key={index} style={styles.reviewCard}>
            <Text style={styles.questionText}>{item.question}</Text>
            {item.options.map((opt, i) => {
              const isCorrect = opt === item.answer;
              const isSelected = opt === item.selected;
              let backgroundColor = '#f0f0f0';
              if (isSelected && isCorrect) backgroundColor = '#4CAF50';
              else if (isSelected && !isCorrect) backgroundColor = '#FFCDD2';
              else if (!isSelected && isCorrect) backgroundColor = '#DFF0D8';

              return (
                <View key={i} style={[styles.optionButton, { backgroundColor }]}>
                  <Text style={styles.optionText}>{opt}</Text>
                </View>
              );
            })}
          </View>
        ))}
        <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    position: 'relative',
    padding: 24,
  },
  reviewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A73E8',
    textAlign: 'center',
    marginBottom: 20,
  },
  reviewCard: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginVertical: 4,
  },
  optionText: {
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#1A73E8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PartReview;
