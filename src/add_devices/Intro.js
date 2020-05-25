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
const rightArrowImage = require("../../image/icon/next.png");


export default function Cover({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
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

        <TouchableOpacity onPress={()=>{navigation.navigate('Link');}} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>
            Got it  <Image style={styles.nextButtonImage} source={rightArrowImage}/>
          </Text>
        </TouchableOpacity>

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
    paddingVertical: 70,
  },
  content: {
    fontSize: 20,
    color: "white",
    width: 300,
  },
  nextButton: {
    alignItems: "center",
    marginTop: 320,
    justifyContent: "center"
  },
  nextButtonText: {
    fontSize: 20
  },
  nextButtonImage: {
    width: 15,
    height: 15,
  }
});
