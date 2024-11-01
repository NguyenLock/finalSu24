// Import các thư viện cần thiết
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Dùng để lưu và tải dữ liệu từ bộ nhớ cục bộ

// Khởi tạo một Context mới có tên là PlayerContext để chia sẻ dữ liệu trong ứng dụng
export const PlayerContext = createContext();

// Tạo PlayerProvider để bao bọc các component con và cung cấp dữ liệu từ context
export const PlayerProvider = ({ children }) => {
  // Khởi tạo state để lưu danh sách các cầu thủ yêu thích
  const [favoritePlayers, setFavoritePlayers] = useState([]);

  // Khi component này được render, gọi hàm loadFavoritePlayers để lấy dữ liệu từ AsyncStorage
  useEffect(() => {
    loadFavoritePlayers();
  }, []);

  // Hàm lấy danh sách cầu thủ yêu thích từ AsyncStorage
  const loadFavoritePlayers = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoritePlayers'); // Lấy dữ liệu từ AsyncStorage
      if (storedFavorites) { 
        setFavoritePlayers(JSON.parse(storedFavorites)); // Nếu có dữ liệu, chuyển đổi JSON thành mảng và lưu vào state
      }
    } catch (error) {
      console.log('Failed to load favorite players:', error); // Nếu có lỗi, in lỗi ra console
    }
  };

  // Hàm thêm cầu thủ vào danh sách yêu thích và lưu vào AsyncStorage
  const addPlayerToFavorites = async (player) => {
    try {
      const updatedFavorites = [...favoritePlayers, player]; // Thêm cầu thủ mới vào mảng yêu thích hiện tại
      setFavoritePlayers(updatedFavorites); // Cập nhật state với mảng mới
      await AsyncStorage.setItem('favoritePlayers', JSON.stringify(updatedFavorites)); // Lưu mảng mới vào AsyncStorage
    } catch (error) {
      console.log('Failed to add player to favorites:', error); // Nếu có lỗi, in lỗi ra console
    }
  };

  // Hàm xóa cầu thủ khỏi danh sách yêu thích và cập nhật AsyncStorage
  const removePlayerFromFavorites = async (playerId) => {
    try {
      const updatedFavorites = favoritePlayers.filter(p => p.id !== playerId); // Lọc bỏ cầu thủ có id được truyền vào
      setFavoritePlayers(updatedFavorites); // Cập nhật state với danh sách mới
      await AsyncStorage.setItem('favoritePlayers', JSON.stringify(updatedFavorites)); // Lưu danh sách mới vào AsyncStorage
    } catch (error) {
      console.log('Failed to remove player from favorites:', error); // Nếu có lỗi, in lỗi ra console
    }
  };

  // Hàm xóa toàn bộ cầu thủ khỏi danh sách yêu thích và cập nhật AsyncStorage
  const removeAllFavorites = async () => {
    try {
      setFavoritePlayers([]); // Xóa tất cả khỏi state
      await AsyncStorage.removeItem('favoritePlayers'); // Xóa dữ liệu khỏi AsyncStorage
    } catch (error) {
      console.log('Failed to remove all players from favorites:', error); // Nếu có lỗi, in lỗi ra console
    }
  };

  // Trả về PlayerContext.Provider để cung cấp dữ liệu cho các component con
  return (
    <PlayerContext.Provider 
      value={{ 
        favoritePlayers, // Cung cấp danh sách cầu thủ yêu thích
        addPlayerToFavorites, // Cung cấp hàm thêm cầu thủ yêu thích
        removePlayerFromFavorites, // Cung cấp hàm xóa cầu thủ khỏi danh sách yêu thích
        removeAllFavorites // Cung cấp hàm xóa toàn bộ cầu thủ khỏi danh sách yêu thích
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
