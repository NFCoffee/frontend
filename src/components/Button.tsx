// Button.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, Dimensions } from 'react-native';
import { COLOR } from '../utils/color';

interface ButtonProps extends TouchableOpacityProps {
  buttonText: string;
}

const Button: React.FC<ButtonProps> = ({ buttonText, style, ...props }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <TouchableOpacity
      style={[
        styles.touchop,
        {
          width: windowWidth * 0.75, // 75% of window width
          height: windowHeight * 0.065, // 6.5% of window height
        },
        style,
      ]}
      {...props} // Spread props to TouchableOpacity
    >
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
    fontSize: 20,
    color: 'white',
  },
});

export default Button;
