import React from "react";
import { COLOR } from "../utils/color";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import Button from "../components/Button";
import complete from '../assets/images/completeMark.png';
import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from '@react-navigation/native';
import { PrivateKeyProvider, usePrivateKey } from '../context/PrivateKeyContext';

type RootStackParamList = {
  PaymentSuccess: undefined;
  Tab: undefined;
};

type TabParamList = {
  Main: undefined;
  PaymentSuccess: undefined;
};

type PaymentSuccessScreenStackNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentSuccess'>;
type PaymentSuccessScreenTabNavigationProp = BottomTabNavigationProp<TabParamList, 'PaymentSuccess'>;

type PaymentSuccessScreenNavigationProp = CompositeNavigationProp<
  PaymentSuccessScreenStackNavigationProp,
  PaymentSuccessScreenTabNavigationProp
>;

interface PaymentSuccessScreenProps {
  navigation: PaymentSuccessScreenNavigationProp;
}

export default function PaymentSuccessScreen({ navigation }: PaymentSuccessScreenProps) {
  const { privateKey } = usePrivateKey();

  const handleSuccess = () => {
    if (privateKey) {
      navigation.navigate('Tab');
    } else {
      // 기본 동작 또는 오류 처리
      console.error("Private key is undefined");
      // 필요한 경우 다른 화면으로 이동하거나 경고 메시지를 표시할 수 있습니다.
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ alignItems: "center", height: "100%" }}>
        <Image source={complete} style={styles.imgStyle} resizeMode="contain" />
        <Text style={styles.text}>주문이 완료되었습니다.</Text>
        <Text style={styles.text}>음료를 수령해주세요!</Text>
        <Button buttonText="확인" style={styles.button} onPress={handleSuccess} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.background,
    width: '100%',
    height: '100%',
  },
  button: {
    bottom: '3%',
    position: 'absolute',
  },
  text: {
    color: COLOR.dark,
    fontSize: 32,
    marginTop: "10%",
    fontFamily: "SeoulNamsanB",
  },
  imgStyle: {
    width: '40%',
    height: undefined,
    aspectRatio: 1,
    marginTop: '50%',
  },
});
