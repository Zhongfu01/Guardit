import React, {useState} from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Alert
} from "react-native";

import {post_request} from '../request/Requests';
import {LocalRegisterDeviceUrl} from '../../url/Guardit';
import {UserInfo} from '../global';

const backgroundImage = require("../../image/background/fade.jpg");
const rightArrowImage = require("../../image/icon/next.png");
const screenHeight = Dimensions.get('window').height;


export default function Link({ navigation }) {
  const [serialNumber, setSerialNumber] = useState('');

  function register_device() {
    if (serialNumber == '') {
      Alert.alert(
        'Failed',
        "The device serial number cannot be blank!",
        [
          // {text: 'Yes', onPress: () => console.log('Yes Pressed')},
          // {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        ],
        { cancelable: true }
      );
      return;
    }
    post_request(
      LocalRegisterDeviceUrl,
      {
        serialNumber: serialNumber,
        userId: UserInfo.userId
      }
    )
    .then(jsonResponse => {
      // success
      Alert.alert(
        'Success',
        "The device has been registered successfully",
        [
          // {text: 'Yes', onPress: () => console.log('Yes Pressed')},
          // {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        ],
        { cancelable: true }
      );
      UserInfo.devices[jsonResponse['serialNumber']] = jsonResponse;
      navigation.navigate('Profile');
    })
    .catch(errorMsg => {
      Alert.alert(
        'Failed',
        "Wrong serial number or the device has already been registered.",
        [
          // {text: 'Yes', onPress: () => console.log('Yes Pressed')},
          // {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        ],
        { cancelable: true }
      );
    })
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.title}>
              Type in the Beetle ID on the device
            </Text>
          </View>

            <View style={styles.content}>
              <View style={styles.inputBox}>
                <View style={styles.textInputWrapper}>
                  <TextInput style={styles.textInput}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  onChangeText={text => setSerialNumber(text)}
                  />
                </View>
              </View>
            </View>

          <TouchableOpacity onPress={()=>{register_device();}}
          style={styles.nextButton}>
            <Text style={styles.nextButtonText}>
              Done
            </Text>
          </TouchableOpacity>
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
    width: 300,
    alignItems: "center"
  },
  nextButton: {
    alignItems: "center",
    marginTop: screenHeight * .3,
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

  },
  scrollView: {
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
  }
});
