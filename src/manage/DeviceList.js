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

import {LocalSignInUrl} from '../../url/Guardit';
import {LocalUpdateDeviceUrl} from '../../url/Guardit';
import {UserInfo} from '../global';
import {get_request} from '../request/Requests';
import {post_request} from '../request/Requests';
import {make_alert, get_icon_url} from '../Tool';

const backgroundImage = require("../../image/background/fade.jpg");
const rightArrowImage = require("../../image/icon/next.png");
const beetle1 = require("../../image/beetles/beetle1.png")
const beetle2 = require("../../image/beetles/beetle2.png")
const screenWidth = Dimensions.get('window').width;

export default function DeviceList({ navigation }) {

  const [devices, setDevices] = useState(Object.values(UserInfo.devices));

  function switch_change(index) {
    let newDevices = devices.slice();
    newDevices[index].powerState = !devices[index].powerState;
    setDevices(newDevices);
    update_power_remote(newDevices[index]);
  }

  function update_power_remote(newDevice) {
    // user Userinfo.device to update device data in remote site
    post_request(
      LocalUpdateDeviceUrl,
      newDevice
    )
    .then(jsonResponse => {
      // success
      jsonResponse = jsonResponse["data"]
      make_alert('Success', 'The device has been updated successfully.');
    })
    .catch(errorMsg => {
      make_alert('Failed', 'Something went wrong while trying to update the device.');
    })
  }


  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.title}>
              Devices
            </Text>
          </View>

          <View style={styles.content}>

            {
              devices.length == 0 && <View style={styles.pendingTextBox}>
                <Text style={styles.pendingText}>Loading ... </Text>
              </View>
            }
            {
              devices.length >= 0 && devices.map((device, index) => (
                <TouchableOpacity
                style={[styles.deviceCard, {backgroundColor: device.backgroundColor}]}
                onPress={() => navigation.navigate('DeviceSetting', {"key": device["serialNumber"]})}
                key={index}
                >
                  <View style={styles.deviceCardLeft}>
                    <Text style={styles.cardText}>{device.nickname} </Text>

                    <View style={styles.switchContainer}>
                        <TouchableOpacity
                        style={styles.switchCircle}
                        onPress={() => switch_change(index)}
                        >
                          <Switch
                            style={styles.switch}
                            trackColor={{ false: "#cccccc", true: "#cccccc" }}
                            thumbColor={"white"}
                            ios_backgroundColor="#2EA399"
                            onValueChange={()=>{switch_change(index)}}
                            value={device.powerState}
                            opacity={0.9}
                          />
                        </TouchableOpacity>
                        <Text style={styles.switchText}>
                          {device.powerState ? "On" : "Off"}
                        </Text>
                    </View>

                  </View>
                  <Image source={get_icon_url(device.iconName)} style={styles.beetleImage}/>
                </TouchableOpacity>
              ))
            }

          </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#315288",
  },
  backgroundImage: {
    paddingVertical: 5,
    width: "100%",
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    fontSize: 45,
    color: "white",
    paddingVertical: 50,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "90%"
  },
  deviceCard: {
    flexDirection: "row",
    width: 320,
    height: 150,
    marginVertical: 5,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  deviceCardLeft: {
    paddingTop: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    width: 170,
    height: "100%",
    marginRight: 40
  },
  cardText: {
    fontSize: 30,
    color: "white",
  },
  beetleImage: {
    width: 85,
    height: 85
  },
  switchContainer: {
    width: 108,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  switchCircle: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: "rgba(196,196,196,0.27)",
    justifyContent: "center",
    alignItems: "center"
  },
  switch: {
    transform: [{ scaleX: .9 }, { scaleY: .9 }]
  },
  switchText: {
    color: "white",
    fontSize: 20,
  },
  scrollView: {
    width: "100%",
    alignItems: "center",
  },
  pendingTextBox: {
    paddingVertical: screenWidth * .1,
    width: screenWidth,
  },
  pendingText: {
    textAlign:"center",
    fontSize: screenWidth * .055,
    color: "rgba(0,0,0,0.5)"
  }
});
