import {
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { REACT_APP_API_URL } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";


const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const passwordRef = useRef();
  

  const submit = async () => {

    try {
      let user = {
        email,
        password,
      };
  
      const response = await axios.post(`${REACT_APP_API_URL}/auth`, user);
  
      await AsyncStorage.setItem("jwt", response.data);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch(e){
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }

  };

  const getToken = async () => {
    const value = await AsyncStorage.getItem("jwt");

    if (value !== null) {
      navigation.replace("Main");
    }
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getToken();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Sign In",
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        blurRadius={5}
        source={{
          uri: "https://img.freepik.com/premium-photo/strong-handsome-young-guy-with-hairstyle-with-naked-beautiful-torso-with-muscles-does-training-gym_338491-13498.jpg?w=2000",
        }}
        resizeMode="cover"
        style={{ flex: 1, height: "100%", justifyContent: "center" }}
      >
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={90}>
          <View style={styles.inputsContainer}>
            <View style={styles.input_container}>
              <Text style={{ color: "#eee", fontSize: 17 }}>Email</Text>
              <TextInput
                placeholderTextColor="gray"
                placeholder="Type..."
                value={email}
                onChangeText={setEmail}
                style={styles.emailInput}
                autoFocus={true}
                onSubmitEditing={() => passwordRef.current.focus()}
              />
            </View>
            <View style={styles.input_container}>
              <Text style={{ color: "#eee", fontSize: 17 }}>Password</Text>
              <TextInput
                secureTextEntry={true}
                ref={passwordRef}
                placeholderTextColor="gray"
                placeholder="Type..."
                value={password}
                onChangeText={setPassword}
                style={styles.passwordInput}
              />
            </View>

            <TouchableOpacity style={styles.btn} onPress={submit}>
              <Text style={styles.btnText}>Sign In {token}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  color: "#06FF00",
                  marginTop: 10,
                  fontWeight: "bold",
                  fontSize: 17,
                  textAlign: "center",
                }}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Not a member? </Text>
            <TouchableOpacity onPress={() => navigation.replace("Sign Up")}>
              <Text
                style={{ color: "#06FF00", fontSize: 18, fontWeight: "bold" }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3333",
    justifyContent: "center",
  },

  inputsContainer: {
    alignItems: "center",
    justifyContent: "center",
    // height : '90%'
    // marginTop: 40,
  },

  input_container: {
    width: "90%",
    // backgroundColor: "#395B64",
    backgroundColor: "transparent",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 7,
  },
  emailInput: {
    color: "white",
    paddingVertical: 5,
    fontSize: 17,
  },

  passwordInput: {
    color: "white",
    paddingVertical: 5,
    fontSize: 17,
  },
  btn: {
    backgroundColor: "#06FF00",
    width: "90%",
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
