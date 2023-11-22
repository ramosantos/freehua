import {View, Text, TouchableOpacity} from 'react-native';
import {signOut} from 'firebase/auth';
import {FIREBASE_AUTH} from '../Scripts/firebaseConfig';
import styles from '../Styles/stylesConfig';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function Config({navigation}) {
  //TODO: 1. MAIS OPÇÕES
  // 2. DESLOGAR PROPRIAMENTE NO 'SAIR'
  const logoff = async () => {
    try {
      await EncryptedStorage.removeItem("userCredential");
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={logoff}>
        <Text style={styles.label}>Desconectar</Text>
      </TouchableOpacity>
    </View>
  );
}
