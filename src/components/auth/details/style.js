import { StyleSheet } from "react-native"; 

const styles= StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 20
    },
    textInput : {
        borderColor: 'lightgray',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20
    },
    button : {
        marginTop: 80,
        borderColor: 'lightgray',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: 'red'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
  
});

export default styles;