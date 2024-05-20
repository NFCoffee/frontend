import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Alert } from "react-native";
import BasicScreen from "../components/BasicScreen";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { COLOR } from "../utils/color";

interface CertificationNumScreenState {
  certificationNum: string;
  isCertified: boolean;
  buttonDisabled: boolean;
}

const windowHeight = Dimensions.get('window').height;
export default function CertificationNumScreen() {
  const [state, setState] = useState<CertificationNumScreenState>({
    certificationNum: "",
    isCertified: false,
    buttonDisabled: true,  // 처음에는 버튼을 비활성화 상태로 설정
  });

  const handleCertificationNumChange = (text: string) => {
    setState({
      ...state,
      certificationNum: text,
      buttonDisabled: text.trim() === ""
    });
  }

  const handleCertificationComplete = () => {
    if (state.certificationNum.trim() === ""){
      Alert.alert("오류", "인증번호를 입력하세요");
    }
    else {
      setState({
        ...state,
        isCertified: true,
        buttonDisabled: false,
      });
      Alert.alert("인증 완료", "인증이 완료되었습니다!");
    }
  }

  const handleResendCertificationNum = () => {
    Alert.alert("알림", "인증번호가 재전송되었습니다.");
    setState({
      ...state,
      isCertified: false,
      buttonDisabled: true
    });
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => {}}>
          <Text style={styles.backButtonText}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.mainText}>회원가입</Text>
      </View>
      <BasicScreen>
        <InputField placeholder="인증번호 입력"
          defaultValue={state.certificationNum}
          onChangeText={handleCertificationNumChange}
          style={styles.inputField} />
        <TouchableOpacity style={styles.retryButton} onPress={handleResendCertificationNum}>
          <Text style={styles.retryText}>인증번호 재전송</Text>
        </TouchableOpacity>
        <Button buttonText="인증완료" onPress={handleCertificationComplete} 
          style={[styles.button, !state.buttonDisabled ? styles.activeButton : styles.disabledButton]} />
        <Button buttonText="회원가입완료" onPress={() => {}} 
          style={[styles.button, state.isCertified && !state.buttonDisabled ? styles.activeButton : styles.disabledButton]} />
      </BasicScreen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 38,
    fontWeight: '600',
    fontFamily: 'SeoulNamsanB',
    color: COLOR.dark,
  },
  backButton : {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: '20%',
    marginRight: '80%',
  },
  mainText : {
    color: COLOR.dark,
    fontSize: 38,
    fontWeight: '700',
    top: windowHeight * 0.1,
    fontFamily: 'SeoulNamsanB'
  },
  inputField: {
    width: '70%',
    height: '7.4%',
    marginBottom: '30%',
    top: windowHeight * 0.23,
  },
  retryButton: {
    marginTop: '10%',
    marginBottom: '21%',
    top: windowHeight * 0.08,
  },
  retryText: {
    fontFamily: 'SeoulNamsanB',
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  button: {
    width: '70%',
    height: '7.4%',
    top: windowHeight * 0.01,
    marginBottom: '6%',
  },
  activeButton: { 
    backgroundColor: COLOR.blue,
  },
  disabledButton: {
    backgroundColor: COLOR.gray,
  },
});
