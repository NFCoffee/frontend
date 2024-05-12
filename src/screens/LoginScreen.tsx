import React from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Image } from "react-native";
import BasicScreen from "../components/BasicScreen";
import Button from "../components/Button";
import { COLOR } from "../utils/color";
import InputField from "../components/InputField";
import Logo from '../assets/images/planzLogo.png'
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
  Tab: undefined;
  Signup: undefined;
  Lostkey: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const windowHeight = Dimensions.get('window').height;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const handleLogin = () => {
    // 추후에 API 통신이 들어갈 자리입니다.
    // privatekey (${wallet})을 백으로 전송하여 로그인을 진행합니다.
    // 현재는 즉시 메인으로 이동하게 설정해두었습니다.

    navigation.navigate("Tab");
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
        <InputField placeholder="private key 입력" defaultValue="" style={styles.inputField} />
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