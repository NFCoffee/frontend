import React from "react";
import PrivateKeyScreen from "./src/screens/PrivateKeyScreen";
import NFTScreen from "./src/screens/NFTScreen";
import MainScreen from "./src/screens/MainScreen";
import TransactionScreen from "./src/screens/TransactionScreen";
import SettingScreen from "./src/screens/SettingScreen";
import OrderScreen from "./src/screens/OrderScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MembershipScreen from "./src/screens/MembershipScreen";
import CertificationNumScreen from "./src/screens/CertificationNumScreen";
import LostKeyScreen from "./src/screens/LostKeyScreen";

export default function App() {
  return (
    <>
      {/* <PrivateKeyScreen/> */}
      {/* <NFTScreen/> */}
      {/* <MainScreen/> */}
      {/* <TransactionScreen/> */}
      {/* <SettingScreen/> */}
      <MembershipScreen/>
      {/* <CertificationNumScreen/> */}
      {/* <LostKeyScreen/> */}
    </>
  )
}