import React, {useState, useEffect, useReducer} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {rememberChapter} from '../Scripts/Booker';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Shower({navigation, route}) {
  const {file, files, order, master} = route.params;
  const loadedChapter = JSON.parse(file);
  const waitlist = JSON.parse(files);
  const [pdfSource, setPdfSource] = useState(loadedChapter.chapter_content);
  const [isHeaderVisible, setHeaderVisible] = useState(false);
  const [pagesAtMoment, setPagesAtMoment] = useState(0);
  const [isLastChapter, setIsLastChapter] = useState(false);
  const [isFirstChapter, setIsFirstChapter] = useState(false);

  const toggleHeaderVisibility = () => {
    setHeaderVisible(!isHeaderVisible);
    navigation.setOptions({headerShown: !isHeaderVisible});
    navigation.setParams({tabBarOptions: {visible: !isHeaderVisible}});
  };

  useEffect(() => {
    setPdfSource(loadedChapter.chapter_content);
    setIsLastChapter(order === 0);
    setIsFirstChapter(order === waitlist.length - 1);
    navigation.setOptions({
      title: `Capítulo ${loadedChapter.chapter_order}`,
      headerLeft: ({color, size}) => (
        <TouchableOpacity
          style={{paddingLeft: 12}}
          onPress={() => {
            navigation.navigate('Book', {source: master});
          }}>
          <Ionicons name="book" color={'white'} size={40} />
        </TouchableOpacity>
      ),
      headerRight: ({color, size}) => (
        <TouchableOpacity
          style={{paddingRight: 12}}
          onPress={() => navigation.navigate('Chat', {chapter: file})}>
          <Ionicons name="chatbox" color={'white'} size={40} />
        </TouchableOpacity>
      ),
    });
  }, [file, order]);

  const goTo = async direction => {
    navigation.navigate('Shower', {
      file: JSON.stringify(waitlist[order + direction]),
      files: files,
      order: order + direction,
      master: master,
    });
  };

  return (
    <View style={{flex: 1}}>
      <Pdf
        source={{uri: pdfSource, cache: true}}
        trustAllCerts={false}
        onPageChanged={(page, numberOfPages) => {
          setPagesAtMoment(page);
          if (page === numberOfPages) {
            rememberChapter(file);
          }
        }}
        onError={error => {
          console.log(error);
        }}
        style={styles.pdf}
      />
      <TouchableOpacity
        style={styles.headerButton}
        onPress={toggleHeaderVisibility}
      />
      {isHeaderVisible && (
        <View style={styles.box_pages}>
          {!isFirstChapter && (
            <TouchableOpacity style={styles.next} onPress={() => goTo(+1)}>
              <Ionicons name="arrow-back" color={'white'} size={40} />
            </TouchableOpacity>
          )}
          <Text style={styles.text_pages}>p. {pagesAtMoment}</Text>
          {!isLastChapter && (
            <TouchableOpacity style={styles.next} onPress={() => goTo(-1)}>
              <Ionicons name="arrow-forward" color={'white'} size={40} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const kindOfWidth = Math.round(Dimensions.get('window').width / 3);
const kindOfHeight = Math.round(Dimensions.get('window').height / 3);

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  headerButton: {
    position: 'absolute',
    top: kindOfHeight,
    left: kindOfWidth,
    width: kindOfWidth,
    height: kindOfHeight,
  },
  box_pages: {
    backgroundColor: 'black',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  text_pages: {
    color: 'white',
    textAlign: 'center',
    fontSize: 32,
  },
});
