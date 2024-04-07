import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
    buttonText: string;
}

const Button: React.FC<ButtonProps> = ({ buttonText }) => {
    return (
        <TouchableOpacity style={styles.touchop}>
            <Text style={styles.text}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchop: {
        backgroundColor: '#183059',
        width: '80%',
        height: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        margin: 10
    },
    text: {
        fontFamily: 'SeoulNamsanB',
        fontSize: 22,
        color: 'white'
    }
});

export default Button;
