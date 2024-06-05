import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import BasicScreen from "../components/BasicScreen";
import Button from "../components/Button";
import { COLOR } from "../utils/color";
import Clipboard from '@react-native-clipboard/clipboard';
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Privatekey: { privateKey: string };
  NFT: undefined;
};

type PrivateKeyScreenRouteProp = RouteProp<RootStackParamList, 'Privatekey'>;
type PrivateKeyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Privatekey'>;

interface PrivateKeyScreenProps {
  route: PrivateKeyScreenRouteProp;
  navigation: PrivateKeyScreenNavigationProp;
}

export default function PrivateKeyScreen({ navigation, route }:PrivateKeyScreenProps) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const privateKey = route.params.privateKey;

  const handleCopyKey = () => {
    setIsButtonClicked(true);
    Clipboard.setString(`${privateKey}`);
    Alert.alert("키 복사 완료", "Private Key가 클립보드에 복사되었습니다.");
  };

  const handleSubmit = () => {
    navigation.navigate('NFT');
  }

  const handleNoticeForCopy = () => {
    Alert.alert("Private Key를 복사하여 기록하세요!");
  }

  return (
    <BasicScreen>
      <View style={styles.content}>
        <Text style={styles.text}>⚠Private Key는 반드시 기록하세요!⚠</Text>
        <Text style={{fontSize: 14, marginTop: 9}}>{privateKey}</Text>
        <Button buttonText="키 복사" style={styles.loginButton} onPress={handleCopyKey} />
        {isButtonClicked ? <Button buttonText="완료" style={styles.buttonClicked} onPress={ handleSubmit }/> : <Button buttonText="완료" style={styles.submitButton} onPress={ handleNoticeForCopy }/>}
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
