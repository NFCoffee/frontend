import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { COLOR } from "../utils/color";

interface BasicScreenProps {
  children?: React.ReactNode;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BasicScreen: React.FC<BasicScreenProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.box} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    backgroundColor: COLOR.background,
    width: '100%',
    height: '150%',
    position: "absolute",
  },
  box: {
    position: "absolute",
    top: '40%',
    backgroundColor: "#ffffff",
    width: '85%',
    height: '45%',
    borderRadius: 8,
  },
});

export default BasicScreen;
