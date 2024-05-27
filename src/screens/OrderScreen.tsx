import React, { useCallback, useEffect, useState } from "react";
import { COLOR } from "../utils/color";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import Beverage from "../components/Beverage";

import jamong from '../assets/images/KakaoTalk_Image_2024-04-15-19-29-11_001.png'
import mocha from '../assets/images/KakaoTalk_Image_2024-04-15-19-29-11_002.png'
import latte from '../assets/images/KakaoTalk_Image_2024-04-15-19-29-11_003.png'
import brewed from '../assets/images/KakaoTalk_Image_2024-04-15-19-29-11_004.png'
import honey from '../assets/images/KakaoTalk_Photo_2024-04-15-20-04-08_001.png'
import milktea from '../assets/images/KakaoTalk_Photo_2024-04-15-20-04-08_002.png'

import { StackNavigationProp } from "@react-navigation/stack";
import { useFocusEffect } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Order: { beverage?: string };
  PaymentSuccess: undefined;
};

type OrderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Order'>;
type OrderScreenRouteProp = RouteProp<RootStackParamList, 'Order'>;

interface OrderScreenProps {
  navigation: OrderScreenNavigationProp;
  route: OrderScreenRouteProp;
}

export default function OrderScreen({ navigation, route }: OrderScreenProps) {
  const [selectedBeverage, setSelectedBeverage] = useState<string | null>(null);

  useEffect(() => {
    if (route.params?.beverage) {
      setSelectedBeverage(route.params.beverage);
    }
  }, [route.params?.beverage]);

  useFocusEffect(
    useCallback(() => {
      // 화면이 포커스될 때
      return () => {
        // 화면이 포커스를 잃을 때
        setSelectedBeverage(null);
      };
    }, [])
  );
  
  const handlePaymentSuccess = () => {
    navigation.navigate("PaymentSuccess")
    // 주문내역(selectedBeverage) 포함? 토큰 1개 사용 처리 할 것.
    // 토큰 사용 성공 ? navigation : Alert.alert("결제 실패 ... 등의 멘트")
  }

  const handleSelectBeverage = (name: string) => {
    setSelectedBeverage(name);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{alignItems: 'center', height:'100%'}}>
        <Text style={styles.text}>주문</Text>
        <View style={styles.box}>
          <ScrollView style={{width: "100%", height: '100%', borderRadius: 16}}>
            <View style={{marginLeft: '5%'}}>
              <TouchableOpacity onPress={() => handleSelectBeverage("핑크자몽")}>
                <Beverage name="핑크자몽" englishName="Pink Grapefruit" image={jamong} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelectBeverage("할리데이 모카")}>
                <Beverage name="할리데이 모카" englishName="Holiday Mocha" image={mocha} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelectBeverage("카페 라떼")}>
                <Beverage name="카페 라떼" englishName="Cafe Latte" image={latte} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelectBeverage("브루드커피")}>
                <Beverage name="브루드커피" englishName="Brewed Coffee" image={brewed} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelectBeverage("허니유자")}>
                <Beverage name="허니유자" englishName="Honey Citron" image={honey} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelectBeverage("허니밀크티")}>
                <Beverage name="허니밀크티" englishName="Honey Milktea" image={milktea} />
              </TouchableOpacity>
            </View>
          </ScrollView>                    
        </View>
        <View style={styles.cart}>
          <Text style={[styles.text, {fontSize: 20, marginTop: "3%"}]}>선택 품목</Text>
          <View>
            {selectedBeverage ? (
              <Text style={[styles.text, styles.cartItem]}>{selectedBeverage}</Text>
            ) : (
              <Text style={[styles.text, styles.cartItem]}>음료를 한 개 선택해주세요!</Text>
            )}
          </View>
        </View>
        <Button buttonText="주문하기" style={styles.button} onPress={handlePaymentSuccess}/>
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
    marginBottom: "4%",
    fontFamily: "SeoulNamsanB"
  },
  box: {
    backgroundColor: "#ffffff",
    marginTop: "5%",
    width: '85%',
    height: '55%',
    borderRadius: 16
  },
  cart: {
    height: '100%',
    width: '100%',
    marginTop: '12%',
    backgroundColor: "#ffffff",
    alignItems: 'center',
  },
  cartItem: {
    fontSize: 20,
    marginTop: "1%",
  },
  button: {
    bottom: '3%',
    position: 'absolute',
  }
})