import React from "react";
import { StyleSheet, View } from "react-native";
import BasicScreen from "../components/BasicScreen";
import Button from "../components/Button";

export default function LoginScreen() {
  return (
    <BasicScreen>
      <View style={styles.content}>
        <Button buttonText="로그인" style={styles.button} />
      </View>
    </BasicScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: '70%'
  },
  button: {
    // width: '100%',
  },
});
