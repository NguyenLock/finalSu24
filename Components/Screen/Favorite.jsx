// Favorite.js

import React, { useContext, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';
import { PlayerContext } from '../AsyncStorage/playerContext'; // Import context để lấy danh sách yêu thích
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Card from '../UI/Card'; // Import component Card

export default function Favorite() {
  const navigation = useNavigation();
  const { favoritePlayers, removePlayerFromFavorites, removeAllFavorites } = useContext(PlayerContext);
  const [sortedPlayers, setSortedPlayers] = useState([]); // Biến lưu danh sách cầu thủ đã sắp xếp

  // Hàm sắp xếp danh sách cầu thủ yêu thích
  useEffect(() => {
    const sorted = [...favoritePlayers].sort((a, b) => b.id - a.id);
    setSortedPlayers(sorted);
  }, [favoritePlayers]);

  // Hàm xử lý khi bấm vào card cầu thủ để vào trang chi tiết
  const handleCardPress = (player) => {
    navigation.navigate('Detail', { playerData: player });
  };

  // Hàm xử lý khi bấm nút yêu thích để xóa khỏi danh sách
  const handleFavoritePress = (id) => {
    removePlayerFromFavorites(id);
  };

  // Hiển thị hộp thoại xác nhận xóa tất cả cầu thủ yêu thích
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

  // Hàm render từng cầu thủ trong danh sách
  const renderItem = ({ item }) => (
    <Card
      {...item}
      isFavorite={true} // Tất cả cầu thủ ở đây đều là yêu thích
      onFavoritePress={handleFavoritePress}
      onPress={() => handleCardPress(item)}
    />
  );

  // Nếu danh sách yêu thích trống, hiển thị thông báo
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
        data={sortedPlayers} // Hiển thị danh sách cầu thủ yêu thích đã sắp xếp
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Hiển thị 2 cột
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
  trashIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
