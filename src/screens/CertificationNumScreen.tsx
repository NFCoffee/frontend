import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Alert } from "react-native";
import BasicScreen from "../components/BasicScreen";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { COLOR } from "../utils/color";
import Web3 from "web3";
import { RouteProp } from "@react-navigation/native";
import { NETWORK, URL } from "../const/url";
import { StackNavigationProp } from "@react-navigation/stack";
import CryptoJS from "crypto-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowHeight = Dimensions.get('window').height;
type RootStackParamList = {
  Certification: { email: string; employeeId: string };
  Privatekey: { privateKey: string };
};

type CertificationNumScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Certification'>;
type CertificationNumScreenRouteProp = RouteProp<RootStackParamList, 'Certification'>;

interface CertificationNumScreenProps {
  navigation: CertificationNumScreenNavigationProp;
  route: CertificationNumScreenRouteProp;
}

export default function CertificationNumScreen({ route, navigation }: CertificationNumScreenProps) {
  const { email, employeeId } = route.params; // 이메일, 사번 받기

  const [certificationNum, setCertificationNum] = useState("");
  const [isCertified, setIsCertified] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);  // 처음에는 버튼을 비활성화 상태로 설정
  const [privateKey, setPrivateKey] = useState("");
  const [address, setAddress] = useState("");
  const [storedPin, setStoredPin] = useState<string | null>(null);

  useEffect(() => {
    const fetchStoredPin = async () => {
      try {
        const pin = await AsyncStorage.getItem('userPin');
        setStoredPin(pin);
      }
      catch (error) {
        Alert.alert("오류", "PIN번호 못 가져옴");
      }
    }
  }, []);
  
  const handleCertificationNumChange = (text: string) => {
    setCertificationNum(text);
    setButtonDisabled(text.trim() === "");
  };

  const handleCertificationComplete = async () => {
    if (certificationNum.trim() === "") {
      Alert.alert("오류", "인증번호를 입력하세요"); // 인증번호 칸 비어있을 때 오류메세지 출력
    } else {
      try {
        // const response = await fetch(`${URL}/api/v1/finish-sign`, { // URL에 fetch
        //   method: 'POST', // 입력받은 정보 전송
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     email,
        //     employeeId,
        //     code: certificationNum,
        //   }),
        // });

        // if (response.ok) { // 인증완료 되면
        if (true) {
          // 계정 생성 후 private key 보내기
          const web3 = new Web3(NETWORK);
          const account = web3.eth.accounts.create(); // 계정 생성
          const generatedPrivateKey = account.privateKey; // 생성된 계정의 private Key
          const generatedAddress = account.address; // 생성된 계정 주소

          // state 상태 바꿔주고
          setIsCertified(true);
          setButtonDisabled(false); 
          setPrivateKey(generatedPrivateKey);
          setAddress(generatedAddress);

          Alert.alert("인증 완료", "인증이 완료되었습니다!");

          // 서버로 보내기
          // const walletResponse = await fetch(`${URL}/api/v1/wallet`, {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({
          //     email,
          //     employeeId,
          //     address: generatedAddress,
          //   }),
          // });

          // 계정 생성 후 잘 보냈다? state update
          // if (walletResponse.ok) {
          if (true) {
            console.log(`privateKey: ${generatedPrivateKey}`);
            console.log(`address: ${generatedAddress}`);
          } else {
            console.error();
          }
        } 
        else {
          Alert.alert("오류", "인증 실패. 다시 시도하세요.");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("오류", "다시 시도하세요.");
      }
    }
  };

  const handleResendCertificationNum = () => {
    Alert.alert("알림", "인증번호가 재전송되었습니다.");
    setIsCertified(false);
    setButtonDisabled(true);
    setPrivateKey(""); // 재전송 누르면 다시 초기화
    setAddress("");
  };

  const handleSignUpComplete = async () => {
    if (isCertified) {
      navigation.navigate('Privatekey', { privateKey });
    } else {
      Alert.alert("오류", "먼저 인증을 완료하세요");
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
        <InputField 
          placeholder="인증번호 입력"
          defaultValue={certificationNum}
          onChangeText={handleCertificationNumChange}
          style={styles.inputField} 
        />
        <TouchableOpacity style={styles.retryButton} onPress={handleResendCertificationNum}>
          <Text style={styles.retryText}>인증번호 재전송</Text>
        </TouchableOpacity>
        <Button 
          buttonText="인증완료" 
          onPress={handleCertificationComplete} 
          style={[styles.button, !buttonDisabled ? styles.activeButton : styles.disabledButton]} 
        />
        <Button 
          buttonText="회원가입완료" 
          onPress={handleSignUpComplete} 
          style={[styles.button, isCertified ? styles.activeButton : styles.disabledButton]} 
        />
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
