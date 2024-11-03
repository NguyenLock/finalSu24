import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  ActivityIndicator, 
  StyleSheet 
} from 'react-native';
import { PlayerContext } from '../AsyncStorage/playerContext';
import HorizontalCard from '../UI/HorizontalCard';

export default function Captains() {
  const navigation = useNavigation();
  const { favoritePlayers, addPlayerToFavorites, removePlayerFromFavorites } = useContext(PlayerContext);
  const [captainsList, setCaptainsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('https://672239742108960b9cc37869.mockapi.io/footballteam');
        const data = await response.json();

        const filteredCaptains = data
          .filter(player => player.isCaptain && calculateAge(player.YoB) > 34)
          .sort((a, b) => a.MinutesPlayed - b.MinutesPlayed);
        
        setCaptainsList(filteredCaptains);
      } catch (error) {
        console.log('Failed to fetch players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Hàm tính tuổi cầu thủ dựa trên năm sinh
  const calculateAge = (yearOfBirth) => new Date().getFullYear() - yearOfBirth;

  // Xử lý khi nhấn vào card cầu thủ để điều hướng đến màn hình chi tiết
  const handleCardPress = (player) => {
    navigation.navigate('Detail', { playerData: player });
  };

  // Xử lý khi nhấn vào nút yêu thích
  const handleFavoritePress = (player) => {
    if (favoritePlayers.some(p => p.id === player.id)) {
      removePlayerFromFavorites(player.id);
    } else {
      addPlayerToFavorites(player);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading players...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Captains Over 34 Years Old</Text>
      {captainsList.length > 0 ? (
        captainsList.map((item) => (
          <HorizontalCard
            key={item.id}
            id={item.id}
            playerName={item.playerName}
            image={item.image}
            position={item.position}
            YoB={item.YoB}
            MinutesPlayed={item.MinutesPlayed}
            isFavorite={favoritePlayers.some(p => p.id === item.id)}
            onFavoritePress={() => handleFavoritePress(item)}
            onPress={() => handleCardPress(item)}
            isCaptain={item.isCaptain}
          />
        ))
      ) : (
        <Text style={styles.noCaptainsText}>No captains found over 34 years old.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCaptainsText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
