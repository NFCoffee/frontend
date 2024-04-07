import React from "react";
import Button from "./src/components/Button";
import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Button buttonText="로그인"/>
        <Button buttonText="회원가입"/>
      </View>
    </> 
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});
