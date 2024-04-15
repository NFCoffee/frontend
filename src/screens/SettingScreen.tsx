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
                text1="도움말 / 소개"
                />
                <Block
                type="setting"
                text1="언어"
                />
                <Block
                type="setting"
                text1="다크모드"
                />
                <Block
                type="setting"
                text1="block explorer 이동"
                />
                <Block
                type="setting"
                text1="로그아웃"
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