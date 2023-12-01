import React, {useState} from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import  LottieView  from 'lottie-react-native'
import styles from '../Styles/stylesCostomAlert'


const CostomAlert =({title, message, buttonColor, jsonPath,visi, isShowing }) => {
 const [alertMessage, setAlertMessage] = useState('')

const [alertVisible, setAlertVisible] = useState(false)

    return(
        <View style={styles.conteredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}>
                <View style={styles.conteredView}>

                    <View style={styles.modalView}>

                        <Text style = {styles.modalText}>{alertMessage}</Text>

                        <TouchableOpacity style={styles.closeBtn} onPress={()=>{setAlertVisible(false)}}>
                    <Text>Fechar</Text>
                    </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </View>


    )



}



export default CostomAlert