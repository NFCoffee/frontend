import React from "react";
import { COLOR } from "../utils/color";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
  
  export default function PaymentScreen() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ alignItems: "center", height: "100%" }}>
          <Text style={styles.text}>결제가 완료되었습니다.</Text>
          <Button buttonText="확인" style={styles.button} />
        </SafeAreaView>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.background,
        width: '100%',
        height: '100%'
    },
    button: {
        bottom: '12%',
        position: 'absolute',
    },
    text: {
      color: COLOR.dark,
      fontSize: 35,
      marginTop: "15%",
      marginBottom: "5%",
      fontFamily: "SeoulNamsanB"
  },
});