import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  area: {
    paddingHorizontal: 26,
  },
  cover: {
    aspectRatio: 1 / 1.4,
    height: 300,
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
  title: {
    color: 'white',
    marginTop: 12,
    fontSize: 26,
    padding: 8,
    textAlign: 'center',
  },
  front: {
    marginBottom: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  author: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  summary: {
    color: 'white',
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'justify',
  },
  strip: {
    height: 60,
    backgroundColor: '#144272',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  legend: {
    color: 'white',
    paddingVertical: 12,
  },
  subtitle: {
    color: 'white',
    fontSize: 20,
  },
  like: {
    marginTop: 12,
  },
  date: {
    color: 'white',
  },
});
