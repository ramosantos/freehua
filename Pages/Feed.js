import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from '../Styles/stylesFeed';
import BookCard from '../Assets/BookCard';
import {getBooks} from '../Scripts/Booker';

export default function Feed({navigation}) {
  const [books, setBooks] = useState([]);
  const [isFeedEmpty, setIsFeedEmpty] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await getBooks();
        if (fetchedBooks === undefined) {
          setIsFeedEmpty(true);
          return;
        }

        setBooks(fetchedBooks);
        setIsFeedEmpty(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <ScrollView>
      <View style={styles.strip}>
        <Text style={styles.genre}>Novidades</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{flexDirection: 'row'}}>
          {!isFeedEmpty &&
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
        </ScrollView>
      </View>
    </ScrollView>
  );
}
