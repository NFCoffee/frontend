import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Image } from "react-native";
import BasicScreen from "../components/BasicScreen";
import Button from "../components/Button";
import { COLOR } from "../utils/color";
import InputField from "../components/InputField";
import Logo from '../assets/images/planzLogo.png'
import { StackNavigationProp } from "@react-navigation/stack";
import SmartContractService from "../utils/SmartContractService";
import { PrivateKeyProvider, usePrivateKey } from '../context/PrivateKeyContext';
import Web3 from "web3";
import { NETWORK } from "../const/url"
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
  const [hasNFT, setHasNFT] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | null>(null);
  const web3 = new Web3(NETWORK);

  useFocusEffect( // 해당 페이지를 벗어날 경우 인풋 초기화
    React.useCallback(() => {
      return () => setInputKey('');
    }, [])
  );

  useEffect(() => { // 자동 로그인
    const checkAutoLogin = async () => {
      const storedPrivateKey = await AsyncStorage.getItem('privateKey');
      if (storedPrivateKey) {
        setPrivateKey(storedPrivateKey);
        navigation.navigate('Tab');
      }
    };
    checkAutoLogin();
  }, []);
  
  const handleLogin = async () => {
    try {
      // Validate the private key
      const account = web3.eth.accounts.privateKeyToAccount(inputKey);
      web3.eth.accounts.wallet.add(account);

      // Save the private key to context and AsyncStorage
      setPrivateKey(inputKey);
      await AsyncStorage.setItem('privateKey', inputKey);

      // Navigate to the main tab
      navigation.navigate('Tab');
    } catch (error) {
      console.error("Invalid private key:", error);
      // Handle the error (e.g., show an alert to the user)
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
        <InputField placeholder="private key 입력" defaultValue={inputKey} style={styles.inputField} onChangeText={setInputKey} />
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