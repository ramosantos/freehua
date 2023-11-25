import React, {useState, useEffect, useReducer} from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {rememberChapter} from '../Scripts/Booker';

export default function Shower({navigation, route}) {
  const {chapter} = route.params;
  const loadedChapter = JSON.parse(chapter);
  const [pdfSource, setPdfSource] = useState(loadedChapter.chapter_content);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [pagesAtMoment, setPagesAtMoment] = useState(0);

  const toggleHeaderVisibility = () => {
    setHeaderVisible(!isHeaderVisible);
    navigation.setOptions({headerShown: isHeaderVisible});
    navigation
      .getParent()
      .setParams({tabBarOptions: {visible: !isHeaderVisible}});
  };

  return (
    <View style={{flex: 1}}>
      <Pdf
        source={{uri: pdfSource, cache: false}}
        trustAllCerts={false}
        onPageChanged={(page, numberOfPages) => {
          setPagesAtMoment(page);
            if(page === numberOfPages) {
                rememberChapter(chapter);
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
      {isHeaderVisible || (
        <View style={styles.box_pages}>
          <Text style={styles.text_pages}>{pagesAtMoment}</Text>
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
    height: 36,
  },
  text_pages: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
  },
});
