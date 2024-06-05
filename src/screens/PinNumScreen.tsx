import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Alert, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import PinView from 'react-native-pin-view';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOR } from "../utils/color";

const windowHeight = Dimensions.get('window').height;

const PinNumScreen = () => {
    const pinView = useRef(null); // ref 초기화
    const [pin, setPin] = useState("");
    const [step, setStep] = useState(1); // 단계 상태 추가
    const [firstPin, setFirstPin] = useState(""); // 첫 번째 PIN 저장
    const [hashedPrivateKey, setHashedPrivateKey] = useState(""); // 해싱된 private key 저장

    useEffect(() => {
        if (pin.length === 6) {
            if (step === 1) {
                // 첫 번째 PIN 입력
                setFirstPin(pin);
                setStep(2);
                setPin(""); // PIN 상태 초기화
                pinView.current.clearAll(); // PINView 초기화
            }
            else if (step === 2) {
                // 두 번째 PIN 입력
                if (pin === firstPin) {
                    AsyncStorage.getItem('hashedPrivateKey').then((value) => {
                        if (value) {
                            setHashedPrivateKey(value);
                            AsyncStorage.setItem(pin, value).then(() => {
                                Alert.alert("완료", "PIN과 해싱된 privateKey가 저장됨.");
                                pinView.current.clearAll();
                            }).catch(error => {
                                Alert.alert("오류", "저장과정에서 오류 발생");
                            });
                        } else Alert.alert("오류", "해싱된 privateKey를 가져오는 중 오류가 발생했습니다.");
                    }).catch(error => {Alert.alert("오류", "해싱된 privatekey를 가져오는데 실패")});
                } 
                else {
                    Alert.alert("오류", "PIN 번호가 일치하지 않습니다. 다시 시도해 주세요.");
                    pinView.current.clearAll(); // PINView 초기화
                }
                setStep(1);
                setFirstPin("");
                setPin(""); // PIN 상태 초기화
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
                <Text style={styles.mainText}>PIN 번호 생성</Text>
                <Text style={styles.subText}>
                    {step === 1 ? "로그인에 사용할 번호입니다." : "같은 번호를 다시 입력 해주세요."}
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
