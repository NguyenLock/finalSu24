import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

export default function Detail({ route }) {
  // Thêm kiểm tra params
  const playerData = route.params?.playerData;

  if (!playerData) {
    return (
      <View style={styles.errorContainer}>
        <Text>No player data available</Text>
      </View>
    );
  }
 

  const calculateAge = (yearofBirth) => {
    const currentYear = new Date().getFullYear();
    return currentYear - yearofBirth;
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: playerData.image }} 
        style={styles.playerImage} 
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.playerName}>{playerData.playerName}</Text>
        <Text style={styles.text}>Team: {playerData.team}</Text>
        <Text style={styles.text}>Position: {playerData.position}</Text>
        <Text style={styles.text}>Age: {calculateAge(playerData.YoB)}</Text>
        <Text style={styles.text}>Minutes Played: {playerData.MinutesPlayed}</Text>
        <Text style={styles.text}>
          Passing Accuracy: {(playerData.PassingAccuracy * 100).toFixed(1)}%
        </Text>
        {playerData.isCaptain && (
          <Text style={styles.text}>IsCaptain: YES</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerImage: {
    width: '100%',
    height: 300,
  },
  infoContainer: {
    padding: 20,
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
});