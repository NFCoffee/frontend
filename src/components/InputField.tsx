import { COLOR } from '../utils/color';
import React from 'react';
import { View, TextInput, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface InputFieldProps {
  placeholder?: string;
  defaultValue?: string;
  style?: StyleProp<ViewStyle>;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const { placeholder, defaultValue, style } = props;
  
  return (
    <View style={[styles.textInputWrapper, style]}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputWrapper: {
    backgroundColor: COLOR.background, // Assuming COLOR.blue is defined elsewhere
    width: '100%',
    height: '10.5%',
    borderRadius: 8,
    borderEndEndRadius: 0,
    borderEndStartRadius: 0,
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontFamily: 'SeoulNamsanB',
    fontSize: 18,
    textAlign: 'center',
    color: '#1F0318',
    width: '90%', // Adjust this value according to your preference
    height: '90%', // Adjust this value according to your preference
  },
});

export default InputField;
