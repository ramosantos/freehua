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
        
      </ImageBackground>
      <View style={styles.label}>
          <Text style={styles.title} numberOfLines={2} >{props.title}</Text>
        </View>
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
    borderTopLeftRadius:8,
    borderTopRightRadius:8,
   
    
    borderWidth: 1,
    borderColor: '#0A2647',
  },
  card: {
    aspectRatio: 1 / 1.4,
    height: 210,
    margin: 4,
    marginBottom:0,
    justifyContent: 'flex-end',
    borderRadius: 12,
    textAlign: 'center',
  
  },
  label: {
    backgroundColor: '#144272',
    maxHeight: 80,
    minHeight:60,
    maxWidth:160,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft:5,
    marginRight:5,
    
  },
});

export default BookCard;
