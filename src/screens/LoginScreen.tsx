import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Image, Alert } from "react-native";
import BasicScreen from "../components/BasicScreen";
import Button from "../components/Button";
import { COLOR } from "../utils/color";
import InputField from "../components/InputField"; // InputField 컴포넌트 임포트
import Logo from '../assets/images/planzLogo.png'
import { StackNavigationProp } from "@react-navigation/stack";
import { PrivateKeyProvider, usePrivateKey } from '../context/PrivateKeyContext';
import Web3 from "web3";
import { NETWORK } from "../const/url";
import { CompositeNavigationProp, useFocusEffect } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Lostkey: undefined;
  Tab: undefined;
};

type TabParamList = {
  Main: undefined;
  Login: undefined;
};

type LoginScreenStackNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenTabNavigationProp = BottomTabNavigationProp<TabParamList, 'Login'>;

type LoginScreenNavigationProp = CompositeNavigationProp<
  LoginScreenStackNavigationProp,
  LoginScreenTabNavigationProp
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const windowHeight = Dimensions.get('window').height;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { setPrivateKey } = usePrivateKey();
  const [inputKey, setInputKey] = useState<string>('');
  const [hasStoredKey, setHasStoredKey] = useState<boolean>(false); // 상태 추가
  const web3 = new Web3(NETWORK);

  const checkStoredKey = async () => {
    const storedPrivateKey = await AsyncStorage.getItem('privateKey');
    if (storedPrivateKey) {
      setHasStoredKey(true);
    }
  };

  const checkAutoLogin = async () => {
    const storedPrivateKey = await AsyncStorage.getItem('privateKey');
    if (storedPrivateKey) {
      setPrivateKey(storedPrivateKey);
      navigation.navigate('Tab');
    }
  };

  useFocusEffect( // 해당 페이지를 벗어날 경우 인풋 초기화
    React.useCallback(() => {
      return () => setInputKey('');
    }, [])
  );
  
  useEffect(() => { // 해싱된 private key 확인
    checkAutoLogin(); // 자동 로그인
    checkStoredKey(); // 해싱된 private key 확인
  }, []);
  
  const handleLogin = async () => {
    // 우선 입력값이 프라이빗 키 형식인지 확인
    const isPrivateKey = inputKey.startsWith("0x") && inputKey.length === 66;
    if (isPrivateKey) {
        try {
            // Private key 검증
            const account = web3.eth.accounts.privateKeyToAccount(inputKey);

            // Private key를 context와 AsyncStorage에 저장
            setPrivateKey(inputKey);
            await AsyncStorage.setItem('privateKey', inputKey);

            // 메인 탭으로 이동
            navigation.navigate('Tab');
        } 
        catch (error) {
            console.error("유효하지 않은 private key:", error);
            Alert.alert("오류", "유효하지 않은 private key입니다.");
        }
    } 
    else {
      // PIN 번호 검증
        try {
            const storedHashedPrivateKey = await AsyncStorage.getItem(inputKey);
            if (storedHashedPrivateKey) {
                setPrivateKey(storedHashedPrivateKey);
                await AsyncStorage.setItem('privateKey', storedHashedPrivateKey);
                navigation.navigate('Tab');
            } 
            else {
                Alert.alert("오류", "유효하지 않은 PIN 번호입니다.");
            }
        } 
        catch (pinError) {
            console.error("유효하지 않은 PIN 번호:", pinError);
            Alert.alert("오류", "유효하지 않은 PIN 번호입니다.");
        }
    }
  }

  const handleSignup = () => {
    navigation.navigate("Signup");
  }

  const handleLostkey = () => {
    navigation.navigate("Lostkey");
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.mainText}>NFCOFFEE</Text>
      </View>
      <BasicScreen>
        <View style={styles.content}>
          <Image source={Logo} style={styles.imgStyle} />
          <InputField 
            placeholder={ "private key 또는 pin 번호 입력 " }
            defaultValue={inputKey} 
            style={styles.inputField} 
            onChangeText={setInputKey}
          />
          <Button buttonText="로그인" style={styles.button} onPress={handleLogin}/>
          <Button buttonText="회원가입" style={styles.button} onPress={handleSignup}/>
        </View>
      </BasicScreen>
      <TouchableOpacity style={styles.bottomButton} onPress={handleLostkey}>
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
