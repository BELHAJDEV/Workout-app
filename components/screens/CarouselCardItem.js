import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';



export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6);


const CarouselCardItem = ({item, index }) => {
  return (
    <TouchableOpacity 
    
    style={[styles.container,{backgroundColor : item.bg}]} key={index}>

      <Image
        source={item.imgUrl}
        // source={img}
        style={styles.image}
      />

      <View style={styles.content}>
        <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subTitle}>{item.subTitle}</Text>
        </View>
        <TouchableOpacity>
        <FontAwesome5 name="play" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow : 'hidden' ,
    backgroundColor: 'white',
    borderRadius: 20,
    width: ITEM_WIDTH,
    shadowColor: "#000",
    minHeight : 350,
    maxHeight : 350,
    justifyContent : 'space-between',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    maxHeight: 250,
    // position : 'absolute',
    
    
    
  },
  content : {
    flexDirection : 'row',
    alignItems : 'center',
    paddingHorizontal : 15,
    paddingVertical : 15,
    justifyContent : 'space-between',
    
  },
  title : {
    color : 'white',
    fontWeight : 'bold',
    fontSize : 20
  },
  subTitle : {
    color : 'white',
    fontSize : 17
  }
})

export default CarouselCardItem