import React, {useState} from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
  Dimensions,
  Alert
} from "react-native";

import {BleManager} from 'react-native-ble-plx';
import {make_alert} from "../Tool"



const backgroundImage = require("../../image/background/fade.jpg");
const rightArrowImage = require("../../image/icon/next.png");
const beetle1 = require("../../image/beetles/beetle1.png")
const beetle2 = require("../../image/beetles/beetle2.png")
const bleManager = new BleManager();
const screenWidth = Dimensions.get('window').width;

export default function BluetoothConnect({ navigation }) {
  const [ssid, setSsid] = useState('');
  const [passwords, setPasswords] = useState('')

  function prepare_connection() {
    bleManager.onStateChange((state) => {
      if (state === 'PoweredOff') {
        make_alert('Message', "Please turn on your bluetooth.");
      }
      else if (state === 'Unsupported') {
        make_alert('Error', 'Sorry, bluetooth unsupported!')
      }
      else if (state === 'PoweredOn'){
        bleManager.startDeviceScan(null, null,
        async (error, device) => {
          if (error) {
            return console.error(error);
          }
          if (device.name != null) {
            alert(device.name);
          }
        });
      }
    });
  }

  function connect_bluetooth() {
    bleManager.connectToDevice(id);
  }

  prepare_connection();

  // setTimeout(() => {
  //   if (devices.length > 0)
  //     bleManager.connectToDevice(devices[0].id);
  // }, 5000)

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Connect to bluetooth
            </Text>
            <Text style={styles.subtitle}>
              Enter wifi uuid and passwords. If there’s no password, leave it empty.
            </Text>
          </View>

          <View style={styles.contentBox}>

            <View style={styles.inputBox}>
              <Text style={styles.text}>Ssid</Text>
              <View style={styles.textInputWrapper}>
                <TextInput
                  style={styles.textInput}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  onChangeText={text => setSsid(text)}
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
              onPress={() => {connect_bluetooth()}}>
              <Text style={styles.signinText}>Connect</Text>
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
    paddingVertical: 5,
    width: "100%",
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    fontSize: 30,
    color: "white",
    paddingVertical: 40,
  },
  subtitle: {
    fontSize: 21,
    color: "white",
    width: screenWidth * .8
  },
  titleContainer: {
    alignItems: "center"
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "90%"
  },
  contentBox: {
    alignItems: "flex-start",
    paddingHorizontal: 58,
    paddingVertical: 70,
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
  scrollView: {
    width: "100%",
    alignItems: "center",
  }
});
