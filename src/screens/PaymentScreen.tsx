import React from "react";
import { COLOR } from "../utils/color";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";

export default function PaymentScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{alignItems: "center", height: '100%'}}>
                <Text style={styles.text}>장바구니</Text>
                <View style={styles.box}>
                    <Text style={[styles.text, styles.cartitem]}>품목1</Text>
                    <Text style={[styles.text, styles.cartitem]}>품목2</Text>
                    <Text style={[styles.text, styles.cartitem]}>품목3</Text>
                </View>
                <Button buttonText="주문하기" style={styles.button}/>
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
    box: {
        backgroundColor: "#ffffff",
        marginTop: "45%",
        width: '85%',
        height: '40%',
        borderRadius: 16
    },
    button: {
        bottom: '11%',
        position: 'absolute',
    },
    cartitem: {
        fontSize: 20,
        marginLeft: '6%',
        marginTop: '5%',
        marginBottom: 0
    }
});