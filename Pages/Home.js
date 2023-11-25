import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from './Feed';
import Likes from './Likes';
import User from './User';
import Book from './Book';
import Config from './Config';
import Shower from './Shower';
import Chat from './Chat';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Home({navigation}) {
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Likes"
        component={Likes}
        options={{
          tabBarLabel: 'Likes',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="bookmarks" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Config"
        component={Config}
        options={{
          tabBarLabel: 'Config',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-sharp" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen
        name="Book"
        component={Book}
        options={{tabBarButton: () => null}}
      />
      <Stack.Screen
        name="Shower"
        component={Shower}
        options={{
          headerTitleStyle: {
            fontSize: 24,
          },
          tabBarStyle: {
            display: 'none',
          },
          tabBarButton: () => null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: true,
          tabBarStyle: {
            display: 'none',
          },
          headerLeft: ({color, size}) => (
            <TouchableOpacity
              style={{paddingLeft: 12}}
              onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" color={'white'} size={40} />
            </TouchableOpacity>
          ),
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
