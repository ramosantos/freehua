import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  box_feed: {
    marginLeft: 18,
    flexDirection: 'column',
    
  },
  strip: {
    marginVertical: 10,
  },
  genre: {
    color: 'white',
    fontSize: 26,
    fontStyle: 'italic',
    marginLeft: 16,
    marginBottom: 8,
  },
  pack: {
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  box_search_header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
    marginLeft: 18,
    marginRight: 24,
    justifyContent: 'center',
    
  },
  text_search: {
    flex: 1,
    height: 40,
    borderColor: '#195491',
    borderWidth: 2,
    paddingHorizontal: 12,
    backgroundColor: '#0A2647',
    color: 'white',
    fontSize: 13,
    borderTopLeftRadius: 75,
    borderBottomLeftRadius: 75,
  },
  icon_search: {
    backgroundColor: '#2C74B3',
    height: 40,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 75,
    borderBottomRightRadius: 75,
    
  },
});
