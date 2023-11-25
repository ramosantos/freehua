import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {wipeUserHistory, postUserBiography, changeUserName} from '../Scripts/Logger';
import styles from '../Styles/stylesConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Config({navigation}) {
  const [droppedKeyboards, setDroppedKeyboards] = useState({});

  const logoff = async () => {
    try {
      await EncryptedStorage.removeItem('userCredential');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const changePicture = async () => {
    try {
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error changing picture:', error);
    }
  };

  const changeUsername = async text => {
    try {
        const changedUsername = await changeUserName(text);
        if (changedUsername) alert ('Parabéns! Agora você é ' + text);
    } catch (error) {
      console.error('Error changing username:', error);
    }
  };

  const writeBiography = async text => {
    try {
      const changedBiography = await postUserBiography(text);
      if (changedBiography) alert('Biografia alterada');
    } catch (error) {
      console.error('Error writing biography:', error);
    }
  };

  const eraseHistory = async () => {
    try {
      const erasedHistory = await wipeUserHistory();
      if (erasedHistory) alert('Histórico apagado');
    } catch (error) {
      console.error('Error erasing history:', error);
    }
  };

  const settingOptions = [
    {text: 'Desconectar', function: logoff, needsKeyboard: false},
    {
      text: 'Inserir foto de perfil',
      function: changePicture,
      needsKeyboard: true,
    },
    {
      text: 'Alterar nome de usuário',
      function: changeUsername,
      needsKeyboard: true,
    },
    {
      text: 'Mudar biografia da conta',
      function: writeBiography,
      needsKeyboard: true,
    },
    {
      text: 'Apagar histórico de leitura',
      function: eraseHistory,
      needsKeyboard: false,
    },
  ];

  const handlePress = index => {
    setDroppedKeyboards(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      {settingOptions.map((task, index) => (
        <View key={index}>
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: index % 2 === 0 ? '#144272' : '#205295',
            }}
            onPress={() => {
              task.needsKeyboard ? handlePress(index) : task.function();
            }}>
            <Text style={styles.label}>{task.text}</Text>
          </TouchableOpacity>
          <DroppingKeyboard
            key={index}
            need={task.needsKeyboard}
            dropped={droppedKeyboards[index]}
            job={task.function}
          />
        </View>
      ))}
    </KeyboardAvoidingView>
  );
}

const DroppingKeyboard = ({need, dropped, job}) => {
  const [inputText, setInputText] = useState('');
  return (
    <>
      {need && dropped && (
        <View style={styles.box_input}>
          <TextInput
            style={styles.text_input}
            value={inputText}
            onChangeText={newInputText => setInputText(newInputText)}
            placeholder="Mesma coisa"
          />
          <TouchableOpacity style={styles.icon_input} onPress={()=>job(inputText)}>
            <Ionicons name="send" color={'white'} size={36} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
