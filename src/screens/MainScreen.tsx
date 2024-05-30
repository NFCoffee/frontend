import React, { useEffect, useState } from "react";
import { COLOR } from "../utils/color";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import Web3, { AbiItem } from "web3";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { quickOrderItems } from "../const/quickOrderItems";
import { transactionItems } from "../const/transactionItems";
import SmartContractService from "../utils/SmartContractService";
import { RouteProp } from '@react-navigation/native';
import { NETWORK, PLZTOKEN, PLZNFT } from "../const/url";
import PLZTokenABI from '../utils/PLZToken_ABI.json';
import PLZNFTABI from '../utils/PLZNFT_ABI.json';

type RootStackParamList = {
  Main: {privateKey: string};
  Order: { beverage?: string };
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
  const [balance, setBalance] = useState('');
  const userId = "user123"; // 실제 유저 ID로 변경 필요
  const tokenContractAddress = PLZTOKEN; // 토큰 컨트랙트 주소
  const nftContractAddress = PLZNFT; // NFT 컨트랙트 주소
  const [ownsNFT, setOwnsNFT] = useState<boolean | null>(null);
  const userAccount = web3.eth.accounts.privateKeyToAccount(route.params.privateKey);
  const userAddress = userAccount.address;
  web3.eth.accounts.wallet.add(userAccount);
  const plzTokenContract = new web3.eth.Contract(
    PLZTokenABI as any,
    PLZTOKEN,
  );

//   const checkBalance = async () => { // 토큰 개수 확인
//     if (userAddress) {
//       const contract = new web3.eth.Contract(PLZTokenABI as any, tokenContractAddress);
//       const balance = await contract.methods.balanceOf(userAddress).call();
//       setBalance(web3.utils.fromWei(Number(balance), 'ether'));

//       console.log(balance);
//     }
//   };

//   const checkOwnership = async () => { // NFT 보유 확인
//     if (userAddress) {
//       const contract = new web3.eth.Contract(PLZNFTABI as any, nftContractAddress);
//       const balance = await contract.methods.balanceOf(userAddress).call();
//       setOwnsNFT(Number(balance) > 0);
//     }
//   };

//   // 토큰 수령 확인
//   // const checkTokenReceived = async () => {
//   //   try {
//   //     const lastReceivedDate = await AsyncStorage.getItem(`lastReceivedDate_${userId}`);
//   //     const currentDate = new Date().toDateString();

//   //     if (lastReceivedDate !== currentDate) {
//   //       setIsTokenReceived(false);
//   //     } else {
//   //       setIsTokenReceived(true);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error retrieving last received date:", error);
//   //   }
//   // };

//   // 토큰 수령 요청
//   const handleRequestTokens = async () => {
//     await requestTokens(userAddress);
//     await checkBalance();
//   };

//   // const requestTokens =  async (account: string) => {
//   //   try {
//   //     const txObject = {
//   //       from: account,
//   //       to: PLZTOKEN,
//   //       data: plzTokenContract.methods.requestTokens().encodeABI(),
//   //     };

//   //     const signedTx = await web3.eth.accounts.signTransaction(txObject, route.params.privateKey);
      
//   //     const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//   //     console.log('Request Tokens Receipt:', receipt);
//   //   } catch (error) {
//   //     console.error('Error requesting tokens:', error);
//   //   }
//   // };
//   const requestTokens = async (account: string) => {
//     try {
//       // const txCount = await web3.eth.getTransactionCount(account);
//       // const txObject = {
//       //   from: account,
//       //   to: PLZTOKEN,
//       //   data: plzTokenContract.methods.requestTokens().encodeABI(),
//       //   // gas: web3.utils.toHex(200000), // 적절한 가스 리밋 설정
//       //   gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')), // 적절한 가스 가격 설정
//       //   nonce: web3.utils.toHex(txCount)
//       // };
  
//       // const gasLimit = await web3.eth.estimateGas(txObject);
//       // console.log(gasLimit);
//       // // const signedTx = await web3.eth.accounts.signTransaction(txObject, route.params.privateKey);
//       // const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

//       // console.log('Request Tokens Receipt:', receipt);
//       await plzTokenContract.methods.requestTokens().send({from: account});
//     } catch (error) {
//       console.error('Error requesting tokens:', error.message);
//       console.log(route.params.privateKey);
//       console.log(`account: ${account}`);
//     }
//   };

//   useEffect(() => {
//     // checkTokenReceived();
//     checkBalance();
//     checkOwnership();
//   }, []);


//   // 버튼 onPress 함수들
//   const handleOrder = (beverage?: string) => {
//     navigation.navigate("Order", { beverage });
//   }

//   const handleHistory = () => {
//     navigation.navigate("History");
//     // 트랜잭션 조회 실행
//     // getTransaction(transactionHash);
//   }

//   const handleToken = async () => {
//     try {
//       // 토큰 수령 상태 업데이트
//       // setIsTokenReceived(true);
//       // await AsyncStorage.setItem(`lastReceivedDate_${userId}`, new Date().toDateString());
//       handleRequestTokens();
//       console.log('토큰 요청됨');
//     } catch (error) {
//       console.error('Error receiving token:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <SafeAreaView style={{alignItems: 'center'}}>
//         <View style={styles.innerContainer}>
//           <Text style={styles.text}>NFCOFFEE</Text>
//           <View style={styles.tokenBox}>
//             <View>
//               <Text style={{ fontFamily: 'SeoulNamsan' }}>{ownsNFT ? 'NFT 보유' : 'NFT 없음'}</Text>
//               <Text style={{marginTop: '2%', fontSize: 18, fontFamily: 'SeoulNamsanEB'}}>잔여 토큰 | {balance} PLZ</Text>
//             </View>
//             <Button buttonText={"오늘의 토큰"} 
//               // style={isTokenReceived ? {width: '40%', height: '100%', backgroundColor: COLOR.gray} : {width: '40%', height: '100%'}} 
//               style={{width: '40%', height: '100%'}}
//               onPress={handleToken}/>
//           </View>
//           <View style={styles.quickOrder}>
//             <View style={styles.quickOrderText}>
//               <Text style={styles.mainText}>퀵 오더</Text>
//               <View style={styles.alignCenter}>
//                 {quickOrderItems.map((item, index) => (
//                   <TouchableOpacity key={index} onPress={() => handleOrder(item)}>
//                     <Text style={styles.smallText}>{item}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>
//             <Button buttonText="주문하기"
//               style={styles.wideButtons}
//               onPress={() => handleOrder()}/>
//           </View>
//           <View style={styles.transaction}>
//             <View style={styles.quickOrderText}>
//               <Text style={styles.mainText}>트랜잭션 기록</Text>
//               <View style={styles.alignCenter}>
//                 {transactionItems.map((item, index) => (
//                   <Text key={index} style={styles.smallText}>{item}</Text>
//                 ))}
//               </View>
//             </View>
//             <Button buttonText="자세히 보기"
//               style={styles.wideButtons}
//               onPress={handleHistory}/>
//           </View>
//         </View>
//       </SafeAreaView>
//     </View>
//   )
// }
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

// 토큰 수령 요청
const handleRequestTokens = async () => {
  await requestTokens(userAddress);
  await checkBalance();
};

const requestTokens = async (account: string) => {
  try {
    const txCount = await web3.eth.getTransactionCount(account);

    // 현재 네트워크의 기본 가스 비용과 우선 가스 비용을 가져옵니다.
    const latestBlock = await web3.eth.getBlock('latest');
    const baseFeePerGas = latestBlock.baseFeePerGas ? BigInt(latestBlock.baseFeePerGas) : BigInt(0);
    const maxPriorityFeePerGas = BigInt(web3.utils.toWei('2', 'gwei')); // 팁으로 사용할 가스 비용 설정

    const txObject = {
      from: account,
      to: PLZTOKEN,
      data: plzTokenContract.methods.requestTokens().encodeABI(),
      gasLimit: web3.utils.toHex(210000), // 적절한 가스 한도 설정
      maxFeePerGas: web3.utils.toHex(baseFeePerGas + maxPriorityFeePerGas),
      maxPriorityFeePerGas: web3.utils.toHex(maxPriorityFeePerGas),
      nonce: web3.utils.toHex(txCount),
      type: '0x2' // EIP-1559 유형의 트랜잭션으로 설정
    };

    // 가스 리밋 설정
    const gasLimit = await web3.eth.estimateGas(txObject);
    txObject.gasLimit = web3.utils.toHex(gasLimit);

    const signedTx = await web3.eth.accounts.signTransaction(txObject, route.params.privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log('Request Tokens Receipt:', receipt);
  } catch (error) {
    console.error('Error requesting tokens:', error.message);
    console.log(`privatekey: ${route.params.privateKey}`);
    console.log(`account: ${account}`);
    web3.eth.getAccounts().then(accounts => {
      console.log(`계정 목록: ${accounts}`);
    });
  }
};


useEffect(() => {
  // checkTokenReceived();
  checkBalance();
  checkOwnership();
}, []);


// 버튼 onPress 함수들
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
    // 토큰 수령 상태 업데이트
    // setIsTokenReceived(true);
    // await AsyncStorage.setItem(`lastReceivedDate_${userId}`, new Date().toDateString());
    handleRequestTokens();
    console.log('토큰 요청됨');
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
            <Text style={{ fontFamily: 'SeoulNamsan' }}>{ownsNFT ? 'NFT 보유' : 'NFT 없음'}</Text>
            <Text style={{marginTop: '2%', fontSize: 18, fontFamily: 'SeoulNamsanEB'}}>잔여 토큰 | {balance} PLZ</Text>
          </View>
          <Button buttonText={"오늘의 토큰"} 
            // style={isTokenReceived ? {width: '40%', height: '100%', backgroundColor: COLOR.gray} : {width: '40%', height: '100%'}} 
            style={{width: '40%', height: '100%'}}
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
