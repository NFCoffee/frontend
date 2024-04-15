import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLOR } from "../utils/color";

interface BlockProps {
    type: "transaction" | "setting"; // Type of block
    text1: string;
    text2?: string;
    text3?: string;
    color?: string; // Optional color prop for line color
}

const Block: React.FC<BlockProps> = ({ type, text1, text2, text3, color = COLOR.dark }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.line, { backgroundColor: color }]} />
            <View style={styles.content}>
                <Text>{text1}</Text>
                {type === "transaction" && (
                <>
                <Text>{text2}</Text>
                <Text>{text3}</Text>
                </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: '1%',
        height: 70,
        backgroundColor: "#ffffff"
    },
    line: {
        width: '2%',
        height: "100%",
        marginRight: 10,
    },
    content: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
});

export default Block;
