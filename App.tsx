import React from "react";
import LoginScreen from "./src/screens/LoginScreen";
import TabNavigation from './src/navigation/TapNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MembershipScreen from "./src/screens/MembershipScreen";
import CertificationNumScreen from "./src/screens/CertificationNumScreen";
import PrivateKeyScreen from "./src/screens/PrivateKeyScreen";
import NFTScreen from "./src/screens/NFTScreen";
import LostKeyScreen from "./src/screens/LostKeyScreen";
import TransactionScreen from "./src/screens/TransactionScreen";
import OrderScreen from "./src/screens/OrderScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import PaymentSuccessScreen from "./src/screens/PaymentSuccess";
import { PrivateKeyProvider } from './src/context/PrivateKeyContext';
import PinNumScreen from './src/screens/PinNumScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return ( 
    <>
    {/* <PrivateKeyProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={MembershipScreen} />
          <Stack.Screen name="Certification" component={CertificationNumScreen} />
          <Stack.Screen name="Privatekey" component={PrivateKeyScreen} />
          <Stack.Screen name="NFT" component={NFTScreen} />
          <Stack.Screen name="Lostkey" component={LostKeyScreen} />
          <Stack.Screen name="History" component={TransactionScreen} />
          <Stack.Screen name="Order" component={OrderScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
          <Stack.Screen name="Tab" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </PrivateKeyProvider> */}
      <PinNumScreen/>
    </>
  )
}