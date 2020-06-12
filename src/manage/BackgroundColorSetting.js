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

export default function BackgroundColorSetting({ route, navigation }) {
  const key = route.params.key;
  const device = UserInfo.devices[key];
  const [spin, setSpin] = useState(false);
  const [backgroundColor, onChangeBackgroundColor] = useState(device.backgroundColor);
  const colors = ["#2EA399", "#3173c9", "#4180c8", "#6d63a8"];

  React.useLayoutEffect(() => {
    navigation.setOptions({
          headerRight: () => (
            <Button
            title="Done "
            onPress = {
              () => {
                setSpin(true);
                update_background_color();
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

  function update_background_color() {
    // access local device through serialNumber and change nickname
    UserInfo.devices[key].backgroundColor = backgroundColor;
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
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              Choose a color
            </Text>

            <View style={styles.contentRow}>
              {
                colors.map((color, index) =>
                  (
                    <TouchableOpacity
                    style={[styles.colorCard, {backgroundColor: color},
                      color == backgroundColor && styles.chosenBackgroundColor
                    ]}
                    key={index}
                    onPress={() => onChangeBackgroundColor(color)}
                    >
                    </TouchableOpacity>
                  )
                )
              }
            </View>
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
  scrollView: {
    width: "100%",
    alignItems: "center",
  },
  contentRow: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * .8,
    marginVertical: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  colorCard: {
    height: screenHeight * .1,
    width: "100%",
  },
  contentContainer: {

  },
  chosenBackgroundColor: {
    borderWidth: 2,
    borderColor: "white"
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
