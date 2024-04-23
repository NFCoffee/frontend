// KeyInput.tsx
import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { COLOR } from '../utils/color';

interface KeyInputProps extends TextInputProps {
  placeholder?: string;
}

const KeyInput: React.FC<KeyInputProps> = ({ placeholder, ...rest }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      textAlign="center"
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: '11.5%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'SeoulNamsanB',
    backgroundColor: COLOR.background,
    borderColor: COLOR.dark,
    borderBottomWidth: 1,
    fontSize: 15,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export default KeyInput;
