import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

const PartsQuiz = ({ navigation, route }) => {
  return (
    <LinearGradient colors={['#E2DFDF', '#ffffff']} style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.middleContainer}>
          <Text style={styles.parts}>PartsQuiz</Text>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('PartScreen', { onGoBack: route.params?.onGoBack })}>
            <StartCard call="Take Quiz" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const StartCard = ({ call }) => (
  <View style={styles.startCard}>
    <Text style={styles.startCall}>{call}</Text>
    <AntDesign name="arrowright" size={24} color="#fff" style={styles.icon} />
  </View>
);

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 40,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  startCard: {
    width: '90%',
    backgroundColor: '#1A73E8',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  parts: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1A73E8',
  },
  startCall: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  icon: {
    marginLeft: 8,
  },
});

export default PartsQuiz;
