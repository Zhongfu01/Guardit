import React, {useState} from "react";
import {
        ImageBackground,
        StyleSheet,
        Text,
        View,
        TextInput,
        TouchableOpacity,
        ScrollView,
        Alert,
        Dimensions
} from "react-native";

import {post_request} from '../request/Requests';
import {LocalSignUpUrl} from '../../url/Guardit';
import {UserInfo} from '../global';

const image = require("../../image/background/fade.jpg");
const screenHeight = Dimensions.get('window').height;


export default function Signup({ navigation }) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [passwords, setPasswords] = useState('')

  function sign_up() {

    post_request(
      LocalSignUpUrl,
      {
        firstName: firstName,
        lastName: lastName,
        username: username,
        passwords: passwords
      }
    )
    .then(jsonResponse => {
      // success
      UserInfo.firstName = jsonResponse['firstName']
      UserInfo.lastName = jsonResponse['lastName']
      UserInfo.userId = jsonResponse['userId']
      UserInfo.username = username;
      UserInfo.passwords = passwords;
      Alert.alert(
        //title
        'Hello',
        //body
        'Thank you for registering Guard It account!',
        [
          // {text: 'Yes', onPress: () => console.log('Yes Pressed')},
          // {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        ],
        { cancelable: true }
        //clicking out side of alert will cancel
      );
      navigation.navigate('Profile')
    })
    .catch(errorMessage => {
      Alert.alert(
        //title
        'Register error',
        //body
        "Sorry, the entered username already registered, please try something else.",
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
            <Text style={styles.title}>Create Account</Text>
          </View>

          <View style={styles.contentBox}>

          <View style={styles.inputBox}>
            <Text style={styles.text}>First Name</Text>
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                autoCorrect={false}
                onChangeText={text => setFirstName(text)}
              />
            </View>
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.text}>Last Name</Text>
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                autoCorrect={false}
                onChangeText={text => setLastName(text)}
              />
            </View>
          </View>

            <View style={styles.inputBox}>
              <Text style={styles.text}>Username</Text>
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
                  blurOnSubmit={false}
                  autoCorrect={false}
                  onChangeText={text => setPasswords(text)}
                />
              </View>
            </View>


            <TouchableOpacity
              style={styles.highlightWrapper}
              onPress={() => {sign_up()}}>
              <Text style={styles.signinText}>Sign up</Text>
            </TouchableOpacity>
          </View>


        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#33548a"
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
