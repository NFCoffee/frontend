import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Image } from "react-native";
import BasicScreen from "../components/BasicScreen";
import Button from "../components/Button";
import { COLOR } from "../utils/color";
import InputField from "../components/InputField";

const windowHeight = Dimensions.get('window').height;
export default function MembershipScreen() {
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleEmployeeIdChange = (value: string) => {
    setEmployeeId(value);
  };

  const handleGetVerificationCode = () => {
    // API 호출 로직 추가
    console.log("Email:", email);
    console.log("Employee ID:", employeeId);
    // 예시: API 호출
    // fetch('https://api.example.com/verify', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, employeeId }),
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => {}}>
          <Text style={styles.backButtonText}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.mainText}>회원가입</Text>
      </View>
      <BasicScreen>
        <InputField placeholder="e-mail 입력" defaultValue="" style={styles.inputField} onChangeText={handleEmailChange}/>
        <InputField placeholder="사번 입력" defaultValue="" style={styles.inputField} onChangeText={handleEmployeeIdChange}/>
        <Button buttonText="인증번호 받기" style={styles.button}></Button>
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
  mainText: {
    color: COLOR.dark,
    fontSize: 38,
    fontWeight: '700',
    top: windowHeight * 0.1,
    fontFamily: 'SeoulNamsanB'
  },
  inputField: {
    width: '70%',
    height: '7%',
    marginBottom: '8%',
    top: windowHeight * 0.25,
  },
  button: {
    width: '70%',
    height: '7%',
    marginTop: '55%',
    marginBottom: '8%',
  },
});