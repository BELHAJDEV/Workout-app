import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ClientsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ClientsScreen</Text>
    </View>
  )
}

export default ClientsScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    }
})