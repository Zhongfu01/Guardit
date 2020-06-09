import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const backgroundImage = require("../../image/background/fade.jpg");
const rightArrowImage = require("../../image/icon/next.png");

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function Intro({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.title}>
              Connect your Guardit Beetle
            </Text>
          </View>

          <View>
            <Text style={styles.content}>
              To link your Guardit Beetle to your account,
              please make sure the Beetle has a mobile sim card attached to it.
            </Text>
          </View>

          <View style={styles.nextButtonContainer}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Link');}} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>
                Got it  <Image style={styles.nextButtonImage} source={rightArrowImage}/>
              </Text>
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
    flexDirection: "column"
  },
  backgroundImage: {
    paddingVertical: 5,
    paddingHorizontal: 60,
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    fontSize: 45,
    color: "white",
    paddingVertical: screenHeight * .05,
  },
  content: {
    fontSize: 20,
    color: "white",
  },
  nextButtonContainer: {
    marginTop: screenHeight * .3
  },
  nextButton: {
    alignItems: "center",
    justifyContent: "center"
  },
  nextButtonText: {
    fontSize: 20
  },
  nextButtonImage: {
    width: 15,
    height: 15,
  },
  scrollView: {
    alignItems: "center",
  }
});
