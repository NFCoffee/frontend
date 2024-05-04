import React, {useState} from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from "react-native";
import BasicScreen from "../components/BasicScreen";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { COLOR } from "../utils/color";

interface CertificationNumScreenState {
    certificationNum: string;
}

const windowHeight = Dimensions.get('window').height;
export default function CertificationNumScreen() {
    const [state, setState] = useState<CertificationNumScreenState>({
        certificationNum: ""
    });
    const handleCertificationNumChange = (text: string) => {
        setState({
            ...state,
            certificationNum: text
        });
    }
    const isCertificationNumEntered = () => {
        return state.certificationNum.trim() !== "";
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
            <InputField placeholder="인증번호 입력"
                defaultValue={state.certificationNum}
                onChangeText={handleCertificationNumChange}
                style={styles.inputField} />
            <TouchableOpacity style={styles.retryButton} onPress={() => {}}>
                <Text style={styles.retryText}>인증번호 재전송</Text>
            </TouchableOpacity>
            <Button buttonText="인증완료" style={[styles.button, isCertificationNumEntered() ? null : styles.disabledButton]}></Button>
            <Button buttonText="회원가입완료" style={styles.button}></Button>
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
    disabledButton: {
        opacity: 0.5,
    }
});