import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PlayerContext } from '../AsyncStorage/playerContext';

export default function Detail({ route }) {
  const { playerData } = route.params;
  const { favoritePlayers, addPlayerToFavorites, removePlayerFromFavorites } = useContext(PlayerContext);
  const [isFavorite, setIsFavorite] = useState(false);

  // Kiểm tra trạng thái yêu thích khi mở màn hình
  useEffect(() => {
    const favorite = favoritePlayers.some(player => player.id === playerData.id);
    setIsFavorite(favorite);
  }, [favoritePlayers, playerData]);

  // Hàm xử lý khi nhấn nút Favorite
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removePlayerFromFavorites(playerData.id);
    } else {
      addPlayerToFavorites(playerData);
    }
    setIsFavorite(!isFavorite);
  };

  // Tính tuổi cầu thủ từ năm sinh
  const calculateAge = (yearofBirth) => {
    const currentYear = new Date().getFullYear();
    return currentYear - yearofBirth;
  };

  if (!playerData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No player data available</Text>
      </View>
    );
  }

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
          <Text style={styles.captainText}>⚡ Captain</Text>
        )}
        
        
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoriteToggle}>
          <Icon name={isFavorite ? "heart" : "heart-o"} size={24} color="red" />
          <Text style={styles.favoriteButtonText}>
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDDDD',
  },
  errorText: {
    fontSize: 18,
    color: '#FF3333',
    fontWeight: 'bold',
  },
  playerImage: {
    width: '100%',
    height: 400,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
  },
  infoContainer: {
    padding: 25,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    elevation: 8,
  },
  playerName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: '#666',
  },
  captainText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    padding: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#FFD700',
    borderRadius: 12,
    color: '#B22222',
    textShadowColor: '#FFF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignSelf: 'flex-start',
  },
  favoriteButtonText: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
});
