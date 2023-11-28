import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {sendComment, getComments} from '../Scripts/Chatter';
import styles from '../Styles/stylesChat';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Chat({navigation, route}) {
  const {chapter} = route.params;
  const [messages, setMessages] = useState([]);
  const [comment, setComment] = useState('');
  const [hasComments, setHasComments] = useState(false);

  const babble = async () => {
    if (comment === '') {
      return;
    }

    try {
      const hasCommented = await sendComment(comment, chapter);
      if (hasCommented) {
        setComment('');
      }
    } catch (error) {
      alert(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      try {
        const listen = async () => {
          const gottenMessages = await getComments(chapter);
          if (gottenMessages === undefined) setHasComments(false);
          setMessages(gottenMessages);
          setHasComments(true);
        };

        listen();
      } catch (error) {
        alert(error);
        setHasComments(false);
      }
    }, [babble]),
  );

  return (
    <View style={styles.area}>
      <ScrollView style={styles.area_comments}>
        {hasComments &&
          messages.map((message, index) => (
            <View key={index} style={{marginVertical: 12}}>
              <View style={styles.box_header}>
                <Text style={styles.text_header}>
                  {message.comment_poster_name}
                </Text>
                <Text style={styles.text_date}>{message.comment_release}</Text>
              </View>
              <View style={styles.box_message}>
                <Text style={styles.text_message}>
                  {message.comment_message}
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
      <View style={styles.area_input}>
        <TextInput
          style={styles.textbox}
          placeholder="Naruto é melhor"
          placeholderTextColor="gray"
          onChangeText={newComment => setComment(newComment)}
          defaultValue={comment}
          inputMode="text"
        />
        <TouchableOpacity style={{marginLeft: 12}} onPress={babble}>
          <Ionicons name="send" color={'white'} size={36} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
