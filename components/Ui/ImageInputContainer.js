import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Platform
} from "react-native";
import React from "react";

const ImageInputContainer = ({ children }) => {
  return (
    <ImageBackground
      blurRadius={5}
      source={{
        uri: "https://img.freepik.com/premium-photo/strong-handsome-young-guy-with-hairstyle-with-naked-beautiful-torso-with-muscles-does-training-gym_338491-13498.jpg?w=2000",
      }}
      resizeMode="cover"
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ImageInputContainer;

const styles = StyleSheet.create({});
