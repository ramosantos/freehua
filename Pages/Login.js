import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';

import styles from '../Styles/stylesLogin';
import {logUser} from '../Scripts/Logger';

export default Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (email === '' || password === '') {
      Alert.alert('Bota tudinho, por favor');
      return null;
    }

    setLoading(true);
    const userLogged = await logUser(email, password);
    if (userLogged === true) {
      navigation.replace('Home');
    }
    setLoading(false);
  };

  return (
    <ImageBackground
      style={styles.area}
      source={require('../Assets/landscape.jpg')}>
      <View style={{...styles.box, height: 420}}>
        <Text style={styles.title}>Entrar</Text>
        <View>
          <Text style={styles.subtitle}>Email</Text>
          <TextInput
            style={styles.text}
            placeholder="E-mail"
            placeholderTextColor="gray"
            onChangeText={newEmail => setEmail(newEmail)}
            defaultValue={email}
            inputMode="email"
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Senha</Text>
          <TextInput
            style={styles.text}
            placeholder="Senha"
            placeholderTextColor="gray"
            onChangeText={newPassword => setPassword(newPassword)}
            defaultValue={password}
            secureTextEntry={true}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={styles.button} onPress={login}>
              <Text style={styles.label}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Register')}>
              <Text style={styles.label}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};
