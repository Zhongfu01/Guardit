import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView
} from "react-native";

import {UserInfo} from '../global';

const backgroundImage = require("../../image/background/fade.jpg");
const profileImage = require("../../image/testFolder/surfBoard.png");
const icon1 = require("../../image/icon/more.png");
const icon2 = require("../../image/icon/laptop.png");
const icon3 = require("../../image/icon/user.png");

const screenHeight = Dimensions.get('window').height;


export default function Cover({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.profileImageContainer}>
              <Image
                style={styles.profileImage}
                source={profileImage}
              />
            </View>

            <Text style={styles.profileText}>
              {UserInfo.firstName}
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
          </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  backgroundImage: {
    paddingVertical: 70,
    flex: 1,
    resizeMode: "cover",
  },
  profileImageContainer: {
    margin: 25,
  },
  profileImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  profileText: {
    color: "white",
    fontSize: 28,
  },
  content: {
    width: "90%",
    marginTop: screenHeight * .1,
    flexDirection: "row",
    justifyContent: "space-evenly",
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
  },
  scrollView: {
    width: "100%",
    alignItems: "center"
  }
});
