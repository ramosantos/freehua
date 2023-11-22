import React from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const BookCard = props => {
  return (
    <View>
      <ImageBackground
        style={styles.card}
        imageStyle={styles.cover}
        source={{uri: props.cover}}>
        <View style={styles.label}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'white',
    padding: 6,
  },
  cover: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0A2647',
  },
  card: {
    aspectRatio: 1 / 1.4,
    height: 260,
    margin: 4,
    justifyContent: 'flex-end',
    borderRadius: 12,
    textAlign: 'center',
  },
  label: {
    backgroundColor: '#144272',
    height: 'fit-content',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});

export default BookCard;
