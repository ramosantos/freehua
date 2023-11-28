import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from '../Styles/stylesFeed';
import BookCard from '../Assets/BookCard';
import {getLibrary} from '../Scripts/Booker';
import {useFocusEffect} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function Likes({navigation, route}) {
  const [books, setBooks] = useState([]);
  const [isLibraryEmpty, setIsLibraryEmpty] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchLikes = async () => {
        try {
          const fetchedLikes = await getLibrary();
            if(fetchedLikes === undefined) {
                const rescuedLikes = await EncryptedStorage.getItem('localLikes');
                setBooks(JSON.parse(rescuedLikes));
                setIsLibraryEmpty(false);
                return;
            }

            setBooks(fetchedLikes);
            setIsLibraryEmpty(false);
            await EncryptedStorage.setItem('localLikes', JSON.stringify(fetchedLikes));
          } catch (error) {
          console.log(error);
        }
      };

      fetchLikes();
    }, []),
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={{...styles.genre, marginTop: 16, textAlign: 'center'}}>
        Sua Biblioteca 📖
      </Text>
      <View style={styles.pack}>
        {!isLibraryEmpty &&
          books.map((book, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Book', {source: JSON.stringify(book)})
              }
              key={index}>
              <BookCard
                place={index}
                title={book.book_title}
                cover={book.cover_url}
              />
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
}
