import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import { COLOR } from "../utils/color";
import Block from "../components/Block";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TransactionScreen() {
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const loadTransactionHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('transactionHistory');
        if (history) {
          setTransactionHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error('Error loading transaction history:', error);
      }
    };

    loadTransactionHistory();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{alignItems: "center"}}>
        <Text style={styles.text}>트랜잭션 기록</Text>
        <ScrollView style={{width: "100%", height: '72%'}}>
          {transactionHistory.map((transaction, index) => (
            <Block
              key={index}
              type="transaction"
              text1={transaction.method}
              text2={transaction.hash}
              text3={transaction.time}
              color={index % 2 === 0 ? COLOR.blue : COLOR.lightblue}
            />
          ))}
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
