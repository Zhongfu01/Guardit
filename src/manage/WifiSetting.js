import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Alert,
  Button,
  ActivityIndicator
} from "react-native";

import {LocalSignInUrl} from '../../url/Guardit';
import {UserInfo} from '../global';
import {update_remote_device} from '../Tool';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const rightArrowImage = require("../../image/icon/next.png");

export default function WifiSetting({ route, navigation }) {
  const key = route.params.key;
  const device = UserInfo.devices[key];
  const [spin, setSpin] = useState(false);
  const [ssid, onChangeSsid] = useState(device.wifiSsid);
  const [password, onChangePassword] = useState(device.wifiPassword);
  const ssidInput = React.createRef();
  const passwordInput = React.createRef();

  React.useLayoutEffect(() => {
    navigation.setOptions({
          headerRight: () => (
            <Button
            title="Done "
            onPress = {
              () => {
                setSpin(true);
                update_wifi_info();
                update_remote_device(UserInfo.devices[key])
                .then(() => {
                  setSpin(false);
                })
                .catch(() => {
                  setSpin(false);
                });
              }
            }
            />
          )
      });
  });

  function update_wifi_info() {
    // access local device through serialNumber and change nickname
    UserInfo.devices[key].wifiSsid = ssid;
    UserInfo.devices[key].wifiPassword = password;
  }

  function focusSsidInput() {
    ssidInput.current.focus();
  }

  function focusPasswordInput() {
    passwordInput.current.focus();
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
              Wifi Connection
            </Text>

            <TouchableOpacity
            style={styles.contentRow}
            onPress={() => focusSsidInput()}
            >
              <TextInput
                style={styles.optionTitle}
                ref={ssidInput}
                autoFocus={true}
                autoCorrect={false}
                autoCapitalize={'none'}
                placeholder={"ssid"}
                defaultValue={device.wifiSsid}
                placeholderTextColor="#202020"
                onChangeText={text => onChangeSsid(text)}
              />
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.contentRow}
            onPress={() => focusPasswordInput()}
            >
              <TextInput
                style={styles.optionTitle}
                ref={passwordInput}
                autoCorrect={false}
                autoCapitalize={'none'}
                placeholder={"password"}
                defaultValue={device.wifiPassword}
                placeholderTextColor="#202020"
                onChangeText={text => onChangePassword(text)}
              />
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
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    paddingVertical: 50,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "90%"
  },
  scrollView: {
    width: "100%",
    alignItems: "center",
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: screenWidth * .8,
    height: screenHeight * .07,
    marginVertical: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: screenHeight * .01
  },
  optionTitle: {
    fontSize: 25,
    color: "white"
  },
  finishedButton: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "white"
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
