import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";

const backgroundImage = require("../../image/background/fade.jpg");
const profileImage = require("../../image/testFolder/surfBoard.png");
const icon1 = require("../../image/icon/more.png");
const icon2 = require("../../image/icon/laptop.png");
const icon3 = require("../../image/icon/user.png");

export default function Cover({ navigation }) {

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <Image
          style={styles.profileImage}
          source={profileImage}
        />

        <Text style={styles.profileText}>
          Zhongfu
        </Text>

        <View style={styles.content}>

          <TouchableOpacity
            onPress={()=>{navigation.navigate('Intro');}}
            style={styles.iconContainer}>
            <Image source={icon1} style={styles.iconImage} />
            <Text> Add Device </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{navigation.navigate('List');}} style={styles.iconContainer}>
            <Image source={icon2} style={styles.iconImage} />
            <Text> Devices </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{alert("!");}} style={styles.iconContainer}>
            <Image source={icon3} style={styles.iconImage} />
            <Text> Profile </Text>
          </TouchableOpacity>


        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  backgroundImage: {
    paddingVertical: 70,
    flex: 1,
    resizeMode: "cover",
    alignItems: "center"
  },
  profileImage: {
    margin: 25,
    width: 250,
    height: 250,
    borderRadius: 125,
    flex: 2
  },
  profileText: {
    color: "white",
    fontSize: 28,
    flex: 1
  },
  content: {
    width: "90%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flex: 3
  },
  iconImage: {
    width: 50,
    height: 50,
    marginVertical: 7
  },
  iconContainer: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: "center",
    backgroundColor: "rgba(229, 229, 229, 0.3)",
    height: 100,
    width:90,
    borderRadius: 15
  }
});
