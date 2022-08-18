import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import axios from "axios";
import { REACT_APP_API_URL } from "@env";
import { StatusBar } from "expo-status-bar";
import Carousel from "react-native-snap-carousel";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";

export const data = [
  {
    title: "Full body",
    subTitle: "Monday * 29 min",
    body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: require("../../assets/full-body.png"),
    bg: "#FFC23C",
  },
  {
    title: "Cardio & Abs",
    subTitle: "Today * 44 min",
    body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: require("../../assets/abs.png"),
    bg: "#3AB4F2",
  },
  {
    title: "Legs",
    subTitle: "Friday * 30 min",
    body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: require("../../assets/Legs.png"),
    bg: "#F900BF",
  },
];
const MainScreen = ({ navigation }) => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const isCarousel = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver :true
    }).start();
  };
  const remove = async () => {
    try {
      await AsyncStorage.removeItem("jwt");
      navigation.replace("Home");
    } catch (e) {
      console.log(e)
    }
  };

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem("jwt");

      if (value !== null) {
        const userInfo = await axios.get(`${REACT_APP_API_URL}/users/me`, {
          headers: {
            "x-auth-token": value,
          },
        });
        console.log("Username ",userInfo.data)
        dispatch(userActions.setUser(userInfo.data));
      }
      // console.log(value)
    } catch (e) {
      console.log("The error : ", e);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getUser();
      fadeIn();
      
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.leftHeader}>
        <View>
          <Text style={styles.hello}>Hello, {user.username}</Text>
          <Text style={styles.title}>Stay Fit & healthy</Text>
        </View>
        <TouchableOpacity onPress={remove}>
          <Image
            style={{
              width: 45,
              height: 45,
              borderRadius: 50,
            }}
            source={{
              uri: user.image,
            }}
          />
        </TouchableOpacity>
      </View>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text
        onPress={() => navigation.navigate('Options')}
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "bold",
            letterSpacing: 2,
            textAlign: "center",
          }}
        >
          Workout
        </Text>
      </Animated.View>

      <View style={styles.mainContent}>
        {Platform.OS === "web" ? null : (
          <View style={{ alignItems: "center" }}>
            <Carousel
          
              layout="default"
              layoutCardOffset={9}
              ref={isCarousel}
              data={data}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              // sliderWidth={350}
              itemWidth={ITEM_WIDTH}
              // itemWidth={300}
              inactiveSlideShift={0}
              useScrollView={true}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  hello: {
    color: "#7D9D9C",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "capitalize",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "capitalize",
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
  },
});
