import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {

  const getToken = async () => {
    

    const value = await AsyncStorage.getItem("jwt");

    if (value !== null) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
        });
    }

  
  };
  
  useEffect(()=> {
    let isMounted = true;
    if(isMounted) {
      getToken(); 
    }
    return () => {
      isMounted = false;
    }
  },[])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        blurRadius={5}
        source={{
          uri: "https://img.freepik.com/premium-photo/strong-handsome-young-guy-with-hairstyle-with-naked-beautiful-torso-with-muscles-does-training-gym_338491-13498.jpg?w=2000",
        }}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.title}>Find the coash is just right for you</Text>

        <View style={styles.btnsContainer}>
          <TouchableOpacity
            style={styles.emailBtn}
            onPress={() => navigation.navigate("SignIn")}
          >
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="white"
            />
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Sign In with Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={styles.googleBtn}
          // onPress={() => navigation.navigate("Main")}
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={{
                uri: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
              }}
            />
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
              Sign In with Google
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Not a member? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
              <Text
                style={{ color: "#06FF00", fontSize: 18, fontWeight: "bold" }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
  },
  image: {
    flex: 1,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "space-between",
    // height : '100%'
  },
  title: {
    fontSize: 30,
    color: "white",
    maxWidth: 230,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 25,
    textTransform: "capitalize",
  },
  btnsContainer: {
    width: "100%",
    alignItems: "center",
  },
  emailBtn: {
    backgroundColor: "#06FF00",
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },

  googleBtn: {
    backgroundColor: "white",
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 6,
  },
});
