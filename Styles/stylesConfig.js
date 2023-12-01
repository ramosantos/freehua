import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    button: {
        height: 60,
        backgroundColor: '#205295',
        justifyContent: 'center',
        margin:10,
        borderRadius:20,
        alignItems:"center"
    }, 
    label: {
        fontSize: 24,
        fontStyle: 'italic',
        color: 'white',
    },
    box_input: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 12,
    },
    text_input: {
        flex: 1,
        fontSize: 18,
        color: 'black',
        borderRadius: 4,
        paddingLeft: 12,
        backgroundColor: 'white',
    },
    icon_input: {
        marginLeft: 12,
    },

    alertBox:{
        backgroundColor:'#205295'
    },

    
});
