import React from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { COLOR } from "../utils/color";
import Block from "../components/Block";

export default function TransactionScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{alignItems: "center"}}>
                <Text style={styles.text}>트랜잭션 기록</Text>
                <ScrollView style={{width: "100%", height: '65%'}}>
                <Block
                type="transaction"
                text1="Transaction 1"
                text2="Transaction 2"
                text3="Transaction 3"
                color={COLOR.blue}
                />
                <Block
                type="transaction"
                text1="Transaction 1"
                text2="Transaction 2"
                text3="Transaction 3"
                color={COLOR.lightblue}
                />
                <Block
                type="transaction"
                text1="Transaction 1"
                text2="Transaction 2"
                text3="Transaction 3"
                color={COLOR.blue}
                />
                <Block
                type="transaction"
                text1="Transaction 1"
                text2="Transaction 2"
                text3="Transaction 3"
                color={COLOR.blue}
                />
                <Block
                type="transaction"
                text1="Transaction 1"
                text2="Transaction 2"
                text3="Transaction 3"
                color={COLOR.lightblue}
                />
                <Block
                type="transaction"
                text1="Transaction 1"
                text2="Transaction 2"
                text3="Transaction 3"
                color={COLOR.lightblue}
                />
                <Block
                type="transaction"
                text1="Transaction 1"
                text2="Transaction 2"
                text3="Transaction 3"
                color={COLOR.lightblue}
                />
                <Block
                type="transaction"
                text1="Transaction 1"
                text2="Transaction 2"
                text3="Transaction 3"
                color={COLOR.blue}
                />
                </ScrollView>
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