import React, { useContext, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Image 
} from 'react-native';
import { PlayerContext } from '../AsyncStorage/playerContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

// Component hiển thị thông tin của mỗi cầu thủ
const PlayerCard = ({
  id, playerName, image, position, YoB, isCaptain, onFavoritePress, onPress
}) => {
  //ham tinh tuoi
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

// Trang Favorite hiển thị danh sách cầu thủ yêu thích
export default function Favorite() {
  const navigation = useNavigation();
  const { favoritePlayers, removePlayerFromFavorites } = useContext(PlayerContext);
  const [sortedPlayers, setSortedPlayers] = useState([]);//ham sort

  // Sắp xếp danh sách cầu thủ yêu thích theo id giảm dần
  useEffect(() => {
    const sorted = [...favoritePlayers].sort((a, b) => b.id - a.id);
    setSortedPlayers(sorted);
  }, [favoritePlayers]);

  // Hàm điều hướng đến trang chi tiết cầu thủ
  const handleCardPress = (player) => {
    navigation.navigate('Detail', { playerData: player });
  };

  // Hàm xử lý khi nhấn nút yêu thích
  const handleFavoritePress = (id) => {
    removePlayerFromFavorites(id); // Xóa cầu thủ khỏi danh sách yêu thích
  };

  // Render mỗi cầu thủ trong danh sách
  const renderItem = ({ item }) => (
    <PlayerCard
      {...item}
      onFavoritePress={handleFavoritePress}
      onPress={() => handleCardPress(item)}
    />
  );

  // Nếu danh sách cầu thủ yêu thích rỗng
  if (sortedPlayers.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text>Chưa có cầu thủ yêu thích!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={sortedPlayers} // Sử dụng danh sách cầu thủ đã sắp xếp
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContainer}
    />
  );
}

// Styles cho giao diện
const styles = StyleSheet.create({
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
});
