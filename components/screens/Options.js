import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";
import { data } from "./MainScreen";

const Options = ({ navigation }) => {
  const isCarousel = useRef();
  const [index, setIndex] = useState(0);

  return (
    <ImageBackground
      style={styles.container}
      blurRadius={5}
      source={{
        uri: "https://img.freepik.com/premium-photo/strong-handsome-young-guy-with-hairstyle-with-naked-beautiful-torso-with-muscles-does-training-gym_338491-13498.jpg?w=2000",
      }}
      resizeMode="cover"
    >
      <View style={{maxHeight : 400}}>
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
          onSnapToItem={(index) => setIndex(index)}
        />
      </View>
      <View>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: "white",
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
    </ImageBackground>
  );
};

export default Options;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
