import React from "react";
import { StyleSheet, View } from "react-native";
import { COLOR } from "../utils/color";

export default function BasicScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.box}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: COLOR.background,
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
    box: {
        position: 'absolute',
        top: 320,
        backgroundColor: '#ffffff',
        width: 330,
        height: 400,
        borderRadius: 8
    }
  });
  