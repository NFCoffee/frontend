import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Alert } from "react-native";
import BasicScreen from "../components/BasicScreen";
import Button from "../components/Button";
import { COLOR } from "../utils/color";
import { URL } from "../const/url";
import InputField from "../components/InputField";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;

type RootStackParamList = {
  Signup: undefined;
  Certification: undefined;
};

type MembershipScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

interface MembershipScreenProps {
  navigation: MembershipScreenNavigationProp;
}

export default function MembershipScreen({ navigation }: MembershipScreenProps) {
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleEmployeeIdChange = (value: string) => {
    setEmployeeId(value);
  };

  const handleGetVerificationCode = async () => {
    Alert.alert("인증번호 발송 완료! 이메일을 확인해주세요.");

    const requestBody = {
      email: email,
      employeeId: employeeId,
    };

    console.log("Email:", email);
    console.log("Employee ID:", employeeId);

    try {
      const response = await axios.post(`${URL}/api/v1/sign`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.status === 200) {
        console.log(response);
        navigation.navigate("Certification", { email, employeeId });
      }
    } catch (error) {
      console.error(error);
      //console.error('Error:', error.request._response);
    }
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
        <InputField placeholder="e-mail 입력" defaultValue="" style={styles.inputField} onChangeText={handleEmailChange} autoCapitalize={'none'}/>
        <InputField placeholder="사번 입력" defaultValue="" style={styles.inputField} onChangeText={handleEmployeeIdChange} autoCapitalize={'none'}/>
        <Button buttonText="인증번호 받기" style={styles.button} onPress={handleGetVerificationCode}></Button>
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
