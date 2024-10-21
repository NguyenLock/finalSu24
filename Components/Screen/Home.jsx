import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const PlayerCard = ({ id, playerName, image, team, position, MinutesPlayed, PassingAccuracy, isFavorite, onFavoritePress }) => {
  return (
    <TouchableOpacity style={styles.card}>
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
        <Text style={styles.teamName}>{team}</Text>
        <Text style={styles.position}>{position}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>Minutes: {MinutesPlayed}</Text>
          <Text style={styles.stats}>
            Pass Accuracy: {(PassingAccuracy * 100).toFixed(1)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch('https://668d4d89099db4c579f2807a.mockapi.io/api/v1/footballteam');
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
    <ScrollView style={styles.container}>
      <View style={styles.playersGrid}>
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            {...player}
            isFavorite={favorites[player.id]}
            onFavoritePress={handleFavoritePress}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    justifyContent: 'space-between',
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
    flex: 1,
    marginHorizontal: 5,
    maxWidth: '48%',
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