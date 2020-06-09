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
const screenWidth = Dimensions.get('window').width;

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Text style={styles.profileText}>
              <Text style={{fontWeight: 'bold'}}>Hello</Text>, {UserInfo.firstName}
            </Text>

            <View style={styles.content}>

              <TouchableOpacity
                onPress={()=>{navigation.navigate('Intro');}}
                style={styles.iconContainer}>
                <Image source={icon1} style={styles.iconImage} />
                <Text> Add Device </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{navigation.navigate('DeviceList');}} style={styles.iconContainer}>
                <Image source={icon2} style={styles.iconImage} />
                <Text> Devices </Text>
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
  profileText: {
    color: "white",
    fontSize: 28,
  },
  content: {
    width: "90%",
    marginTop: screenHeight * .08,
    flexDirection: "row",
    justifyContent: "center",
  },
  iconImage: {
    width: 50,
    height: 50,
    marginVertical: 7
  },
  iconContainer: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    marginHorizontal: screenWidth * .03,
    alignItems: "center",
    backgroundColor: "rgba(229, 229, 229, 0.3)",
    height: 100,
    width:90,
    borderRadius: 15
  },
  scrollView: {
    width: "100%",
    alignItems: "center",
    paddingVertical: screenHeight * .2
  }
});
