import React, { useEffect, useState } from "react";
import { COLOR } from "../utils/color";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import Web3, { AbiItem } from "web3";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { quickOrderItems } from "../const/quickOrderItems";
import { transactionItems } from "../const/transactionItems";
import { RouteProp } from '@react-navigation/native';
import { NETWORK, PLZTOKEN, PLZNFT } from "../const/url";
import PLZTokenABI from '../utils/PLZToken_ABI.json';
import PLZNFTABI from '../utils/PLZNFT_ABI.json';

type RootStackParamList = {
  Main: {privateKey: string};
  Order: { beverage?: string, englishname?: string, privateKey: string };
  History: undefined;
};

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
type MainScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;

interface MainScreenProps {
  navigation: MainScreenNavigationProp;
  route: MainScreenRouteProp;
}

export default function MainScreen({ navigation, route }: MainScreenProps) {
  const web3 = new Web3(NETWORK);
  const [isTokenReceived, setIsTokenReceived] = useState(false);
  const [lastRequestedAt, setLastRequestedAt] = useState<number | null>(null);
  const [timeRemained, setTimeRemained] = useState<number>(0);
  const [balance, setBalance] = useState<string>('');
  const [ownsNFT, setOwnsNFT] = useState<boolean | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);
  const tokenContractAddress = PLZTOKEN; // 토큰 컨트랙트 주소
  const nftContractAddress = PLZNFT; // NFT 컨트랙트 주소
  const userAccount = web3.eth.accounts.privateKeyToAccount(route.params.privateKey);
  const userAddress = userAccount.address;
  const plzTokenContract = new web3.eth.Contract(PLZTokenABI as any, PLZTOKEN);

  const checkBalance = async () => { // 토큰 개수 확인
    if (userAddress) {
      const contract = new web3.eth.Contract(PLZTokenABI as any, tokenContractAddress);
      const balance = await contract.methods.balanceOf(userAddress).call();
      setBalance(web3.utils.fromWei(Number(balance), 'ether'));

      console.log(balance);
    }
  };

  const checkOwnership = async () => { // NFT 보유 확인
    if (userAddress) {
      const contract = new web3.eth.Contract(PLZNFTABI as any, nftContractAddress);
      const balance = await contract.methods.balanceOf(userAddress).call();
      setOwnsNFT(Number(balance) > 0);
    }
  };

  const checkLastRequestedAt = async () => { // 마지막 요청 시간 확인
    if (userAddress) {
      const lastRequestedAtTimestamp = await plzTokenContract.methods.lastRequestedAt(userAddress).call();
      const date = Number(lastRequestedAtTimestamp);
      setLastRequestedAt(date);

      const currentTime = Math.floor(Date.now() / 1000);
      const timeRemaining = 24 * 60 * 60 - (currentTime - date);
      setTimeRemained(timeRemaining);

      if (timeRemaining > 0) {
        setIsTokenReceived(true);
      } else {
        setIsTokenReceived(false);
      }
    }
  };

  const formatRemainingTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // 토큰 수령 요청
  const handleRequestTokens = async () => {
    await requestTokens(userAddress);
    await checkBalance();
    await checkLastRequestedAt();
  };

  const requestTokens = async (account: string) => {
    try {
      const txCount = await web3.eth.getTransactionCount(account);

      const latestBlock = await web3.eth.getBlock('latest');
      const baseFeePerGas = latestBlock.baseFeePerGas ? BigInt(latestBlock.baseFeePerGas) : BigInt(0);
      const maxPriorityFeePerGas = BigInt(web3.utils.toWei('2', 'gwei'));

      const txObject = {
        from: account,
        to: PLZTOKEN,
        data: plzTokenContract.methods.requestTokens().encodeABI(),
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

      console.log('Request Tokens Receipt:', receipt);

      const timestamp = new Date();
      const transactionRecord = {
        hash: receipt.transactionHash,
        method: 'PLZTOKEN.requestTokens',
        time: timestamp.toLocaleString()
      };

      // 로컬 스토리지에 트랜잭션 기록 추가 및 상태 업데이트
      const transactionHistory = await AsyncStorage.getItem('transactionHistory');
      const transactionArray = transactionHistory ? JSON.parse(transactionHistory) : [];
      transactionArray.push(transactionRecord);
      await AsyncStorage.setItem('transactionHistory', JSON.stringify(transactionArray));
      setTransactionHistory(transactionArray.slice(-4)); // 최근 4개의 트랜잭션만 상태 업데이트

    } catch (error) {
      console.error('Error requesting tokens:', error.message);
      console.log(`privatekey: ${route.params.privateKey}`);
      console.log(`account: ${account}`);
    }
  };

  useEffect(() => {
    checkBalance();
    checkOwnership();
    checkLastRequestedAt();

    const interval = setInterval(() => {
      setTimeRemained(prevTime => {
        if (prevTime <= 0) {
          setIsTokenReceived(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // 트랜잭션 기록 가져오기
    const loadTransactionHistory = async () => {
      const history = await AsyncStorage.getItem('transactionHistory');
      if (history) {
        setTransactionHistory(JSON.parse(history).slice(-4)); // 최근 4개의 트랜잭션만 상태 업데이트
      }
    };

    loadTransactionHistory();

    return () => clearInterval(interval);
  }, []);

  // 버튼 onPress 함수들
  const handleOrder = (item?: { beverage: string, englishname: string }) => { // 음료 주문
    if (item) {
      navigation.navigate("Order", { beverage: item.beverage, englishname: item.englishname, privateKey: route.params.privateKey });
    } else {
      navigation.navigate("Order", { beverage: "", englishname: "", privateKey: route.params.privateKey });
    }
    console.log(item?.beverage, item?.englishname);
  };

  const handleHistory = () => { // 트랜잭션 기록 조회
    navigation.navigate("History");
  }

  const handleToken = async () => { // 토큰 수령
    try {
      handleRequestTokens();
      console.log('토큰 요청됨');
    } catch (error) {
      console.error('Error receiving token:', error);
    }
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 4)}...${hash.slice(-4)}`;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{alignItems: 'center'}}>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>NFCOFFEE</Text>
          <View style={styles.tokenBox}>
            <View>
              <Text style={{ fontFamily: 'SeoulNamsan' }}>{ownsNFT ? 'NFT 보유' : 'NFT 없음'}</Text>
              <Text style={{marginTop: '2%', fontSize: 18, fontFamily: 'SeoulNamsanEB'}}>잔여 토큰 | {balance} PLZ</Text>
            </View>
            <Button buttonText={isTokenReceived ? formatRemainingTime(timeRemained) : "오늘의 토큰"}
              style={isTokenReceived ? {width: '40%', height: '100%', backgroundColor: COLOR.gray} : {width: '40%', height: '100%'}} 
              onPress={handleToken}/>
          </View>
          <View style={styles.quickOrder}>
            <View style={styles.quickOrderText}>
              <Text style={styles.mainText}>퀵 오더</Text>
              <View style={styles.alignCenter}>
                {quickOrderItems.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => handleOrder(item)}>
                    <Text style={styles.smallText}>{item.beverage}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <Button buttonText="주문하기"
              style={styles.wideButtons}
              onPress={() => handleOrder()}/>
          </View>
          <View style={styles.transaction}>
            <View style={styles.quickOrderText}>
              <Text style={styles.mainText}>트랜잭션 기록</Text>
              <View style={styles.alignCenter}>
                {transactionHistory.map((item, index) => (
                  <View key={index} style={{ marginBottom: 5 }}>
                    <Text style={styles.smallText}>{truncateHash(item.hash)} {item.method}</Text>
                    <Text style={styles.smallText}>{item.time}</Text>
                  </View>
                ))}
              </View>
            </View>
            <Button buttonText="자세히 보기"
              style={styles.wideButtons}
              onPress={handleHistory}/>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center'
  },
  container: {
    backgroundColor: COLOR.background,
    width: '100%',
    height: '100%',
  },
  text: {
    color: COLOR.brown,
    fontSize: 35,
    fontFamily: 'SeoulNamsanEB',
  },
  innerContainer: {
    width: '85%',
    height: '70%',
    marginTop: '5%',
    justifyContent: 'space-between',
  },
  tokenBox: {
    backgroundColor: "#ffffff",
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 16,
    height: '18%',
    alignItems: 'center',
    marginTop: '5%',
    padding: '4%'
  },
  quickOrder: {
    backgroundColor: "#ffffff",
    height: '60%',
    borderRadius: 16,
    marginTop: '8%',
  },
  transaction: {
    backgroundColor: "#ffffff",
    height: '76%',
    borderRadius: 16,
    marginTop: '8%',
  },
  wideButtons: {
    width: '100%', 
    borderTopLeftRadius: 0, 
    borderTopRightRadius: 0, 
    position: "absolute", 
    bottom: 0,
  },
  quickOrderText: {
    padding: '4%',
  },
  mainText: {
    fontSize: 25, 
    fontFamily: 'SeoulNamsanB'
  },
  smallText: {
    fontSize: 14, 
    fontFamily: 'SeoulNamsanB',
    marginTop: '3%',
    marginLeft: '5%'
  }
})
