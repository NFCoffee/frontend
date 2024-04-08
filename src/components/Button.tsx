import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLOR } from '../utils/color';

interface ButtonProps {
    buttonText: string;
    style?: object; // Add style prop to ButtonProps
}

const Button: React.FC<ButtonProps> = ({ buttonText, style }) => {
    return (
        <TouchableOpacity style={[styles.touchop, style]}>
            <Text style={styles.text}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchop: {
        backgroundColor: COLOR.blue,
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        margin: 10,
    },
    text: {
        fontFamily: 'SeoulNamsanB',
        fontSize: 22,
        color: 'white',
    },
});

export default Button;
