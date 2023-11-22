import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Book from './Pages/Book';
import Loading from './Pages/Loading';
import FreeSpace from './Styles/FreeSpace';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <NavigationContainer theme={FreeSpace}>
      <Stack.Navigator
        initialRouteName={'Loading'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Loading" component={Loading}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
