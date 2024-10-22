import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Home from './Components/Screen/Home';
import Favorite from './Components/Screen/Favorite';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Captians from './Components/Screen/Captians';
import Detail from './Components/Screen/Detail';

// Khởi tạo Bottom Tabs và Stack Navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Hàm TabNavigator hiển thị các Tab
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#edefee' },
        tabBarActiveTintColor: '#f4ce14',
        tabBarInactiveTintColor: '#080808',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoriteList"
        component={Favorite}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
      name='Captians'
      component={Captians}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon name="users" size={size} color={color} />
        )
      }}
      />
    </Tab.Navigator>
  );
}

// Hàm App hiển thị cấu trúc điều hướng chính
export default function App() {
  return (
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
        options={{ headerShown: true, title:'Player Detail'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Style cho ứng dụng
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
