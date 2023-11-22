import {ImageBackground, Text, TouchableOpacity} from 'react-native';

import styles from '../Styles/stylesFeed';

export default function Paperback({book, navigation, index}) {
    const image = book.coverUrl;
  return (
    <TouchableOpacity
  onPress = {() => navigation.navigate(
      'Book', {title : book.name})}
    key = {index}>
      <ImageBackground
  style={styles.manhuaCard} source={image} >
      <Text style = {styles.title}>{book.name}</Text>
      </ImageBackground>
      </TouchableOpacity>
  );
}
