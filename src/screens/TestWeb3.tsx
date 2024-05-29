import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "../components/Button";
import { network } from "../const/url";
import Web3 from 'web3';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

export default function TestWeb3() {
  const web3 = new Web3(network);

  // 특정 주소의 잔액 확인 함수
  const checkBalance = async (address) => {
    try {
      const balance = await web3.eth.getBalance(address);
      console.log(`Balance of address ${address}: ${web3.utils.fromWei(balance, 'ether')} ETH`);
    } catch (error) {
      console.error(`Error getting balance: ${error.message}`);
    }
  };

  // 확인할 주소
  const addressToCheck = '0xd17fb275b52C2D2ee869Af8A6C31dABc4Bc0527c'; // 실제 확인할 주소로 변경
  
  return (
    <View style={styles.container}>
      <Button buttonText={"테스트"} style={styles.button} onPress={() => checkBalance(addressToCheck)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: '40%', 
    height: '20%'
  }
});
