import {useState, useEffect} from 'react';
import {TouchableOpacity, ScrollView, View, Image, Text} from 'react-native';
import styles from '../Styles/stylesUser';
import {getUserData, getUserHistory} from '../Scripts/Logger';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function User({navigation}) {
  const [userData, setUserData] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const [historyDropped, setHistoryDropped] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const tookUser = await getUserData();
        setUserData(tookUser);
      } catch (error) {
        alert(error);
      }
    };

    fetchUser();
  }, []);

  const toggleHistory = async () => {
    if (historyDropped) {
      setUserHistory([]);
      setHistoryDropped(false);
      return;
    }

    try {
      const takenHistory = await getUserHistory();
      setUserHistory(takenHistory);
      setHistoryDropped(true);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.front}>
        <Image style={styles.picture} source={{uri: userData.user_picture}} />
        <Text style={styles.username}>{userData.user_name}</Text>
        <Text style={styles.karma}>Karma: {userData.user_karma}</Text>
      </View>
      <View style={styles.box_history}>
        <TouchableOpacity
          onPress={() => toggleHistory()}
          style={styles.box_history_header_update}>
          <Text style={styles.text_history_header}>Ver Histórico</Text>
        </TouchableOpacity>

        {userHistory !== [] &&
          userHistory.map((entry, index) => (
            <TouchableOpacity
              style={{
                ...styles.box_entry,
                backgroundColor: index % 2 === 0 ? '#144272' : '#0A2647',
              }}
              key={index}>
              <Text style={styles.text_entry}>
                Capítulo {entry.chapter_order} de {entry.chapter_parent_name}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
}
