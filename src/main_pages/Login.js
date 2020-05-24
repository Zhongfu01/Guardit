import React from "react";
import {
        ImageBackground,
        StyleSheet,
        Text,
        View,
        TextInput,
        TouchableHighlight
} from "react-native";

const image = require("../../image/background/fade.jpg");

export default function Login({ navigation }) {
  setTimeout(function(){}, 2000);
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Welcome Back</Text>
        </View>

        <View style={styles.contentBox}>
          <View style={styles.inputBox}>
            <Text style={styles.text}>Email / Account #</Text>
            <View style={styles.textInputWrapper}>
              <TextInput style={styles.textInput} autoCorrect={false} autoCapitalize={'none'}/>
            </View>
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.text}>Passwords</Text>
            <View style={styles.textInputWrapper}>
              <TextInput style={styles.textInput} secureTextEntry={true} autoCorrect={false}/>
            </View>
          </View>

          <TouchableHighlight style={styles.highlightWrapper} onPress={function(){
            navigation.navigate('Profile')
          }}>
            <Text style={styles.signinText}>Sign in</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.footnoteBox}>
          <Text style={styles.footnodeText}>
            Don't have an account?
          </Text>
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
  titleBox: {
    flex: 1.2,
    justifyContent: "flex-end",
    alignItems: "center",

    // borderWidth: 4,
    // borderColor: "#20232a",
    // borderRadius: 6,
  },
  contentBox: {
    alignItems: "flex-start",
    paddingHorizontal: 58,
    paddingVertical: 70,
    flex: 3,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 45,
    fontWeight: "bold"
  },
  text: {
    color: "white",
    fontSize: 25
  },
  inputBox: {
    paddingVertical: 15
  },
  textInputWrapper: {
    borderBottomColor: '#91bdc4',
    borderBottomWidth: 1,
    width: 250,
    marginVertical: 10,
  },
  textInput: {
      fontSize: 20,
      alignSelf: 'auto',
      marginVertical: 10,
      color: 'white',

  },
  signinText: {
    marginTop: 30,
    fontSize: 30,
    color: "white"
  },
  highlightWrapper: {
    width: 150
  },
  footnoteBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footnodeText: {
    fontSize: 20,
    color: "#8bafb5"
  }
});
