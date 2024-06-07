// import React, { useEffect, useState } from "react";
// import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Image } from "react-native";
// import BasicScreen from "../components/BasicScreen";
// import Button from "../components/Button";
// import { COLOR } from "../utils/color";
// import InputField from "../components/InputField"; // InputField 컴포넌트 임포트
// import Logo from '../assets/images/planzLogo.png'
// import { StackNavigationProp } from "@react-navigation/stack";
// import { PrivateKeyProvider, usePrivateKey } from '../context/PrivateKeyContext';
// import Web3 from "web3";
// import { NETWORK } from "../const/url";
// import { CompositeNavigationProp, useFocusEffect } from '@react-navigation/native';
// import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// import AsyncStorage from "@react-native-async-storage/async-storage";

// type RootStackParamList = {
//   Login: undefined;
//   Signup: undefined;
//   Lostkey: undefined;
//   Tab: undefined;
// };

// type TabParamList = {
//   Main: undefined;
//   Login: undefined;
// };

// type LoginScreenStackNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
// type LoginScreenTabNavigationProp = BottomTabNavigationProp<TabParamList, 'Login'>;

// type LoginScreenNavigationProp = CompositeNavigationProp<
//   LoginScreenStackNavigationProp,
//   LoginScreenTabNavigationProp
// >;

// interface LoginScreenProps {
//   navigation: LoginScreenNavigationProp;
// }

// const windowHeight = Dimensions.get('window').height;

// export default function LoginScreen({ navigation }: LoginScreenProps) {
//   const { setPrivateKey } = usePrivateKey();
//   const [inputKey, setInputKey] = useState<string>('');
//   const [hasStoredKey, setHasStoredKey] = useState<boolean>(false); // 상태 추가
//   const web3 = new Web3(NETWORK);

//   useFocusEffect( // 해당 페이지를 벗어날 경우 인풋 초기화
//     React.useCallback(() => {
//       return () => setInputKey('');
//     }, [])
//   );

//   useEffect(() => { // 자동 로그인
//     const checkAutoLogin = async () => {
//       const storedPrivateKey = await AsyncStorage.getItem('privateKey');
//       if (storedPrivateKey) {
//         setPrivateKey(storedPrivateKey);
//         navigation.navigate('Tab');
//       }
//     };
//     checkAutoLogin();
//   }, []);

//   useEffect(() => { // 해싱된 private key 확인
//     const checkStoredKey = async () => {
//       const storedPrivateKey = await AsyncStorage.getItem('privateKey');
//       if (storedPrivateKey) {
//         setHasStoredKey(true);
//       }
//     };
//     checkStoredKey();
//   }, []);
  
//   const handleLogin = async () => {
//     try {
//       // private key 검증
//       const account = web3.eth.accounts.privateKeyToAccount(inputKey);
//       web3.eth.accounts.wallet.add(account);

//       // private key를 context와 AsyncStorage에 저장
//       setPrivateKey(inputKey);
//       await AsyncStorage.setItem('privateKey', inputKey);

//       // 메인 탭으로 이동
//       navigation.navigate('Tab');
//     } catch (error) {
//       console.error("유효하지 않은 private key:", error);
//       // 오류 처리 (예: 사용자에게 알림 표시)
//     }
//   }
  
//   const handleSignup = () => {
//     navigation.navigate("Signup");
//   }

//   const handleLostkey = () => {
//     navigation.navigate("Lostkey");
//   }

//   return (
//     <>
//       <View style={styles.container}>
//         <Text style={styles.mainText}>NFCOFFEE</Text>
//       </View>
//       <BasicScreen>
//         <View style={styles.content}>
//           <Image source={Logo} style={styles.imgStyle} />
//           <InputField 
//             placeholder={ "private key 입력" }
//             defaultValue={inputKey} 
//             style={styles.inputField} 
//             onChangeText={setInputKey}
//           />
//           <Button buttonText="로그인" style={styles.button} onPress={handleLogin}/>
//           <Button buttonText="회원가입" style={styles.button} onPress={handleSignup}/>
//         </View>
//       </BasicScreen>
//       <TouchableOpacity style={styles.bottomButton} onPress={handleLostkey}>
//         <Text style={styles.bottomButtonText}>
//           {hasStoredKey ? "PrivateKey로 로그인 하기" : "private key 분실신고"}
//         </Text>
//         <View style={styles.bottomButtonUnderline} />
//       </TouchableOpacity>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     zIndex: 1,
//   },
//   content: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: '80%',
//     width: '70%',
//   },
//   mainText: {
//     color: COLOR.brown,
//     fontSize: 50,
//     fontWeight: '900',
//     top: windowHeight * 0.25,
//   },
//   imgStyle: {
//     width: '25%',
//     height: '15%',
//     bottom: windowHeight * 0.09,
//   },
//   button: {
//     width: '100%',
//     marginBottom: '10%',
//     bottom: windowHeight * 0.04,
//   },
//   inputField: {
//     width: '100%',
//     bottom: windowHeight * 0.07,
//   },
//   bottomButton : {
//     alignItems: 'center',
//   },
//   bottomButtonText: {
//     color: COLOR.dark,
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: '4%',
//     bottom: windowHeight * 0.04
//   },
//   bottomButtonUnderline: {
//     width: '37%',
//     position: 'absolute',
//     borderBottomColor: COLOR.dark,
//     borderBottomWidth: 1,
//     bottom: windowHeight * 0.055,
//   }
// });

import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Alert, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import PinView from 'react-native-pin-view';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOR } from "../utils/color";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const windowHeight = Dimensions.get('window').height;

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Order: undefined;
  PinNum: { isLogin: boolean };
  Privatekey: { privateKey: string };
};

type PinNumScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type PinNumScreenRouteProp = RouteProp<RootStackParamList, 'PinNum'>;

interface PinNumScreenProps {
  navigation: PinNumScreenNavigationProp;
  route: PinNumScreenRouteProp;
}

const PinNumScreen: React.FC<PinNumScreenProps> = ({ route, navigation }) => {
    const pinView = useRef<PinView>(null); // ref 초기화
    const [pin, setPin] = useState("");
    const [step, setStep] = useState(1); // 단계 상태 추가
    const [firstPin, setFirstPin] = useState(""); // 첫 번째 PIN 저장
    const [hashedPrivateKey, setHashedPrivateKey] = useState(""); // 해싱된 private key 저장
    const isLogin = route.params?.isLogin || false; // 현재 화면이 로그인인지 여부

    useEffect(() => {
        if (pin.length === 6) {
            if (isLogin) {
                // 로그인 처리
                AsyncStorage.getItem('userPin').then((storedPin) => {
                    if (storedPin === pin) {
                        Alert.alert("성공", "로그인 성공");
                        navigation.navigate("Order");
                    } else {
                        Alert.alert("오류", "유효하지 않은 PIN 번호입니다.");
                        pinView.current.clearAll();
                    }
                }).catch(error => {
                    Alert.alert("오류", "로그인 과정에서 오류 발생");
                    pinView.current.clearAll();
                });
            } else {
                // PIN 생성 처리
                if (step === 1) {
                    setFirstPin(pin);
                    setStep(2);
                    setPin(""); // PIN 상태 초기화
                    pinView.current.clearAll(); // PINView 초기화
                } else if (step === 2) {
                    // 두 번째 PIN 입력
                    if (pin === firstPin) {
                        AsyncStorage.getItem('hashedPrivateKey').then((value) => {
                            if (value) {
                                setHashedPrivateKey(value);
                                AsyncStorage.setItem(pin, value).then(() => {
                                    Alert.alert("완료", "PIN과 해싱된 privateKey가 저장됨.");
                                    pinView.current.clearAll();
                                    navigation.navigate('Privatekey', { privateKey: value });
                                }).catch(error => {
                                    Alert.alert("오류", "저장과정에서 오류 발생");
                                });
                            } else {
                                Alert.alert("오류", "해싱된 privateKey를 가져오는 중 오류가 발생했습니다.");
                            }
                        }).catch(error => {
                            Alert.alert("오류", "해싱된 privatekey를 가져오는데 실패");
                        });
                    } else {
                        Alert.alert("오류", "PIN 번호가 일치하지 않습니다. 다시 시도해 주세요.");
                        pinView.current.clearAll(); // PINView 초기화
                    }
                    setStep(1);
                    setFirstPin("");
                    setPin(""); // PIN 상태 초기화
                }
            }
        }
    }, [pin]);

    const handleClear = () => {
        if (pinView.current) {
            pinView.current.clear();
            setPin("");
            setStep(1);
            setFirstPin("");
        }
    };

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                <Text style={styles.mainText}>{isLogin ? "로그인" : "PIN 번호 생성"}</Text>
                <Text style={styles.subText}>
                    {isLogin ? "PIN번호를 입력하세요" : (step === 1 ? "로그인에 사용할 번호입니다." : "같은 번호를 다시 입력 해주세요.")}
                </Text>
                <View style={styles.pinContainer}>
                    <PinView
                        ref={pinView}
                        onComplete={() => {}}
                        pinLength={6}
                        inputSize={32}
                        buttonSize={60}
                        onValueChange={value => setPin(value)}
                        buttonAreaStyle={styles.pinButtonArea}
                        inputAreaStyle={styles.pinInputArea}
                        buttonTextStyle={styles.pinButtonText}
                        inputViewEmptyStyle={styles.pinInputViewEmpty}
                        inputViewFilledStyle={styles.pinInputViewFilled}
                        customRightButton={
                            <TouchableOpacity onPress={handleClear}>
                                <Text style={styles.pinButtonText}>{"삭제"}</Text>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        zIndex: 1,
        backgroundColor: COLOR.background,
    },
    mainText: {
        color: COLOR.dark,
        fontSize: 35,
        fontWeight: '500',
        top: windowHeight * 0.2,
        fontFamily: 'SeoulNamsanB',
    },
    subText: {
        color: COLOR.dark,
        fontSize: 16,
        top: windowHeight * 0.26,
    },
    pinContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: windowHeight * 0.2,
    },
    pinInputArea: {
        marginTop: '30%',
        bottom: windowHeight * 0.13,
    },
    pinButtonArea: {
        marginTop: '13%',
        bottom: windowHeight * 0.13,
    },
    pinButtonText: {
        color: COLOR.dark,
        fontSize: 20,
    },
    pinInputViewEmpty: {
        backgroundColor: COLOR.background,
        borderWidth: 1,
        borderColor: COLOR.dark,
    },
    pinInputViewFilled: {
        backgroundColor: COLOR.dark,
    },
    clearButton: {
        backgroundColor: COLOR.background,
    },
    clearButtonText: {
        color: COLOR.dark,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PinNumScreen;
