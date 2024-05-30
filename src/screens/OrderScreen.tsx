import React, { useCallback, useEffect, useState } from "react";
import { COLOR } from "../utils/color";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

import { NETWORK, PLZTOKEN, BEVERAGEORDERING } from "../const/url";
import PLZTokenABI from '../utils/PLZToken_ABI.json';
import PLZOrderingABI from '../utils/Ordering_ABI.json';
import Web3 from "web3";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Order: { beverage: string, englishname: string, privateKey: string };
  PaymentSuccess: {privateKey: string};
};

type OrderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Order'>;
type OrderScreenRouteProp = RouteProp<RootStackParamList, 'Order'>;

interface OrderScreenProps {
  navigation: OrderScreenNavigationProp;
  route: OrderScreenRouteProp;
}

export default function OrderScreen({ navigation, route }: OrderScreenProps) {
  const web3 = new Web3(NETWORK);
  const [selectedBeverage, setSelectedBeverage] = useState<string | null>(null);
  const [selectedEnglishBeverage, setSelectedEnglishBeverage] = useState<string | null>(null);
  const userAccount = web3.eth.accounts.privateKeyToAccount(route.params.privateKey);
  const userAddress = userAccount.address;
  const plzTokenContract = new web3.eth.Contract(
    PLZTokenABI as any,
    PLZTOKEN,
  );
  const orderingContract = new web3.eth.Contract(
    PLZOrderingABI as any,
    BEVERAGEORDERING,
  );

  useEffect(() => {
    if (route.params?.beverage) {
      setSelectedBeverage(route.params.beverage);
      setSelectedEnglishBeverage(route.params.englishname);
    } else {
      setSelectedBeverage(null);
      setSelectedEnglishBeverage(null);
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
  
  const approve = async(account: string) => {
    try {
      const txCount = await web3.eth.getTransactionCount(account);
  
      const latestBlock = await web3.eth.getBlock('latest');
      const baseFeePerGas = latestBlock.baseFeePerGas ? BigInt(latestBlock.baseFeePerGas) : BigInt(0);
      const maxPriorityFeePerGas = BigInt(web3.utils.toWei('2', 'gwei'));
  
      const txObject = {
        from: account,
        to: PLZTOKEN,
        data: plzTokenContract.methods.approve(BEVERAGEORDERING, '1000000000000000000').encodeABI(),
        gasLimit: web3.utils.toHex(210000),
        maxFeePerGas: web3.utils.toHex(baseFeePerGas + maxPriorityFeePerGas),
        maxPriorityFeePerGas: web3.utils.toHex(maxPriorityFeePerGas),
        nonce: web3.utils.toHex(txCount),
        type: '0x2'
      };
  
      const gasLimit = await web3.eth.estimateGas(txObject);
      txObject.gasLimit = web3.utils.toHex(gasLimit);
  
      const signedTx = await web3.eth.accounts.signTransaction(txObject, route.params.privateKey);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
      console.log('Approve Receipt:', receipt);

      const timestamp = new Date();
      const transactionRecord = {
        hash: receipt.transactionHash,
        method: 'PLZTOKEN.approve',
        time: timestamp.toLocaleString()
      };

      // 로컬 스토리지에 트랜잭션 기록 추가 및 상태 업데이트
      const transactionHistory = await AsyncStorage.getItem('transactionHistory');
      const transactionArray = transactionHistory ? JSON.parse(transactionHistory) : [];
      transactionArray.push(transactionRecord);
      await AsyncStorage.setItem('transactionHistory', JSON.stringify(transactionArray));
    } catch (error: any) {
      console.error('Approve Error:', error.message);
      throw error;  // 오류를 상위로 전파
    }
  };
  
  const order = async(account: string) => {
    try {
      const txCount = await web3.eth.getTransactionCount(account);
  
      const latestBlock = await web3.eth.getBlock('latest');
      const baseFeePerGas = latestBlock.baseFeePerGas ? BigInt(latestBlock.baseFeePerGas) : BigInt(0);
      const maxPriorityFeePerGas = BigInt(web3.utils.toWei('2', 'gwei'));
  
      const txObject = {
        from: account,
        to: BEVERAGEORDERING,
        data: orderingContract.methods.orderBeverage(selectedEnglishBeverage).encodeABI(),
        gasLimit: web3.utils.toHex(210000),
        maxFeePerGas: web3.utils.toHex(baseFeePerGas + maxPriorityFeePerGas),
        maxPriorityFeePerGas: web3.utils.toHex(maxPriorityFeePerGas),
        nonce: web3.utils.toHex(txCount),
        type: '0x2'
      };
  
      const gasLimit = await web3.eth.estimateGas(txObject);
      txObject.gasLimit = web3.utils.toHex(gasLimit);
  
      const signedTx = await web3.eth.accounts.signTransaction(txObject, route.params.privateKey);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
      console.log('Beverage order Receipt:', receipt);

      const timestamp = new Date();
      const transactionRecord = {
        hash: receipt.transactionHash,
        method: `Ordering.orderBeverage.${selectedEnglishBeverage}`,
        time: timestamp.toLocaleString()
      };

      // 로컬 스토리지에 트랜잭션 기록 추가 및 상태 업데이트
      const transactionHistory = await AsyncStorage.getItem('transactionHistory');
      const transactionArray = transactionHistory ? JSON.parse(transactionHistory) : [];
      transactionArray.push(transactionRecord);
      await AsyncStorage.setItem('transactionHistory', JSON.stringify(transactionArray));
    } catch (error) {
      console.error('Order Error:', error.message);
      throw error;  // 오류를 상위로 전파
    }
  };
  
  const approveAndOrder = async(account: string) => {
    try {
      await approve(account);  // await 키워드 추가
      await order(account);    // await 키워드 추가
      navigation.navigate("PaymentSuccess", {privateKey: route.params.privateKey});
    } catch (error) {
      console.log(error);
    }
  };
  
  const showConfirmationAlert = () => {
    Alert.alert(
      "토큰을 사용하시겠습니까?",
      "토큰이 한 개 차감됩니다.",
      [
        {
          text: "아니오",
          onPress: () => console.log("토큰 사용 취소됨"),
          style: "cancel"
        },
        {
          text: "예",
          onPress: () => approveAndOrder(userAddress)
        },
      ],
      { cancelable: false }
    );
  };
  

  const handleSelectBeverage = (name: string, englishname:string) => {
    setSelectedBeverage(name);
    setSelectedEnglishBeverage(englishname);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{alignItems: 'center', height:'100%'}}>
        <Text style={styles.text}>주문</Text>
        <View style={styles.box}>
          <ScrollView style={{width: "100%", height: '100%', borderRadius: 16}}>
            <View style={{marginLeft: '5%'}}>
              <TouchableOpacity onPress={() => handleSelectBeverage("핑크자몽", "Pink Grapefruit")}>
                <Beverage name="핑크자몽" englishName="Pink Grapefruit" image={jamong} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelectBeverage("할리데이 모카", "Holiday Mocha")}>
                <Beverage name="할리데이 모카" englishName="Holiday Mocha" image={mocha} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelectBeverage("카페 라떼", "Cafe Latte")}>
                <Beverage name="카페 라떼" englishName="Cafe Latte" image={latte} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelectBeverage("브루드커피", "Brewed Coffee")}>
                <Beverage name="브루드커피" englishName="Brewed Coffee" image={brewed} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelectBeverage("허니유자", "Honey Citron")}>
                <Beverage name="허니유자" englishName="Honey Citron" image={honey} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSelectBeverage("허니밀크티", "Honey Milktea")}>
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
        <Button buttonText="주문하기" style={styles.button} onPress={showConfirmationAlert}/>
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

function async(privateKey: string) {
  throw new Error("Function not implemented.");
}
