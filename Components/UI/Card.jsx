import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Component hiển thị thông tin của mỗi cầu thủ
const Card = ({
  id,
  playerName,
  image,
  position,
  YoB,
  isFavorite,
  onFavoritePress,
  onPress,
  isCaptain,
}) => {
  // Hàm tính tuổi cầu thủ dựa trên năm sinh
  const calculateAge = (yearOfBirth) => new Date().getFullYear() - yearOfBirth;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Hình ảnh cầu thủ với nút yêu thích */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.playerImage} resizeMode="cover" />
        <TouchableOpacity style={styles.favoriteButton} onPress={() => onFavoritePress(id)}>
          <Icon name={isFavorite ? 'heart' : 'heart-o'} size={24} color="red" />
        </TouchableOpacity>
      </View>

      {/* Hiển thị thông tin chi tiết của cầu thủ */}
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{playerName}</Text>
        {isCaptain && <Text style={styles.captainText}>⚡ Captain</Text>}
        <Text style={styles.position}>{position}</Text>
        <Text style={styles.stats}>Age: {calculateAge(YoB)}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Styles cho Card
const styles = StyleSheet.create({
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
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 12,
    padding: 4,
    color: '#B22222',
    marginBottom: 5,
  },
});

export default Card;
