import React, {useState} from "react";
import Slider from "react-native-slider";
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
  Button
} from "react-native";

import {LocalSignInUrl} from '../../url/Guardit';
import {UserInfo} from '../global';
import {update_remote_device} from '../Tool';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const rightArrowImage = require("../../image/icon/next.png");

export default function SensitivitySetting({ route, navigation }) {
  const key = route.params.key;
  const device = UserInfo.devices[key];
  const [sensitivity, onChangeSensitivity] = useState(device.sensitivity);

  React.useLayoutEffect(() => {
    navigation.setOptions({
          headerRight: () => (
            <Button
            title="Done "
            onPress = {
              () => {
                update_sensitivity();
                update_remote_device(UserInfo.devices[key])
              }
            }
            />
          )
      });
  });

  function update_sensitivity() {
    // access local device through serialNumber and change nickname
    UserInfo.devices[key].sensitivity = sensitivity;
  }

  return (
    <View style={styles.container}>
          <View>
            <Text style={styles.title}>
              Choose sensitivity
            </Text>
            <View style={styles.contentRow}>
              <Text style={styles.sliderTitle}> {sensitivity} </Text>
              <View style={styles.sliderContainer}>
                <Slider
                  value={sensitivity / 10}
                  trackStyle={styles.track}
                  thumbStyle={styles.thumb}
                  minimumTrackTintColor='#ffffff'
                  maximumTrackTintColor='#ffffff'
                  onValueChange={value => onChangeSensitivity(Math.round(value * 10))}
                />
              </View>
            </View>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#315288",
    alignItems: "center"
  },
  backgroundImage: {
    paddingVertical: 5,
    width: "100%",
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    fontSize: 40,
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
  contentRow: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: screenWidth * .8,
    height: screenHeight * .15,
    marginVertical: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: screenHeight * .01,
  },
  sliderContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center",
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: '#449dd1',
    borderWidth: 2,
  },
  sliderTitle: {
    marginVertical: screenHeight * .01,
    textAlign: "center",
    fontSize: 30,
    color: "white"
  }
});
