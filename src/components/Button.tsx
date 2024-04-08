// Button.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { COLOR } from '../utils/color';

interface ButtonProps {
  buttonText: string;
  style?: ViewStyle;
  onPress?: () => void; // Add onPress prop
}

const Button: React.FC<ButtonProps> = ({ buttonText, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.touchop, style]} onPress={onPress}>
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchop: {
    backgroundColor: COLOR.blue,
    width: '100%',
    height: '6.5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    fontFamily: 'SeoulNamsanB',
    fontSize: 22,
    color: 'white',
  },
});

export default Button;
