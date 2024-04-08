import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BasicScreen from "../components/BasicScreen";
import Button from "../components/Button";
import { COLOR } from "../utils/color";
import Clipboard from '@react-native-clipboard/clipboard';

export default function PrivateKeyScreen() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleCopyKey = () => {
    setIsButtonClicked(true);
    Clipboard.setString("private key 자리");
  };

  return (
    <BasicScreen>
      <View style={styles.content}>
        <Text style={styles.text}>⚠Private Key는 반드시 기록하세요!⚠</Text>
        <Text style={{fontSize: 14, marginTop: 6}}>private key 자리</Text>
        <Button buttonText="키 복사" style={styles.loginButton} onPress={handleCopyKey} />
        {isButtonClicked ? <Button buttonText="완료" style={styles.buttonClicked}/> : <Button buttonText="완료" style={styles.submitButton}/>}
      </View>
    </BasicScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: '73%',
  },
  text: {
    fontFamily: 'SeoulNamsanB',
    marginTop: '80%',
    color: COLOR.brown,
    fontSize: 17
  },
  loginButton: {
    marginTop: '52%',
    backgroundColor: COLOR.blue,
  },
  submitButton: {
    marginTop: '5%',
    backgroundColor: COLOR.gray,
  },
  buttonClicked: {
    marginTop: '5%',
    backgroundColor: COLOR.blue, // Change to the desired color when button is clicked
  }
});
