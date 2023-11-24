import {TouchableOpacity} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Shower from './Shower';
import Chat from './Chat';

export default function Reader({route, navigation}) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={'Shower'}>

      <Stack.Screen
        name="Shower"
        component={Shower}
        options={{
          headerShown: false,
          title: `Capítulo ${route.params.order}`,
          tabBarVisible: false,
          headerRight: ({color, size}) => (
            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
              <MaterialCommunityIcons name="chat" color={'white'} size={40} />
            </TouchableOpacity>
          ),
        }}
        initialParams={{chapter: route.params.file}}
      />

      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{tabBarButton: () => null}}
        initialParams={{chapter: route.params.file}}
      />
    </Stack.Navigator>
  );
}
