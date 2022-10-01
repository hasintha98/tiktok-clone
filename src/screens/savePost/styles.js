import { StyleSheet } from "react-native"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'white'
    },
    spacer: {
        flex: 1
    },
    formContainer: {
        margin: 20,
        flexDirection: 'row'   
    },
    buttonContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 20
    },
    inputText: {
        paddingVertical: 10,
        marginRight: 20,
        flex: 1
    },
    mediaPreview: {
        aspectRatio: 9/16,
        backgroundColor: 'black',
        width: 60,
    },
    cancelButton: {
        alignItems: 'center',
        flex: 1,
        borderColor: 'lightgray',
        borderWidth: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 4,
        marginRight: 10
    },
    postButton: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#ff4040',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 4,
        marginRight: 10
    },
    cancelButtonText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        marginLeft: 5
    },
    postButtonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
        marginLeft: 5
    },
    uploadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
    


   
})

export default styles;