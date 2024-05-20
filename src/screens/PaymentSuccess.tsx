import React from "react";
import { COLOR } from "../utils/color";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import Button from "../components/Button";
import complete from '../assets/images/completeMark.png';
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  PaymentSuccess: undefined;
  Main: undefined;
};

type PaymentSuccessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentSuccess'>;

interface PaymentSuccessScreenProps {
  navigation: PaymentSuccessScreenNavigationProp;
}

export default function PaymentSuccessScreen({ navigation }: PaymentSuccessScreenProps) {
  const handleSuccess = () => {
    navigation.navigate("Main");
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ alignItems: "center", height: "100%" }}>
        <Image source={complete} style={styles.imgStyle} resizeMode="contain" />
        <Text style={styles.text}>결제가 완료되었습니다.</Text>
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
    marginBottom: "5%",
    fontFamily: "SeoulNamsanB",
  },
  imgStyle: {
    width: '40%',
    height: undefined,
    aspectRatio: 1,
    marginTop: '50%',
  },
});
