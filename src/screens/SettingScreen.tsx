import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { COLOR } from "../utils/color";
import Block from "../components/Block";

export default function SettingScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{alignItems: "center"}}>
                <Text style={styles.text}>설정</Text>
                <Block
                type="setting"
                text1="Transaction 1"
                />
                <Block
                type="setting"
                text1="Transaction 1"
                />
                <Block
                type="setting"
                text1="Transaction 1"
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: COLOR.dark,
        fontSize: 35,
        marginTop: "15%",
        marginBottom: "5%",
        fontFamily: "SeoulNamsanB"
    },
    container: {
        backgroundColor: COLOR.background,
        width: '100%',
        height: '100%'
    },
});