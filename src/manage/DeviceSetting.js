import React, {useState} from "react";
import {
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
} from "react-native";

import {LocalSignInUrl} from '../../url/Guardit';
import {LocalUpdateDeviceUrl} from '../../url/Guardit';
import {UserInfo} from '../global';
import {get_request} from '../request/Requests';
import {post_request} from '../request/Requests';
import {make_alert} from '../Tool';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const rightArrowImage = require("../../image/icon/next.png");

export default function DeviceSetting({ route, navigation }) {
  const [device, setDevice] = useState(UserInfo.devices[route.params.key]);
  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.title}>
              Devices
            </Text>
          </View>

          <View style={styles.content}>
            <TouchableOpacity
            onPress={() => navigation.navigate("NicknameSetting", {"key": route.params.key})}
            style={styles.contentRow}
            >
              <Text style={styles.optionTitle}>
                Nickname
              </Text>
              <View style={styles.optionContentBox}>
                <Text style={styles.optionContent}>
                  {device.nickname}
                </Text>
                <Image style={styles.nextButtonImage} source={rightArrowImage}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.contentRow}
            onPress={() => navigation.navigate("SensitivitySetting", {"key": route.params.key})}
            >
              <Text style={styles.optionTitle}>
                Sensitivity
              </Text>
              <View style={styles.optionContentBox}>
                <Text style={styles.optionContent}>
                  {device.sensitivity}
                </Text>
                <Image style={styles.nextButtonImage} source={rightArrowImage}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.contentRow}
            onPress={() => navigation.navigate("BackgroundColorSetting", {"key": route.params.key})}
            >
              <Text style={styles.optionTitle}>
                Background Color
              </Text>
              <View style={styles.optionContentBox}>
                <Text style={styles.optionContent}>
                </Text>
                <Image style={styles.nextButtonImage} source={rightArrowImage}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contentRow}>
              <Text style={styles.optionTitle}>
                Icon
              </Text>
              <View style={styles.optionContentBox}>
                <Text style={styles.optionContent}>
                </Text>
                <Image style={styles.nextButtonImage} source={rightArrowImage}/>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contentRow}>
              <Text style={styles.optionTitle}>
                Wifi
              </Text>
              <View style={styles.optionContentBox}>
                <Text style={styles.optionContent}>
                  None
                </Text>
                <Image style={styles.nextButtonImage} source={rightArrowImage}/>
              </View>
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
    justifyContent: "space-between",
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
  optionContent: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    width: screenWidth * .2,
  },
  optionContentBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: screenWidth * .25,
  },
  nextButtonImage: {
    width: screenWidth * .03,
    height: screenHeight * .03,
  }
});
