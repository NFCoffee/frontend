import React from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Image } from "react-native";
import { COLOR } from "../utils/color";

const windowHeight = Dimensions.get('window').height;
export default function CertificationNumScreen() {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.mainText}>분실 처리 완료!</Text>
                <Text style={styles.subText}>담당자의 처리 이후 연락 드리겠습니다.</Text>
                <TouchableOpacity style={styles.returnHomeButton} onPress={() => {}}>
                    <Text style={styles.returnHomeText}>처음으로 돌아가기</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLOR.background,
        alignItems: "center",
    },
    mainText: {
        fontFamily: 'SeoulNamsanB',
        fontSize: 50,
        top: windowHeight * 0.45,
        fontWeight: '900',
    },
    subText: {
        fontFamily: 'SeoulNamsanB',
        fontSize: 18,
        top: windowHeight * 0.47,
    },
    returnHomeButton: {
        top: windowHeight * 0.8,
    },
    returnHomeText: {
        fontFamily: 'SeoulNamsan',
        fontSize: 20,
        textDecorationLine: 'underline',
    },
});