import React from "react";
import { COLOR } from "../utils/color";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Main: undefined;
  Order: { beverage?: string };
  History: undefined;
};

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface MainScreenProps {
  navigation: MainScreenNavigationProp;
}

const token: number = 0;

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

export default function MainScreen({ navigation }: MainScreenProps) {
    const handleOrder = (beverage?: string) => {
        navigation.navigate("Order", { beverage });
    }

    const handleHistory = () => {
        navigation.navigate("History");
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={{alignItems: 'center'}}>
                <View style={styles.innerContainer}>
                    <Text style={styles.text}>NFCOFFEE</Text>
                    <View style={styles.tokenBox}>
                        <View>
                            <Text style={{ fontFamily: 'SeoulNamsan' }}>이지인님</Text>
                            <Text style={{marginTop: '2%', fontSize: 18, fontFamily: 'SeoulNamsanEB'}}>잔여 토큰 | {token} PLZ</Text>
                        </View>
                        <Button buttonText={"오늘의 토큰"} 
                        style={{width: '40%', height: '100%'}} 
                        onPress={()=>{}}/>
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