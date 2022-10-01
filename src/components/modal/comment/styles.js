import { Dimensions, StyleSheet } from "react-native"
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        flex: 1,

    },
    containerInput: {
        padding: 10,
        flexDirection: 'row'
    },
 
    input: {
        backgroundColor: 'lightgray',
        flex: 1,
        borderRadius: 4,
        height: 12,
        marginHorizontal: 10,
        paddingHorizontal: 10

    }


})

export default styles;