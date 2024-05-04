import React from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Image } from "react-native";
import BasicScreen from "../components/BasicScreen";
import Button from "../components/Button";
import { COLOR } from "../utils/color";
import InputField from "../components/InputField";
import Logo from '../assets/images/planzLogo.png'

const windowHeight = Dimensions.get('window').height;
export default function LoginScreen() {
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.mainText}>NFCOFFEE</Text>
    </View>
    <BasicScreen>
      <View style={styles.content}>
        <Image source={Logo} style={styles.imgStyle} />
        <InputField placeholder="private key 입력" defaultValue="" style={styles.inputField} />
        <Button buttonText="로그인" style={styles.button} />
        <Button buttonText="회원가입" style={styles.button} />
      </View>
    </BasicScreen>
    <TouchableOpacity style={styles.bottomButton} onPress={() => {}}>
        <Text style={styles.bottomButtonText}>private key 분실신고</Text>
        <View style={styles.bottomButtonUnderline} />
    </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    zIndex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: '80%',
    width: '70%',
  },
  mainText: {
    color: COLOR.brown,
    fontSize: 50,
    fontWeight: '900',
    top: windowHeight * 0.25,
  },
  imgStyle: {
    width: '25%',
    height: '15%',
    bottom: windowHeight * 0.09,
  },
  button: {
    width: '100%',
    marginBottom: '10%',
    bottom: windowHeight * 0.04,
  },
  inputField: {
    width: '100%',
    bottom: windowHeight * 0.07,
  },
  bottomButton : {
    alignItems: 'center',
  },
  bottomButtonText: {
    color: COLOR.dark,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: '4%',
    bottom: windowHeight * 0.04
  },
  bottomButtonUnderline: {
    width: '37%',
    position: 'absolute',
    borderBottomColor: COLOR.dark,
    borderBottomWidth: 1,
    bottom: windowHeight * 0.055,
  }
});