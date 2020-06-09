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
import { stringToBytes } from 'convert-string';
import {make_alert} from "../Tool";

const backgroundImage = require("../../image/background/fade.jpg");
const rightArrowImage = require("../../image/icon/next.png");
const beetle1 = require("../../image/beetles/beetle1.png")
const beetle2 = require("../../image/beetles/beetle2.png")
const bleManager = new BleManager();
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function BluetoothList({ navigation }) {

  const [bluetoothList, setBluetoothList] = useState(new Set());
  const [nameToId, setNameToId] = useState(new Map());


  function prepare_connection() {
    const subscription = bleManager.onStateChange((state) => {
      if (state === 'PoweredOff') {
        make_alert('Message', "Please turn on your bluetooth.");
      }
      else if (state === 'PoweredOn') {
         start_scanning();
         subscription.remove();
      }
    }, true);
  }

  function start_scanning() {
    bleManager.startDeviceScan(null, null,
    async (error, device) => {
      if (error) {
        return console.error(error);
      }
      if (device.name != null) {
        add_item(device);
      }
    });
  }

  function add_item(newDevice) {
    let newSet = new Set(bluetoothList);
    newSet.add(newDevice.name);
    setBluetoothList(newSet);

    let newDict = new Set(nameToId);
    newDict[newDevice.name] = newDevice.id;
    setNameToId(newDict);
  };

  function connect_bluetooth(name) {
    // alert(nameToId[name]);
    bleManager.stopDeviceScan();
    bleManager.connectToDevice(nameToId[name])
    .then(device => {
        // const ssid = stringToBytes("Zhongfu");
        // bleManager.writeCharacteristic(ssid)
        // .then(() => {
        //   const password = stringToBytes("bai960426");
        //   bleManager.writeCharacteristic(password);
        // })
    });
  }

  prepare_connection();

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Choose a bluetooth to connect
            </Text>
          </View>

          <View style={styles.contentBox}>
            <View style={styles.listContainer}>
              {
                Array.from(bluetoothList).map((bluetoothItem, index) =>
                  (
                    <TouchableOpacity
                    style={styles.listItem}
                    key={index}
                    onPress = {() => {connect_bluetooth(bluetoothItem)}}
                    >
                      <Text style={styles.listText} key={index}>
                        {bluetoothItem}
                      </Text>
                    </TouchableOpacity>
                  )
                )
              }
            </View>
            {bluetoothList.size == 0 &&
              <View style={styles.pendingTextBox}>
                <Text style={styles.pendingText}>Searching...</Text>
              </View>
            }
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
    fontSize: screenWidth * .07,
    color: "white",
    paddingVertical: 45,
  },
  subtitle: {
    fontSize: 21,
    color: "white",
    width: screenWidth * .8
  },
  titleContainer: {
    alignItems: "center"
  },
  contentBox: {
    alignItems: "flex-start",
    paddingHorizontal: 58,
    paddingVertical: 30,
  },
  listContainer: {
    flexDirection: "column",
    paddingVertical: screenWidth * .05,
    justifyContent: "center",
    width: screenWidth * .8
  },
  listItem: {
    width: screenWidth * .8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: screenWidth * .01,
    width: "100%",
    height: screenWidth * .15,
    justifyContent: "center",
    borderBottomWidth: 1,
  },
  listText: {
    textAlign: "center",
    fontSize: screenWidth * .05,
    color: "white"
  },
  scrollView: {
    width: "100%",
    alignItems: "center",
  },
  pendingTextBox: {
    width: screenWidth,
    justifyContent: "center",
  },
  pendingText: {
    textAlign:"center",
    fontSize: screenWidth * .055,
    color: "rgba(0,0,0,0.5)"
  },
});
