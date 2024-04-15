import React from "react";
import { COLOR } from "../utils/color";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";

export default function MainScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{alignItems: 'center'}}>
                <View style={styles.innerContainer}>
                    <Text style={styles.text}>NFCOFFEE</Text>
                    <View style={styles.tokenBox}>
                        <View style={styles.textContainer}>
                            <Text>이지인님</Text>
                            <Text>잔여 토큰 | (토큰 수) PLZ</Text>
                        </View>
                        <Button buttonText={"오늘의 토큰"} 
                        style={{width: '40%', height: '100%'}} 
                        onPress={()=>{}}/>
                    </View>
                    <View style={styles.quickOrder}>
                        <Text>퀵 오더</Text>
                        <Text>주문량 1위</Text>
                        <Text>주문량 2위</Text>
                        <Text>주문량 3위</Text>
                        <Text>주문량 4위</Text>
                        <Button buttonText="주문하기" style={styles.wideButtons}/>
                    </View>
                    <View style={styles.quickOrder}>
                        <Text>트랜잭션 기록</Text>
                        <Text>트랜잭션 최근순 첫번째</Text>
                        <Text>트랜잭션 최근순 두번째</Text>
                        <Text>트랜잭션 최근순 세번째</Text>
                        <Text>트랜잭션 최근순 네번째</Text>
                        <Button buttonText="자세히 보기" style={styles.wideButtons}/>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.background,
        width: '100%',
        height: '100%'
    },
    text: {
        color: COLOR.brown,
        fontSize: 35,
        fontFamily: 'SeoulNamsanEB',
    },
    innerContainer: {
        width: '85%',
        height: '70%',
        marginTop: '5%',
        justifyContent: 'space-between',
    },
    tokenBox: {
        backgroundColor: "#ffffff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 16,
        height: '18%',
        alignItems: 'center',
        marginTop: '5%',
        padding: '4%'
    },
    textContainer: {
        flex: 1, // Take remaining space
    },
    quickOrder: {
        backgroundColor: "#ffffff",
        height: '55%',
        borderRadius: 16,
        marginTop: '8%',
        // padding: '4%'
    },
    wideButtons: {
        width: '100%', 
        borderTopLeftRadius: 0, 
        borderTopRightRadius: 0, 
        position: "absolute", 
        bottom: 0,
    }
})