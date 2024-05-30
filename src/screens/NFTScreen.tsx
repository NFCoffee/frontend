import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import BasicScreen from "../components/BasicScreen";
import Button from "../components/Button";
import { COLOR } from "../utils/color";
import { StackNavigationProp } from "@react-navigation/stack";

const windowHeight = Dimensions.get('window').height;

type RootStackParamList = {
  NFT: undefined;
  Login: undefined;
};

type NFTScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NFT'>;

interface NFTScreenProps {
  navigation: NFTScreenNavigationProp;
}

export default function NFTScreen({navigation}: NFTScreenProps) {
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <>
    <View style={styles.container}>    
        <Text style={styles.mainText}>NFCOFFEE</Text>
    </View>
    <BasicScreen>
        <Text style={styles.text}>NFT 발급 및 가입 완료!</Text>
    </BasicScreen>
    <View style={styles.container}>    
        <Text style={styles.login} onPress={handleLogin}>로그인하기</Text>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    zIndex: 1,
  },
  mainText: {
    color: COLOR.brown,
    fontSize: 50,
    fontWeight: '900',
    top: windowHeight * 0.2,
  },
  text: {
    fontFamily: 'SeoulNamsanEB',
    color: COLOR.dark,
    fontSize: 30,
    top: '12%',
  },
  login: {
    fontFamily: 'SeoulNamsanEB',
    color: COLOR.dark,
    fontSize: 15,
    bottom: windowHeight * 0.07,
    textDecorationLine: 'underline',
  }
});
