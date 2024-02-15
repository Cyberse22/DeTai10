import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        flexDirection: 'row',
    }, container1: {
        flex: 1,
        margin: 5,
    }, row: {
        flexDirection: "row"
    }, subject: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "blue"
    }, m_10: {
        margin: 6
    }, title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "green"
    }, input: {
        width: "100%",
        height: 50,
        padding: 5,
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: "lightgray"
    }, button1: {
        textAlign: "center",
        backgroundColor: "darkblue",
        color: "white",
        padding: 10,
        margin: 0.5,
    }, button2: {
        textAlign: "center",
        backgroundColor: "red",
        color: "white",
        padding: 10,
        margin: 0.5,
        flex: 4,
    }, button3: {
        textAlign: "center",
        backgroundColor: "blue",
        color: "white",
        padding: 10,
        margin: 0.5,
        flex: 4,
    }, avatar: {
        width: 80,
        height: 80,
        margin: 10,
        resizeMode: 'contain'
    }, leftPanel: {
        flex: 3,
        backgroundColor: 'lightblue'
    }, rightPanel: {
        flex: 7,
        backgroundColor: 'lightgrey'
    }, image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginLeft: 8,
        marginRight: 8,
        marginTop: 8,
    },
});