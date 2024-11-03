import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Component hiển thị thông tin của mỗi cầu thủ theo chiều ngang
export default function HorizontalCard({
  id,
  playerName,
  image,
  position,
  YoB,
  MinutesPlayed,
  isFavorite,
  onFavoritePress,
  onPress,
  isCaptain,
}) {
  // Hàm tính tuổi cầu thủ dựa trên năm sinh
  const calculateAge = (yearOfBirth) => new Date().getFullYear() - yearOfBirth;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Hình ảnh bên trái */}
      <Image source={{ uri: image }} style={styles.playerImage} resizeMode="cover" />

      {/* Thông tin bên phải */}
      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.playerName}>{playerName}</Text>
          <TouchableOpacity onPress={() => onFavoritePress(id)}>
            <Icon name={isFavorite ? "heart" : "heart-o"} size={24} color="red" />
          </TouchableOpacity>
        </View>
        {isCaptain && <Text style={styles.captainText}>⚡ Captain</Text>}
        <Text style={styles.position}>{position}</Text>
        <Text style={styles.stats}>Age: {calculateAge(YoB)}</Text>
        <Text style={styles.stats}>Minutes Played: {MinutesPlayed}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Styles cho HorizontalCard
const styles = StyleSheet.create({
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
});
