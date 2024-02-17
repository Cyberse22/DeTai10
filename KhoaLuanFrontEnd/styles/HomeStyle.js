import { StyleSheet } from "react-native";

const HomeStyle = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: "left",
        color: "white",
        fontWeight: "bold",
        padding: 10,
        margin: 10,
        backgroundColor: "lightgray",
    }, button: {
        backgroundColor: "blue",
        width: 150,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 20,
    }, buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    }, container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        paddingTop: 20,
        paddingHorizontal: 20,
    }, row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    }, titleText: {
        fontSize: 20,
        fontWeight: "bold",
    }
});

export default HomeStyle;