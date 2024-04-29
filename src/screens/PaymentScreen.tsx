import React from "react";
import { COLOR } from "../utils/color";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";

const items = [
    { name: "품목1", qty: 3 },
    { name: "품목2", qty: 4 },
    { name: "품목3", qty: 5 },
    { name: "품목4", qty: 5 },
    { name: "품목5", qty: 1 },
  ];
  
  export default function PaymentScreen() {
    const totalQty = items.reduce((acc, item) => acc + item.qty, 0);

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ alignItems: "center", height: "100%" }}>
          <Text style={styles.text}>장바구니</Text>
          <View style={styles.box}>
            <ScrollView style={{height: '100%'}}>
            {items.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemqty}>{item.qty}</Text>
              </View>
            ))}
            </ScrollView>
            <View style={styles.insideBox}>
                <Text style={{fontFamily: 'SeoulNamsanEB', fontSize: 20, flex: 1, paddingTop:'1%', paddingBottom: '2%'}}>
                    사용할 토큰 | {totalQty}개
                </Text>
                <View style={styles.line}/>
                <Text style={{fontFamily: 'SeoulNamsanEB', fontSize: 20, flex: 1, paddingTop: '5%'}}>
                    결제 후 잔액
                </Text>
            </View>
          </View>
          <Button buttonText="주문하기" style={styles.button} />
        </SafeAreaView>
      </View>
    );
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
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    itemName: {
        fontSize: 20,
        marginLeft: '7%',
        marginTop: '7%',
        marginBottom: 0,
        fontFamily: 'SeoulNamsanB'
    },
    itemqty: {
        fontSize: 20,
        marginRight: '7%',
        marginTop: '7%',
        marginBottom: 0,
        fontFamily: 'SeoulNamsanB'
    },
    button: {
        bottom: '12%',
        position: 'absolute',
    },
    insideBox: {
        marginLeft: '7%',
        marginVertical: '4%',
        height: '30%',
        // justifyContent: 'center',
    },
    line: {
        backgroundColor: COLOR.gray, 
        width: '93%',
        flex: 0.05
    }
});