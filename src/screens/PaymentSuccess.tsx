import React from "react";
import { COLOR } from "../utils/color";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from "react-native";
import Button from "../components/Button";
import complete from '../assets/images/completeMark.png'

  export default function PaymentSuccessScreen() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ alignItems: "center", height: "100%" }}>
          <Image source={complete} style={styles.imgStyle} />
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
        bottom: '3%',
        position: 'absolute',
    },
    text: {
      color: COLOR.dark,
      fontSize: 32,
      marginTop: "10%",
      marginBottom: "5%",
      fontFamily: "SeoulNamsanB"
  },
    imgStyle: {
      width: '27%',
      height: '14%',
      marginTop: '60%',
  },
});
