import React, {useEffect, useState} from 'react';
import {Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import styles from '../Styles/stylesBook';
import {getChapters} from '../Scripts/Booker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {likeBook, dislikeBook, getLike} from '../Scripts/Booker';

export default function Book({route, navigation}) {
  const {source} = route.params;
  const [chapters, setChapters] = useState([]);
  const [color, setColor] = useState('white');
  const [wasPressed, setWasPressed] = useState(null);

  const like = async () => {
    try {
      if (wasPressed) {
        const wasDisliked = await dislikeBook(source.id);
        setColor('white');
        setWasPressed(false);
      } else {
        const wasLiked = await likeBook(source.id);
        setColor('red');
        setWasPressed(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chaptersData = await getChapters(source.id);
        setChapters(chaptersData);
        const alreadyLiked = await getLike(source.id);
        if (alreadyLiked === true) {
          setColor('red');
          setWasPressed(true);
        } else {
          setColor('white');
          setWasPressed(false);
        }
      } catch (error) {
        console.error('Error fetching chapters:', error);
      }
    };
    fetchData();
  }, [source]);

  return (
    <ScrollView style={styles.area}>
      <View style={styles.front}>
        <Image style={styles.cover} source={{uri: source.cover_url}} />
        <Text style={styles.title}>{source.book_title}</Text>
        <Text style={styles.author}>
          {source.book_type === 'Manhwa' ? `Manhwa` : `Manhua`} feito por{' '}
          {source.book_author}
        </Text>
        <Text style={styles.summary}>{source.book_summary}</Text>
        <TouchableOpacity style={styles.like} onPress={like}>
          <MaterialCommunityIcons name="book" color={color} size={42} />
        </TouchableOpacity>
      </View>
      <View style={styles.legend}>
        {chapters.map((chapter, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              const ordering = index + 1;
              navigation.navigate('Reader', {
                file: JSON.stringify(chapter),
                order: ordering,
              });
            }}
            style={styles.strip}>
            <Text style={styles.subtitle}>Capítulo {index + 1}</Text>
            <Text style={styles.date}>
              {chapter.chapter_release.toDate().toLocaleDateString('pt-BR')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
