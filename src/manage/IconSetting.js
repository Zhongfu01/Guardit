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
  Button
} from "react-native";

import {LocalSignInUrl} from '../../url/Guardit';
import {UserInfo} from '../global';
import {update_remote_device, get_icon_url} from '../Tool';
import {beetle1Url} from '../../url/Guardit';
import {beetle2Url} from '../../url/Guardit';
import {beetle3Url} from '../../url/Guardit';
import {beetle4Url} from '../../url/Guardit';
import {beetle5Url} from '../../url/Guardit';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const rightArrowImage = require("../../image/icon/next.png");

export default function IconSetting({ route, navigation }) {
  const key = route.params.key;
  const device = UserInfo.devices[key];
  const [iconName, onChangeIconName] = useState(device.iconName);
  const icons = [
    {'url': beetle1Url, 'iconName': 'beetle1'},
    {'url': beetle2Url, 'iconName': 'beetle2'},
    {'url': beetle3Url, 'iconName': 'beetle3'},
    {'url': beetle4Url, 'iconName': 'beetle4'},
    {'url': beetle5Url, 'iconName': 'beetle5'}
  ];

  React.useLayoutEffect(() => {
    navigation.setOptions({
          headerRight: () => (
            <Button
            title="Done "
            onPress = {
              () => {
                update_icon();
                update_remote_device(UserInfo.devices[key])
              }
            }
            />
          )
      });
  });

  function update_icon() {
    // access local device through serialNumber and change nickname
    UserInfo.devices[key].iconName = iconName;
  }


  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              Choose a color
            </Text>

            <View style={styles.content}>
              <View style={styles.contentBox}>
                {
                  icons.map((icon, index) =>
                    (
                      <TouchableOpacity
                      style={[styles.iconCard,
                        iconName == icon.iconName && styles.chosenBackgroundColor
                      ]}
                      key={index}
                      onPress={() => onChangeIconName(icon.iconName)}
                      >
                      <Image source={icon.url} style={styles.iconImage}/>
                      </TouchableOpacity>
                    )
                  )
                }
              </View>
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
  content: {
    width: screenWidth * .7,
    paddingVertical: screenHeight * .01,
    paddingHorizontal: screenWidth * .02,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center"
  },
  iconCard: {
    height: screenHeight * .09,
    width: screenHeight * .09,
    marginVertical: screenHeight * .01,
    marginHorizontal: screenWidth * .05,
  },
  iconImage: {
    height: screenHeight * .09,
    width: screenHeight * .09,
  },
  contentBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: screenHeight * .01,
    paddingHorizontal: screenWidth * .02,
  },
  chosenBackgroundColor: {
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: screenHeight * .01
  }
});
