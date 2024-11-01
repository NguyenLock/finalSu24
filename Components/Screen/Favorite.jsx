// Favorite.js

import React, { useContext, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Alert 
} from 'react-native';
import { PlayerContext } from '../AsyncStorage/playerContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const PlayerCard = ({
  id, playerName, image, position, YoB, isCaptain, onFavoritePress, onPress
}) => {
  const calculateAge = (yearofBirth) => new Date().getFullYear() - yearofBirth;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.playerImage} resizeMode="cover" />
        <TouchableOpacity style={styles.favoriteButton} onPress={() => onFavoritePress(id)}>
          <Icon name="heart" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{playerName}</Text>
        {isCaptain && <Text style={styles.captainText}>⚡ Captain</Text>}
        <Text style={styles.position}>{position}</Text>
        <Text style={styles.stats}>Age: {calculateAge(YoB)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Favorite() {
  const navigation = useNavigation();
  const { favoritePlayers, removePlayerFromFavorites, removeAllFavorites } = useContext(PlayerContext);
  const [sortedPlayers, setSortedPlayers] = useState([]);// ham sort

  //ham sort
  useEffect(() => {
    const sorted = [...favoritePlayers].sort((a, b) => b.id - a.id);
    setSortedPlayers(sorted);
  }, [favoritePlayers]);

  //bam de vao detail
  const handleCardPress = (player) => {
    navigation.navigate('Detail', { playerData: player });
  };

  //xoa khoi yeu thich
  const handleFavoritePress = (id) => {
    removePlayerFromFavorites(id);
  };


  //ham xoa tat ca cac cau thu yeu thich voi > 2 thi moi hien thung rac
  const handleRemoveAll = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to remove all players from favorites?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => removeAllFavorites() }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <PlayerCard
      {...item}
      onFavoritePress={handleFavoritePress}
      onPress={() => handleCardPress(item)}
    />
  );

  if (sortedPlayers.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text>You don't have any favorite players!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Hiển thị biểu tượng thùng rác nếu có hơn 1 cầu thủ yêu thích */}
      {sortedPlayers.length > 1 && (
        <TouchableOpacity style={styles.trashIcon} onPress={handleRemoveAll}>
          <Icon name="trash" size={28} color="red" />
        </TouchableOpacity>
      )}
      <FlatList
        data={sortedPlayers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 5,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    width: '48%',
    elevation: 3,
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
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: '#FFD700',
    borderRadius: 12,
    padding: 4,
    color: '#B22222',
    marginBottom: 5,
  },
  trashIcon: {
    position: 'absolute',
    top: 800,
    right: 10,
    zIndex: 1,
  },
});
