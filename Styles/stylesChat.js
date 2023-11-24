import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  area: {
    flex: 2,
    flexDirection: 'column',
  },
  textbox: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  area_comments: {
    flex: 1,
    marginVertical: 24,
    marginHorizontal: 12,
  },
  area_input: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 12,
    marginBottom: 12,
  },
  box_header: {
    backgroundColor: '#205295',
    paddingVertical: 6,
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box_message: {
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingLeft: 12,
  },
  text_message: {
    fontSize: 18,
    color: 'black',
  },
  text_header: {
    fontSize: 18,
    color: 'white',
  },
  text_date: {
    fontSize: 16,
    color: 'lightgray',
    fontStyle: 'italic',
    marginRight: 12,
  },
});

export default styles;
