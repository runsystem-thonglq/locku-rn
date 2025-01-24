import { Text, TouchableOpacity, } from "react-native";

export default function Button({ style, ...props }: any) {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: "#fcba03",
                width: "100%",
                padding: 10,
                borderRadius: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...style

            }}
            {...props}
        >
            <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>{props.children}</Text>
        </TouchableOpacity>
    );
}
