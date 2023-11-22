import {useEffect} from 'react';
import {View, Text} from 'react-native';
import {checkLogin} from '../Scripts/Logger';

export default Loading = ({navigation}) => {
    useEffect(() => {
    const check = async () => {
      const alreadyLogged = await checkLogin();
      if (alreadyLogged === true) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    };
    check();
  }, []);

    return(
        <View>
            <Text>Carregando</Text>
        </View>
    );
}
