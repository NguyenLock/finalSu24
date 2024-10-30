import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const PlayerCard = ({ id, playerName, image, team, position, MinutesPlayed, PassingAccuracy, isFavorite, onFavoritePress,YoB, onPress, isCaptain }) => {

  const calculateAge = (yearofBirth) =>{
    const currentYear = new Date().getFullYear();
    return currentYear - yearofBirth
  }
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: image }} 
          resizeMode="cover" 
          style={styles.playerImage} 
        />
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={() => onFavoritePress(id)}
        >
          <Icon name={isFavorite ? "heart" : "heart-o"} size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{playerName}</Text>
        <Text style={styles.isCaptain}>{isCaptain ? 'Captain' : ''}</Text>
        <Text style={styles.position}>{position}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>Age: {calculateAge(YoB)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Home() {
  const navigation = useNavigation();// add navigation de chuyen trang detail
  const [players, setPlayers] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleCardPress = (player) =>{
    navigation.navigate('Detail', { playerData: player });
  };
  const fetchPlayers = async () => {
    try {
      const response = await fetch('https://672239742108960b9cc37869.mockapi.io/footballteam');
      const data = await response.json();
      setPlayers(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch players data');
      setLoading(false);
    }
  };

  const handleFavoritePress = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderItem = ({ item }) => (
    <PlayerCard
      {...item}
      isFavorite={favorites[item.id]}
      onFavoritePress={handleFavoritePress}
      onPress={()=> handleCardPress(item)}
    />
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 5,
  },
  row: {
    justifyContent: 'space-between',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 20,
    width: '48%', // Thay đổi từ flex: 1 sang width cố định
  },
  imageContainer: {
    position: 'relative',
  },
  playerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 5,
  },
  playerInfo: {
    padding: 10,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  teamName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  position: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
  },
  statsContainer: {
    marginTop: 5,
  },
  stats: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  }
});