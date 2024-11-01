// Captains.js

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PlayerContext } from '../AsyncStorage/playerContext';

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

  const calculateAge = (yearOfBirth) => new Date().getFullYear() - yearOfBirth;

  const handleCardPress = (player) => {
    navigation.navigate('Detail', { playerData: player });
  };

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
          <TouchableOpacity 
            key={item.id} 
            style={styles.card} 
            onPress={() => handleCardPress(item)}
          >
            {/* Hình ảnh bên trái */}
            <Image source={{ uri: item.image }} style={styles.playerImage} resizeMode="cover" /> 
            
            {/* Thông tin bên phải */}
            <View style={styles.infoContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.playerName}>{item.playerName}</Text>
                <TouchableOpacity onPress={() => handleFavoritePress(item)}>
                  <Icon 
                    name={favoritePlayers.some(p => p.id === item.id) ? "heart" : "heart-o"} 
                    size={24} 
                    color="red" 
                  />
                </TouchableOpacity>
              </View>
              {item.isCaptain && <Text style={styles.captainText}>⚡ Captain</Text>} 
              <Text style={styles.position}>{item.position}</Text>
              <Text style={styles.stats}>Age: {calculateAge(item.YoB)}</Text>
              <Text style={styles.stats}>Minutes Played: {item.MinutesPlayed}</Text>
            </View>
          </TouchableOpacity>
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
  card: {
    flexDirection: 'row', // Sắp xếp hàng ngang cho card
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    elevation: 3,
  },
  playerImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
  },
  stats: {
    fontSize: 12,
    color: '#666',
  },
  captainText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#B22222',
    marginBottom: 5,
  },
  noCaptainsText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
