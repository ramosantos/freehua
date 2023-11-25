import React, {useEffect, useState} from 'react';
import {Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import styles from '../Styles/stylesBook';
import {getChapters} from '../Scripts/Booker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';
import {
  likeBook,
  dislikeBook,
  getLike,
  rememberChapter,
  forgetChapter,
} from '../Scripts/Booker';

export default function Book({route, navigation}) {
  const {source} = route.params;
  const [chapters, setChapters] = useState([]);
  const [color, setColor] = useState('white');
  const [wasPressed, setWasPressed] = useState(null);

  const like = async () => {
    try {
      if (wasPressed) {
        await dislikeBook(source.id);
        setColor('white');
        setWasPressed(false);
      } else {
        await likeBook(source.id);
        setColor('orange');
        setWasPressed(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  const toggleChapterViewing = async (chapter, wasViewed) => {
    try {
      if (wasViewed) {
        await forgetChapter(chapter);
        return false;
      } else {
        await rememberChapter(chapter);
        return true;
      }
    } catch (error) {
      alert(error);
      return wasViewed;
    }
  };

  useFocusEffect(() => {
    const refreshChapters = async () => {
      try {
        const chaptersData = await getChapters(source.id);
        setChapters(chaptersData);
      } catch (error) {
        alert(error);
      }
    };
    refreshChapters();
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alreadyLiked = await getLike(source.id);
        if (alreadyLiked === true) {
          setColor('orange');
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

  const handleToggleViewing = async (chapter, index) => {
    try {
      const newChapters = [...chapters];
      const toggle = await toggleChapterViewing(
        JSON.stringify(chapter),
        chapter.viewed,
      );
      newChapters[index].viewed = toggle;
      setChapters(newChapters);
    } catch (error) {
      alert(error);
    }
  };

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
          <View
            style={{flex: 1, flexDirection: 'row'}}
            key={chapter.chapter_order}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Reader', {
                  file: JSON.stringify(chapter),
                  order: chapter.chapter_order,
                  parent: source,
                });
              }}
              style={{
                ...styles.strip,
                backgroundColor: chapter.viewed ? '#872341' : '#144272',
              }}>
              <Text style={styles.subtitle}>
                Capítulo {chapter.chapter_order}
              </Text>
              <Text style={styles.date}>
                {chapter.chapter_release.toDate().toLocaleDateString('pt-BR')}{' '}
                por {chapter.chapter_poster_name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.viewed,
                backgroundColor: chapter.viewed ? 'orange' : '#2C74B3',
              }}
              onPress={() => handleToggleViewing(chapter, index)}>
              <MaterialCommunityIcons
                name="eye"
                color={chapter.viewed ? 'black' : 'white'}
                size={42}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
