import React from "react";
import { StyleSheet, Image, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import {useNavigation} from '@react-navigation/native';
export default function GettingStarted() {
  const navigation = useNavigation();
  const loginNavigation = url => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/xjy9nyrtv89-26%3A1894?alt=media&token=e0eb6d4d-7114-4165-b464-c1edad0581f2",
            }}
            resizeMode="contain"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.welcomeText}>Welcome To</Text>
            <Text style={styles.appNameText}>Ghar Banega Easy</Text>
          </View>
        </View>
        <Image
          style={styles.heroImage}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/xjy9nyrtv89-27%3A9920?alt=media&token=da639183-4024-49bb-a75a-70c9741a7b2c",
          }}
          resizeMode="contain"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.customerButton]} >
            <Text style={styles.buttonText}>Customer Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.employeeButton]} onPress={loginNavigation}>
            <Text style={styles.buttonText}>Employee Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.versionText}>Version 1.1.011</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(254,254,254,1)",
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 27,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    margin:50
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  titleContainer: {
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: "Prompt-Medium",
    color: "rgba(0,0,0,1)",
  },
  appNameText: {
    fontSize: 22,
    fontFamily: "Prompt-Medium",
    color: "rgba(0,0,0,1)",
  },
  heroImage: {
    width: "100%",
    height: 200,
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 20,
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginVertical:20
  },
  customerButton: {
    backgroundColor: "#0277D3",
  },
  employeeButton: {
    backgroundColor: "rgba(51,51,51,1)",
  },
  buttonText: {
    color: "rgba(255,255,255,1)",
    fontSize: 18,
    fontFamily: "Prompt-Medium",
  },
  versionText: {
    color: "rgba(157,157,157,1)",
    fontSize: 14,
    fontFamily: "Prompt-Medium",
  },
});