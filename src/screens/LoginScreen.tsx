import React from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Image } from "react-native";
import BasicScreen from "../components/BasicScreen";
import Button from "../components/Button";
import { COLOR } from "../utils/color";
import InputField from "../components/InputField";

const windowHeight = Dimensions.get('window').height;
export default function LoginScreen() {
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.mainText}>NFCOFFEE</Text>
    </View>
    <BasicScreen>
      <View style={styles.content}>
        <InputField placeholder="private key 입력" defaultValue="" style={styles.inputField} />
        <Button buttonText="로그인" style={styles.button} />
        <Button buttonText="회원가입" style={styles.button} />
      </View>
    </BasicScreen>
    <TouchableOpacity style={styles.bottomButton} onPress={() => {}}>
        <Text style={styles.bottomButtonText}>private key 분실신고</Text>
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
    width: '50%',
    height: '50%',
  },
  button: {
    width: '100%',
    marginBottom: 20,
  },
  inputField: {
    width: '100%',
    marginBottom: 20,
  },
  bottomButton : {
    alignItems: 'center',
  },
  bottomButtonText: {
    color: COLOR.dark,
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: '10%',
  }
});
