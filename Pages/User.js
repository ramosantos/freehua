import {useState, useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import styles from '../Styles/stylesUser';
import {getUserData} from '../Scripts/Logger';

export default function User({navigation}) {
  const [userData, setUserData] = useState([]);

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

  return (
    <View>
      <View style={styles.front}>
        <Image
          style={styles.picture}
          source={{uri: userData.user_picture}}
        />
        <Text style={styles.username}>{userData.user_name}</Text>
        <Text style={styles.karma}>Karma: {userData.user_karma}</Text>
      </View>
    </View>
  );
}
