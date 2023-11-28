import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  front: {
    marginTop: 24,
    alignItems: 'center',
  },
  picture: {
    aspectRatio: 1 / 1,
    height: 250,
    borderRadius: 200,
    borderColor: 'orange',
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
    margin:10,
    borderRadius:20,
    flex: 1,
  },
  box_entry: {
    backgroundColor:"#144272",
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 50,
    margin:10,
    borderRadius:20,
    
  },
  text_entry: {
    fontStyle: 'italic',
    color: 'white',
    fontSize: 16,
    
  },
});
