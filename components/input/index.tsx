import { StyleSheet, TextInput } from "react-native";


export default function Input({ ...props }) {
    return <TextInput style={style.input} {...props} />
}
const style = StyleSheet.create({
    input: {
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderStyle: "solid",
        backgroundColor: "white"
    }
})
