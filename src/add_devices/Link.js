import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";

const backgroundImage = require("../../image/background/fade.jpg");
const rightArrowImage = require("../../image/icon/next.png");


export default function Cover({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View>
          <Text style={styles.title}>
            Type in the Beetle ID on the device
          </Text>
        </View>

          <View style={styles.content}>
            <View style={styles.inputBox}>
              <Text style={styles.text}>Email / Account #</Text>
              <View style={styles.textInputWrapper}>
                <TextInput style={styles.textInput} autoCorrect={false} autoCapitalize={'none'}/>
              </View>
            </View>
          </View>

        <TouchableOpacity onPress={()=>{alert("Done");}} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>
            Done
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
  },
  textInputWrapper: {
    borderBottomColor: '#91bdc4',
    borderBottomWidth: 1,
    width: 250,
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  textInput: {
      fontSize: 20,
      alignSelf: 'auto',
      marginVertical: 10,
      color: 'white',

  }
});
