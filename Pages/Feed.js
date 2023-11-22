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

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
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
        </ScrollView>
      </View>
    </ScrollView>
  );
}
