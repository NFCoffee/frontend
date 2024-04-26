import React from "react";
import { COLOR } from "../utils/color";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Beverage from "../components/Beverage";

import jamong from '../assets/images/KakaoTalk_Image_2024-04-15-19-29-11_001.png'
import mocha from '../assets/images/KakaoTalk_Image_2024-04-15-19-29-11_002.png'
import latte from '../assets/images/KakaoTalk_Image_2024-04-15-19-29-11_003.png'
import brewed from '../assets/images/KakaoTalk_Image_2024-04-15-19-29-11_004.png'
import honey from '../assets/images/KakaoTalk_Photo_2024-04-15-20-04-08_001.png'
import milktea from '../assets/images/KakaoTalk_Photo_2024-04-15-20-04-08_002.png'


export default function OrderScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{alignItems: 'center', height:'100%'}}>
                <Text style={styles.text}>주문</Text>
                <View style={styles.box}>
                    <ScrollView style={{width: "100%", height: '100%', borderRadius: 16}}>
                        <View style={{alignItems: "center"}}>
                            <Beverage name="핑크자몽" englishName="Pink Grapefruit" image={jamong}/>
                            <Beverage name="할리데이 모카" englishName="Holiday Mocha" image={mocha}/>
                            <Beverage name="카페 라떼" englishName="Cafe Latte" image={latte}/>
                            <Beverage name="브루드커피" englishName="Brewed Coffee" image={brewed}/>
                            <Beverage name="허니유자" englishName="Honey Citron" image={honey}/>
                            <Beverage name="허니밀크티" englishName="Honey Milktea" image={milktea}/>
                        </View>
                    </ScrollView>                    
                </View>
                <View style={styles.cart}>
                    <Text style={[styles.text, {fontSize: 20, marginTop: "3%"}]}>장바구니</Text>
                    <View style={styles.cartItems}>
                        <Text style={[styles.text, styles.cartItem]}>품목1</Text>
                        <Text style={[styles.text, styles.cartItem]}>품목2</Text>
                    </View>
                    <Button buttonText="주문하기" style={{bottom: -30}}/>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.background,
        width: '100%',
        height: '100%',
    },
    text: {
        color: COLOR.dark,
        fontSize: 35,
        marginTop: "5%",
        marginBottom: "5%",
        fontFamily: "SeoulNamsanB"
    },
    box: {
        backgroundColor: "#ffffff",
        marginTop: "7%",
        width: '85%',
        height: '50%',
        borderRadius: 16
    },
    cart: {
        height: '100%',
        width: '100%',
        marginTop: '6%',
        backgroundColor: "#ffffff",
        alignItems: 'center',
    },
    cartItems: {
        alignSelf: 'flex-start',
    },
    cartItem: {
        fontSize: 17,
        marginTop: "1%",
        marginLeft: "6%",
    },
})