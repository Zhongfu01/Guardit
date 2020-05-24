import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const image = require("../../image/background/fade.jpg");

export default function Login() {
  setTimeout(function(){}, 2000);
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.text}>Login</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 45,
    fontWeight: "bold"
  }
});
