import { StyleSheet, View } from "react-native";
import Home from "./Components/Screen/Home";
import Favorite from "./Components/Screen/Favorite";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { PlayerProvider } from "./Components/AsyncStorage/playerContext"; // Cung cấp PlayerContext cho toàn bộ ứng dụng
import Icon from "react-native-vector-icons/FontAwesome";
import Captians from "./Components/Screen/Captians";
import Detail from "./Components/Screen/Detail";

// Khởi tạo Bottom Tabs và Stack Navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Hàm TabNavigator hiển thị các Tab điều hướng dưới
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Ẩn header trên các tab
        tabBarStyle: { backgroundColor: "#edefee" }, // Đổi màu nền của tab bar
        tabBarActiveTintColor: "#f4ce14", // Màu của tab đang chọn
        tabBarInactiveTintColor: "#080808", // Màu của các tab không được chọn
      }}
    >
      
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} /> // Icon cho tab Home
          ),
        }}
      />
      
      <Tab.Screen
        name="FavoriteList"
        component={Favorite}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" size={size} color={color} /> // Icon cho tab yêu thích
          ),
        }}
      />
      
      <Tab.Screen
        name="Captians"
        component={Captians}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="users" size={size} color={color} /> // Icon cho tab đội trưởng
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Hàm App hiển thị cấu trúc điều hướng chính
export default function App() {
  return (
    <PlayerProvider> 
      <NavigationContainer>
        <Stack.Navigator>
          
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
           
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{ headerShown: true, title: "Player Detail" }} // Hiển thị tiêu đề khi vào chi tiết
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PlayerProvider>
  );
}

// Style cho ứng dụng
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Đặt màu nền cho ứng dụng
  },
});
