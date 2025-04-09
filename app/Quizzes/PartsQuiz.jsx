import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'react-native-svg'

const PartsQuiz = () => {
  return (
    
    <View style={styles.container}>
      <View>
        <Text style={styles.parts}>PartsQuiz</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  parts: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1A73E8",
    textAlign: "center",
  }

});
export default PartsQuiz