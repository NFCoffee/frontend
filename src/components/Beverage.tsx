import React from "react";
import { COLOR } from "../utils/color";
import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

interface BeverageProps {
    name: string;
    englishName: string;
    image: ImageSourcePropType; // Assuming image is an ImageSourcePropType
}
  
const Beverage: React.FC<BeverageProps> = ({ name, englishName, image }) => {
    return (
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <View>
          <Text style={[styles.text, { fontSize: 22, color: COLOR.dark }]}>{name}</Text>
          <Text style={[styles.text, { fontSize: 16, color: COLOR.brown }]}>{englishName}</Text>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        alignItems: "center",
        width: '90%',
        marginTop: '5%'
    },
    image: {
        width: 65, 
        height: 65, 
        borderRadius: 100
    },
    text: {
        fontFamily: "SeoulNamsanB", 
        marginLeft: '10%'
    }
})

export default Beverage;