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

export default function Likes({navigation, route}) {
  const [books, setBooks] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchLikes = async () => {
        try {
          const fetchedLikes = await getLibrary();
          setBooks(fetchedLikes);
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
        {books.map((book, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Book', {source: book})}
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
