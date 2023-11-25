import React, {useEffect, useState} from 'react';
import {Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import styles from '../Styles/stylesBook';
import {getChapters} from '../Scripts/Booker';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    const book = JSON.parse(source);
  const [chapters, setChapters] = useState([]);
  const [color, setColor] = useState('white');
  const [wasPressed, setWasPressed] = useState(null);
    const [isChaptersEmpty, setIsChaptersEmpty] = useState(true);

  const like = async () => {
    try {
      if (wasPressed) {
        await dislikeBook(book.id);
        setColor('white');
        setWasPressed(false);
      } else {
        await likeBook(book.id);
        setColor('#FF914D');
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
        const chaptersData = await getChapters(book.id);
          if(chaptersData === undefined) {
              setIsChaptersEmpty(true);
              return;
          }
        setChapters(chaptersData);
        setIsChaptersEmpty(false);
      } catch (error) {
        alert(error);
      }
    };
    refreshChapters();
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alreadyLiked = await getLike(book.id);
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
        <Image style={styles.cover} source={{uri: book.cover_url}} />
        <Text style={styles.title}>{book.book_title}</Text>
        <Text style={styles.author}>
          {book.book_type === 'Manhwa' ? `Manhwa` : `Manhua`} feito por{' '}
          {book.book_author}
        </Text>
        <Text style={styles.summary}>{book.book_summary}</Text>
        <TouchableOpacity style={styles.like} onPress={like}>
          <Ionicons name="bookmark" color={color} size={42} />
        </TouchableOpacity>
      </View>
      <View style={styles.legend}>
        {!isChaptersEmpty && chapters.map((chapter, index) => (
          <View style={{flex: 1, flexDirection: 'row'}} key={index}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Shower', {
                  file: JSON.stringify(chapter),
                  order: index,
                  master: JSON.stringify(book),
                  files: JSON.stringify(chapters),
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
              <Ionicons
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
