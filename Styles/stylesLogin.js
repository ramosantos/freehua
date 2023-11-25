import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  area: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 300,
    borderRadius: 4,
    paddingHorizontal: 32,
    backgroundColor: '#0A2647',
    justifyContent: 'space-evenly',
    borderColor: '#2C74B3',
    borderWidth: 2,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
  subtitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 12,
    marginBottom: 6,
  },
  text: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#ED7D31',
    paddingVertical: 14,
    width: '100%',
    marginVertical: 4,
    borderRadius: 4,
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
