import React, {useState} from "react";
import { useIsFocused } from '@react-navigation/native'

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
  Alert,
  ActivityIndicator
} from "react-native";

import {UserInfo} from '../global';
import {get_icon_url, update_remote_device} from '../Tool';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function DeviceList({ navigation }) {

  const [devices, setDevices] = useState(Object.values(UserInfo.devices));
  const [spin, setSpin] = useState(false);
  const isFocused = useIsFocused()

  // re-render after coming back
  React.useEffect(() => {
    setDevices(Object.values(UserInfo.devices))
  } , [isFocused])

  function adjust_nickname_length(name) {
    if (name.length > 8) {
      return name.substring(0, 8) + "..";
    }
    return name;
  }

  function switch_change(index) {
    let newDevices = devices.slice();
    setSpin(true);
    newDevices[index].powerState = !devices[index].powerState;
    setDevices(newDevices);
    update_remote_device(newDevices[index])
    .then(() => {
      setSpin(false);
    })
    .catch(() => {
      setSpin(false);
    });
  }

  return (
    <View style={styles.container}>
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator
      animating={spin}
      size="large"
      color="rgba(0,0,0,0.4)" />
    </View>
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
                    <Text style={styles.cardText}>{adjust_nickname_length(device.nickname)} </Text>

                    <View style={styles.switchContainer}>
                        <TouchableOpacity
                        style={styles.switchCircle}
                        onPress={() => switch_change(index)}
                        >
                          <Switch
                            style={styles.switch}
                            trackColor={{ false: "#cccccc", true: "#5abee3" }}
                            thumbColor={"white"}
                            ios_backgroundColor="rgba(0,0,0,0.2)"
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
    height: 85,
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
    borderRadius: 35,
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
  },
  activityIndicatorContainer: {
    position: "absolute",
    left: screenWidth * .47,
    top: screenHeight * .4,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  }
});
