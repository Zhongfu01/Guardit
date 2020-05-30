import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView
} from "react-native";

const backgroundImage = require("../../image/background/fade.jpg");
const rightArrowImage = require("../../image/icon/next.png");
const beetle1 = require("../../image/beetles/beetle1.png")
const beetle2 = require("../../image/beetles/beetle2.png")


export default function Cover({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.title}>
              Devices
            </Text>
          </View>

          <View style={styles.content}>

            <View style={[styles.deviceCard, {backgroundColor: "#2EA399"}]}>
              <View style={styles.deviceCardLeft}>
                <Text style={styles.cardText}>Picnic 1 </Text>

                <View style={styles.switchContainer}>
                    <View style={styles.switchCircle}>
                      <Switch
                        style={styles.switch}
                        trackColor={{ false: "#cccccc", true: "#cccccc" }}
                        thumbColor={"white"}
                        ios_backgroundColor="#2EA399"
                        onValueChange={()=>{}}
                        value={true}
                        opacity={0.9}
                      />
                    </View>
                    <Text style={styles.switchText}>
                      On
                    </Text>
                </View>

              </View>
              <Image source={beetle1} style={styles.beetleImage}/>
            </View>

            <View style={[styles.deviceCard, {backgroundColor: "#1271D0"}]}>
              <View style={styles.deviceCardLeft}>
                <Text style={styles.cardText}>Library 1 </Text>

                <View style={styles.switchContainer}>
                    <View style={styles.switchCircle}>
                      <Switch
                        style={styles.switch}
                        trackColor={{ false: "#cccccc", true: "#cccccc" }}
                        thumbColor={"white"}
                        ios_backgroundColor="#2EA399"
                        onValueChange={()=>{}}
                        value={true}
                        opacity={0.9}
                      />
                    </View>
                    <Text style={styles.switchText}>
                      On
                    </Text>
                </View>

              </View>
              <Image source={beetle2} style={styles.beetleImage}/>
            </View>

          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
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
  }
});
