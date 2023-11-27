import {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {checkLogin} from '../Scripts/Logger';
import styles from '../Styles/stylesLoading';
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

        
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color="orange"
            size='large'
          />
          <Text>Carregando...</Text>
           
        </View>
    );
}
