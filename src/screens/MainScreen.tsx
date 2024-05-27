import React, { useEffect, useState } from "react";
import { COLOR } from "../utils/color";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import Web3 from "web3";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Main: undefined;
  Order: { beverage?: string };
  History: undefined;
};

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface MainScreenProps {
  navigation: MainScreenNavigationProp;
}

const quickOrderItems = [
  "브루드커피",
  "카페 라떼",
  "할리데이 모카",
  "허니유자"
];

const transactionItems = [ // 실제 트랜잭션을 불러와 가공 작업 필요
  "트랜잭션 최근순 첫번째",
  "트랜잭션 최근순 두번째",
  "트랜잭션 최근순 세번째",
  "트랜잭션 최근순 네번째"
];

// // Web3 인스턴스 생성
// const web3 = new Web3('http://192.168.55.177:8545');

// // 트랜잭션 해시
// const transactionHash = '0x5431dac35e22d67773bb398b8e0d374c203ff4c7bbc8d3cad95499a849682cc7'; // 실제 트랜잭션 해시로 변경

// // 트랜잭션 조회 함수
// const getTransaction = async (txHash) => {
//     try {
//         const transaction = await web3.eth.getTransaction(txHash);
//         if (transaction) {
//             console.log('Transaction Details:', transaction);
//         } else {
//             console.log('Transaction not found');
//         }
//     } catch (error) {
//         console.error(`Error retrieving transaction: ${error.message}`);
//     }
// };

export default function MainScreen({ navigation }: MainScreenProps) {
  const [token, setToken] = useState(0);
  const [isTokenReceived, setIsTokenReceived] = useState(false);
  const userName = "이지인"; // 유저 정보 조회로 이름 가져오기..?
  const userId = "user123"; // 실제 유저 ID로 변경 필요

  useEffect(() => {
    // 토큰 수령 상태 초기화
    const checkTokenReceived = async () => {
      try {
        const lastReceivedDate = await AsyncStorage.getItem(`lastReceivedDate_${userId}`);
        const currentDate = new Date().toDateString();

        if (lastReceivedDate !== currentDate) {
          setIsTokenReceived(false);
        } else {
          setIsTokenReceived(true);
        }
      } catch (error) {
        console.error("Error retrieving last received date:", error);
      }
    };

    checkTokenReceived();
  }, []);

  const handleOrder = (beverage?: string) => {
    navigation.navigate("Order", { beverage });
  }

  const handleHistory = () => {
    navigation.navigate("History");
    // 트랜잭션 조회 실행
    // getTransaction(transactionHash);
  }

  const handleToken = async () => {
    try {
    //   // 스마트 컨트랙트 호출
    //   const accounts = await web3.eth.getAccounts();
    //   const receipt = await contract.methods.receiveToken().send({ from: accounts[0] });
      
    //   console.log('Token received:', receipt);

    //   // 토큰 개수 업데이트 (스마트 컨트랙트에서 받아오기)
    //   const newTokenCount = await contract.methods.getTokenBalance(accounts[0]).call();
    //   setToken(newTokenCount);

      // 토큰 수령 상태 업데이트
      setIsTokenReceived(true);
      await AsyncStorage.setItem(`lastReceivedDate_${userId}`, new Date().toDateString());
    } catch (error) {
      console.error('Error receiving token:', error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{alignItems: 'center'}}>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>NFCOFFEE</Text>
          <View style={styles.tokenBox}>
            <View>
              <Text style={{ fontFamily: 'SeoulNamsan' }}>{userName}님</Text>
              <Text style={{marginTop: '2%', fontSize: 18, fontFamily: 'SeoulNamsanEB'}}>잔여 토큰 | {token} PLZ</Text>
            </View>
            <Button buttonText={"오늘의 토큰"} 
              style={isTokenReceived ? {width: '40%', height: '100%', backgroundColor: COLOR.gray} : {width: '40%', height: '100%'}} 
              onPress={handleToken}/>
          </View>
          <View style={styles.quickOrder}>
            <View style={styles.quickOrderText}>
              <Text style={styles.mainText}>퀵 오더</Text>
              <View style={styles.alignCenter}>
                {quickOrderItems.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => handleOrder(item)}>
                    <Text style={styles.smallText}>{item}</Text>
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
                {transactionItems.map((item, index) => (
                  <Text key={index} style={styles.smallText}>{item}</Text>
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
