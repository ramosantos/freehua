import React, {useState} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, View} from 'react-native';
import Pdf from 'react-native-pdf';

export default function Shower({navigation, route}) {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [pagesAtMoment, setPagesAtMoment] = useState(0);

  const toggleHeaderVisibility = () => {
    setHeaderVisible(!isHeaderVisible);
    navigation.setOptions({headerShown: isHeaderVisible,});
      navigation.getParent().setParams({ tabBarOptions: { visible: !isHeaderVisible } });
  };

  const {chapter} = route.params;
  const loadedChapter = JSON.parse(chapter);

  return (
    <View style={{flex: 1}}>
      <Pdf
        source={{uri: loadedChapter.chapter_content}}
        trustAllCerts={false}
        onPageChanged={(page, numberOfPages) => {
            //setPagesAtMoment(page);
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
    backgroundColor: 'red',
    position: 'absolute',
    top: kindOfHeight + 40,
    left: kindOfWidth + 20,
    width: kindOfWidth - 40,
    height: kindOfHeight - 80,
  },
});
