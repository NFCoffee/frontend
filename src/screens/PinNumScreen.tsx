import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity } from "react-native";
import PinView from 'react-native-pin-view';
import { COLOR } from "../utils/color";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowHeight = Dimensions.get('window').height;

export default function LoginScreen() {
    const pinView = useRef<PinView>(null); // ref 초기화
    const [pin, setPin] = useState("");
    const [step, setStep] = useState(1); // 단계 상태 추가
    const [firstPin, setFirstPin] = useState(""); // 첫 번째 PIN 저장

    const handleComplete = async (enteredPin: string) => {
        if (step === 1) {
            // 첫 번째 PIN 입력
            setFirstPin(enteredPin);
            setStep(2);
            pinView.current.clear(); // PINView 초기화
        } else if (step === 2) {
            // 두 번째 PIN 입력
            if (enteredPin === firstPin) {
                try {
                    await AsyncStorage.setItem('userPin', enteredPin);
                    Alert.alert("완료", "PIN 번호가 저장되었습니다.");
                } catch (error) {
                    Alert.alert("오류", "PIN 번호를 저장하는 중 오류가 발생했습니다.");
                }
            } else {
                Alert.alert("오류", "PIN 번호가 일치하지 않습니다. 다시 시도해 주세요.");
            }
            setStep(1);
            setFirstPin("");
            pinView.current.clear(); // PINView 초기화
        }
    };

    const handleClear = () => {
        if (pinView.current) {
            pinView.current.clear();
            setPin("");
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.mainText}>PIN 번호 생성</Text>
                <Text style={styles.subText}>
                    {step === 1 ? "로그인에 사용할 번호입니다." : "다시 한번 입력 해주세요."}
                </Text>
            </View>
            <View style={styles.pinContainer}>
                <PinView
                    ref={pinView}
                    onComplete={handleComplete}
                    pinLength={6}
                    inputSize={32}
                    buttonSize={60}
                    onValueChange={value => setPin(value)}
                    inputAreaStyle={styles.pinInputArea}
                    buttonAreaStyle={styles.pinButtonArea}
                    buttonTextStyle={styles.pinButtonText}
                    inputViewEmptyStyle={styles.pinInputViewEmpty}
                    inputViewFilledStyle={styles.pinInputViewFilled}
                    customRightButton={
                        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                            <Text style={styles.clearButtonText}>X</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: COLOR.background,
        zIndex: 1,
    },
    mainText: {
        color: COLOR.dark,
        fontSize: 35,
        fontWeight: '500',
        top: windowHeight * 0.25,
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
        backgroundColor: COLOR.background,
    },
    pinInputArea: {
        marginTop: '40%',
    },
    pinButtonArea: {
        marginTop: '13%',
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
