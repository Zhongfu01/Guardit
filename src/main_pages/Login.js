import React, {useState} from "react";
import {
        ImageBackground,
        StyleSheet,
        Text,
        View,
        TextInput,
        TouchableOpacity,
        ScrollView,
        Dimensions,
        Alert
} from "react-native";

import {get_request} from '../request/Requests';
import {LocalSignInUrl} from '../../url/Guardit';
import {UserInfo} from '../global';

const image = require("../../image/background/fade.jpg");
const screenHeight = Dimensions.get('window').height;


export default function Login({ navigation }) {

  const [username, setUsername] = useState('');
  const [passwords, setPasswords] = useState('')

  function sign_in() {

    get_request(LocalSignInUrl, {username: username, passwords: passwords})
    .then(jsonResponse => {
      // success
      UserInfo.firstName = jsonResponse['firstName']
      UserInfo.lastName = jsonResponse['lastName']
      UserInfo.userId = jsonResponse['userId']
      UserInfo.username = username;
      UserInfo.passwords = passwords;
      navigation.navigate('Profile');
    })
    .catch(errorMessage => {
      Alert.alert(
        //title
        'Login Error',
        //body
        "Wrong password or username, please try again.",
        [
          // {text: 'Yes', onPress: () => console.log('Yes Pressed')},
          // {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        ],
        { cancelable: true }
        //clicking out side of alert will cancel
      );
    })


  }
  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Welcome Back</Text>
          </View>

          <View style={styles.contentBox}>

            <View style={styles.inputBox}>
              <Text style={styles.text}>Email / Account #</Text>
              <View style={styles.textInputWrapper}>
                <TextInput
                  style={styles.textInput}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  onChangeText={text => setUsername(text)}
                />
              </View>
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.text}>Passwords</Text>
              <View style={styles.textInputWrapper}>
                <TextInput
                  style={styles.textInput}
                  secureTextEntry={true}
                  autoCorrect={false}
                  blurOnSubmit={false}
                  onChangeText={text => setPasswords(text)}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.highlightWrapper}
              onPress={() => {sign_in()}}>
              <Text style={styles.signinText}>Sign in</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.footnoteBox}
            onPress={() => {navigation.navigate('Signup')}}>
            <Text style={styles.footnodeText}>
              Don't have an account?
            </Text>
          </TouchableOpacity>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#449dd1"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  titleBox: {
    marginTop: screenHeight * .12,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  contentBox: {
    alignItems: "flex-start",
    paddingHorizontal: 58,
    paddingVertical: 70,
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
    justifyContent: "center",
    alignItems: "center",
  },
  footnodeText: {
    fontSize: 20,
    color: "#8bafb5"
  },
  scrollView: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 10
  }
});
