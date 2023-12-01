import { StyleSheet } from "react-native";

export default styles =StyleSheet.create({


    conteredView:{

        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },

    modalView:{

        width:'80%',
        margin: 10,
        backgroundColor:"#205295",
        borderRadius:16,
        padding:15,
        alignItems:'center',
        shadowColor:"black",
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:3.85,
        elevation:5,
        
    },

    textStyle:{

        color:'black',
        textAlign:'center',
        fontSize:20,
        marginTop:20,
    },

    okStyle:{
        color:'black',
        textAlign:'center',
        fontSize:20,
    },

    modalText:{
        color:"white",
        textAlign:'center',
        fontWeight:'bold',
        fontSize:34,
        shadowColor:'black',
        textShadowOffset:{

            width:0,
            height:2
        },
        shadowOpacity:0.3,
        shadowRadius:3.84,
        elevation:5,    

    },
    closeBtn:{

     backgroundColor:'black',
     color:"white",
     alignItems:'center',
     borderRadius:15,
     height:20,
     width:70,
    
    
     

    },




})