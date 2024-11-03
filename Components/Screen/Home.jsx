import React, { useState, useEffect, useContext } from 'react'; // Thêm useContext để sử dụng PlayerContext
import { 
  View, 
  Text, 
  FlatList, 
  TextInput, 
  Modal, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect để lắng nghe sự thay đổi khi quay lại trang
import { PlayerContext } from '../AsyncStorage/playerContext'; // Import PlayerContext để quản lý danh sách yêu thích
import Card from '../UI/Card'; // Import component Card

// Màn hình chính hiển thị danh sách cầu thủ
export default function Home() {
  const navigation = useNavigation();
  const { 
    favoritePlayers, 
    addPlayerToFavorites, 
    removePlayerFromFavorites,
  } = useContext(PlayerContext); // Lấy dữ liệu và hàm từ PlayerContext

  const [players, setPlayers] = useState([]); // Lưu danh sách cầu thủ
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading
  const [error, setError] = useState(null); // Quản lý lỗi khi fetch dữ liệu
  const [searchQuery, setSearchQuery] = useState(''); // Lưu từ khóa tìm kiếm
  const [selectedTeam, setSelectedTeam] = useState('All'); // Lưu đội được chọn
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Hiển thị menu thả xuống để chọn đội

  useEffect(() => {
    fetchPlayers(); // Gọi hàm lấy dữ liệu cầu thủ khi component mount
  }, []);

  // Đặt lại `selectedTeam` và `searchQuery` về mặc định khi quay lại trang
  useFocusEffect(
    React.useCallback(() => {
      setSelectedTeam('All'); // Đặt lại đội được chọn là All
      setSearchQuery(''); // Xóa từ khóa tìm kiếm
    }, [])
  );

  // Hàm lấy dữ liệu cầu thủ từ API
  const fetchPlayers = async () => {
    try {
      const response = await fetch('https://672239742108960b9cc37869.mockapi.io/footballteam');
      const data = await response.json();
      setPlayers(data); // Cập nhật danh sách cầu thủ vào state
      setLoading(false); // Tắt trạng thái loading
    } catch (err) {
      setError('Failed to fetch players data'); // Cập nhật lỗi khi có sự cố
      setLoading(false);
    }
  };

  // Xử lý khi người dùng nhấn vào nút yêu thích
  const handleFavoritePress = (id) => {
    const selectedPlayer = players.find((player) => player.id === id);
    if (favoritePlayers.some((p) => p.id === id)) {
      removePlayerFromFavorites(id); // Nếu đã yêu thích, xóa khỏi danh sách yêu thích
    } else {
      addPlayerToFavorites(selectedPlayer); // Nếu chưa yêu thích, thêm vào danh sách yêu thích
    }
  };

  // Xử lý khi nhấn vào card cầu thủ để điều hướng đến màn hình chi tiết
  const handleCardPress = (player) => {
    navigation.navigate('Detail', { playerData: player });
  };

  // Hàm lọc cầu thủ dựa vào tên và đội được chọn
  const filterPlayers = () => {
    return players.filter((player) => {
      const matchesSearch = player.playerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesTeam =
        selectedTeam === 'All' || player.team === selectedTeam;

      return matchesSearch && matchesTeam;
    });
  };

  // Hàm render từng cầu thủ trong danh sách
  const renderItem = ({ item }) => (
    <Card
      {...item}
      isFavorite={favoritePlayers.some((p) => p.id === item.id)}
      onFavoritePress={handleFavoritePress}
      onPress={() => handleCardPress(item)}
    />
  );

  // Hiển thị màn hình loading khi đang tải dữ liệu
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Hiển thị thông báo lỗi nếu không thể tải dữ liệu
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  // Danh sách đội để chọn trong menu thả xuống
  const uniqueTeams = ['All', ...new Set(players.map((player) => player.team))];

  return (
    <View style={styles.container}>
      {/* Ô tìm kiếm cầu thủ */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search player..."
        value={searchQuery}
        onChangeText={setSearchQuery} // Cập nhật từ khóa tìm kiếm khi người dùng nhập
      />

      {/* Nút hiển thị menu chọn đội */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setDropdownVisible(true)}
      >
        <Text style={styles.dropdownButtonText}>{selectedTeam}</Text>
        <Icon name="chevron-down" size={16} color="#000" />
      </TouchableOpacity>

      {/* Modal hiển thị menu chọn đội */}
      <Modal
        visible={isDropdownVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              {uniqueTeams.map((team) => (
                <TouchableOpacity
                  key={team}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedTeam(team); // Cập nhật đội được chọn
                    setDropdownVisible(false); // Đóng modal
                  }}
                >
                  <Text style={styles.dropdownItemText}>{team}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Danh sách cầu thủ hiển thị dưới dạng lưới 2 cột */}
      <FlatList
        data={filterPlayers()} // Lọc và hiển thị cầu thủ dựa vào tìm kiếm và đội
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Hiển thị 2 cột
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

// Styles cho giao diện
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    marginTop: 50,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
    elevation: 2,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    maxHeight: '50%',
    padding: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    fontSize: 16,
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
});
