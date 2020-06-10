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
import {update_remote_device} from '../Tool';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const rightArrowImage = require("../../image/icon/next.png");

export default function NicknameSetting({ route, navigation }) {
  const key = route.params.key;
  const device = UserInfo.devices[key];
  const [nickname, onChangeNickname] = useState(device.nickname);
  const nicknameInput = React.createRef();

  React.useLayoutEffect(() => {
    navigation.setOptions({
          headerRight: () => (
            <Button
            title="Done "
            onPress = {
              () => {
                update_nickname();
                update_remote_device(UserInfo.devices[key])
              }
            }
            />
          )
      });
  });

  function update_nickname() {
    // access local device through serialNumber and change nickname
    UserInfo.devices[key].nickname = nickname;
  }

  function focusNicknameInput() {
    nicknameInput.current.focus();
  }

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.title}>
              Enter nickname
            </Text>

            <TouchableOpacity
            style={styles.contentRow}
            onPress={() => focusNicknameInput()}
            >
              <TextInput
                style={styles.optionTitle}
                ref={nicknameInput}
                autoFocus={true}
                onChangeText={text => onChangeNickname(text)}
                value={nickname}
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
  }
});
