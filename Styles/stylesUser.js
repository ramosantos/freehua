import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  front: {
    marginTop: 24,
    alignItems: 'center',
  },
  picture: {
    aspectRatio: 1 / 1,
    height: 300,
    borderRadius: 100,
    borderColor: '#205295',
    borderWidth: 1,
  },
  username: {
    color: 'white',
    fontSize: 36,
    marginTop: 12,
  },
  karma: {
    color: 'lightgray',
    marginTop: 12,
    fontSize: 18,
    fontStyle: 'italic',
  },
  box_history: {
    marginTop: 36,
  },
  text_history_header: {
    fontSize: 24,
    marginLeft: 24,
    fontStyle: 'italic',
    color: 'white',
  },
  box_history_header_update: {
    backgroundColor: '#205295',
    justifyContent: 'center',
height: 60,
    flex: 1,
  },
  box_entry: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 50,
  },
  text_entry: {
    fontStyle: 'italic',
    color: 'white',
    fontSize: 16,
  },
});
