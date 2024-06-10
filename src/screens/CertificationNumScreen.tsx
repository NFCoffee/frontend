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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;

type RootStackParamList = {
  Certification: { email: string; employeeId: string };
  Privatekey: { privateKey: string };
  PinNum: { privateKey: string };
};

type CertificationNumScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Certification'>;
type CertificationNumScreenRouteProp = RouteProp<RootStackParamList, 'Certification'>;

interface CertificationNumScreenProps {
  navigation: CertificationNumScreenNavigationProp;
  route: CertificationNumScreenRouteProp;
}

export default function CertificationNumScreen({ route, navigation }: CertificationNumScreenProps) {
  const { email, employeeId } = route.params;
  const [certificationNum, setCertificationNum] = useState("");
  const [isCertified, setIsCertified] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [privateKey, setPrivateKey] = useState("");
  const [hashedPrivateKey, setHashedPrivateKey] = useState("");
  const [userAddress, setUserAddress] = useState("");

  const handleCertificationNumChange = (text: string) => {
    setCertificationNum(text);
    setButtonDisabled(text.trim() === "");
  };

  const generateSalt = (length: number) => {
    const characters = 'PLzNf@Cc&O%F*f&e3E21';
    return characters;
  };

  const combineAndShuffle = (privateKey: string, salt: string) => {
    return privateKey + salt;
  };

  const handleCertificationComplete = async () => {
    if (certificationNum.trim() === "") {
      Alert.alert("오류", "인증번호를 입력하세요");
      return;
    }
  
    try {
      const response = await axios.post(`${URL}/api/v1/finish-sign`, {
        email,
        employeeId,
        code: certificationNum,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const web3 = new Web3(NETWORK);
        const account = web3.eth.accounts.create();
        const generatedPrivateKey = account.privateKey;
        const salt = generateSalt(16);
        const shuffledPrivateKey = combineAndShuffle(generatedPrivateKey, salt);
  
        // 지갑에 계정 추가
        web3.eth.accounts.wallet.add(account);
  
        setIsCertified(true);
        setButtonDisabled(false);
        setPrivateKey(generatedPrivateKey);
        setHashedPrivateKey(shuffledPrivateKey);

        // AsyncStorage에 salt와 shuffledPrivateKey 저장
        await AsyncStorage.setItem('salt', salt);
        await AsyncStorage.setItem('hashedPrivateKey', shuffledPrivateKey);
  
        Alert.alert("인증 완료", "인증이 완료되었습니다!");
  
        console.log(email, employeeId, web3.eth.accounts.privateKeyToAccount(generatedPrivateKey).address);
      } else {
        Alert.alert("오류", "인증 실패. 다시 시도하세요.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("오류", "다시 시도하세요.");
    }
  };

  const storeWalletInfo = async () => {
    console.log('storeWalletInfo 호출', email, employeeId, userAddress);
    try {
      const response = await axios.post(`${URL}/api/v1/wallet`, {
        email,
        employeeId,
        wallet: userAddress,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        console.log(`hashedPrivateKey: ${hashedPrivateKey}`);
        console.log(`address: ${userAddress}`);
      } else {
        console.error("서버 저장 중 오류 발생");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("오류", "지갑 정보를 저장하는 중 오류가 발생했습니다.");
    }
  };

  const handleResendCertificationNum = async () => {
    Alert.alert("알림", "인증번호가 재전송되었습니다.");
    try {
      const response = await axios.post(`${URL}/api/v1/resend-code`, {
        email,
        employeeId,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        console.error("인증번호 재전송 중 오류 발생");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("오류", "인증번호 재전송 중 오류 발생");
    }
  };

  const handleSignUpComplete = async () => {
    if (isCertified) {
      navigation.navigate('PinNum', { privateKey });
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
