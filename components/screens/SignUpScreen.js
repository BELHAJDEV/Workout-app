import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import ImageInputContainer from "../Ui/ImageInputContainer";
import { REACT_APP_API_URL } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/user";

const SignUpScreen = ({ navigation}) => {

  
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const imageref = useRef();

  // const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const submit = async () => {
    try {
      let user = {
        username,
        email,
        password,
        image,
        
      };
      
      const response = await axios.post(`${REACT_APP_API_URL}/users`, user);
      const result = Object.values(response.headers);
      
      if(Platform.OS === 'web'){
        await AsyncStorage.setItem("jwt", result[2]);
      }else{
        await AsyncStorage.setItem("jwt", result[result.length -2]);
      }
      
      dispatch(userActions.setUser(response.data));

      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch(e) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });

    }

  };

  const getToken = async () => {
    const value = await AsyncStorage.getItem("jwt");

    if (value !== null) {
      navigation.replace('Main')
    }
  };

  useEffect(()=> {
    let isMounted = true;
    if(isMounted) {
      getToken(); 
    }

    return ()=> {
      isMounted = false;
    }
  },[])
  
  return (
    <SafeAreaView style={styles.container}>
      <ImageInputContainer>
        <View style={styles.inputsContainer}>
          <View style={styles.input_container}>
            <Text style={{ color: "#eee", fontSize: 17 }}>Username</Text>
            <TextInput
              placeholderTextColor="gray"
              placeholder="Type..."
              value={username}
              onChangeText={setUsername}
              style={styles.emailInput}
              // autoFocus={true}
              onSubmitEditing={() => emailRef.current.focus()}
            />
          </View>
          <View style={styles.input_container}>
            <Text style={{ color: "#eee", fontSize: 17 }}>Email</Text>
            <TextInput
              ref={emailRef}
              placeholderTextColor="gray"
              placeholder="Type..."
              value={email}
              onChangeText={setEmail}
              style={styles.emailInput}
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
              onSubmitEditing={() => imageref.current.focus()}
            />
          </View>

          <View style={styles.input_container}>
            <Text style={{ color: "#eee", fontSize: 17 }}>Image Url</Text>
            <TextInput
              // secureTextEntry={true}
              ref={imageref}
              placeholderTextColor="gray"
              placeholder="Type..."
              value={image}
              onChangeText={setImage}
              style={styles.emailInput}
            />
          </View>

          <TouchableOpacity style={styles.btn} onPress={submit}>
            <Text style={styles.btnText}>Continue</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 17,
              }}
            >
              Already have an account?
            </Text>

            <TouchableOpacity onPress={() => navigation.replace("SignIn")}>
              <Text
                style={{
                  color: "#06FF00",
                  fontWeight: "bold",
                  fontSize: 17,
                  textAlign: "center",
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageInputContainer>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // height: "100%",
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
    marginBottom: 20,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
