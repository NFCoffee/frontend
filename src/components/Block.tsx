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
          <Text style={{ fontFamily: "SeoulNamsanB", fontSize: 16 }}>{text1}</Text>
          {type === "transaction" && (
            <>
              <Text style={{ fontFamily: "SeoulNamsanB", fontSize: 10, color: COLOR.lightblue }}>
                {text2}
              </Text>
            </>
          )}
        </View>
  
        {text3 && <Text style={{ fontFamily: "SeoulNamsanB", fontSize: 12, paddingRight: '3%' }}>{text3}</Text>}
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: '1%',
        height: 70,
        backgroundColor: "#ffffff",
    },
    line: {
        width: '2%',
        height: "100%",
        marginRight: 10,
    },
    content: {
        flex: 1,
        paddingLeft: '2%',
    },
});

export default Block;
