import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/screens/HomeScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './components/screens/SignInScreen';
import Options from './components/screens/Options';
import SignUpScreen from './components/screens/SignUpScreen';
import { Provider } from 'react-redux';
import store from './store';
import MainScreen from './components/screens/MainScreen';


export default function App() {

  const Stack = createNativeStackNavigator();
  


  const globalOptions =  {
    headerStyle: {
      // backgroundColor: "#2C3333",
      backgroundColor: "black",
    },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  }

  return (
    <Provider store={store}>

    <NavigationContainer style={styles.container}>
      <StatusBar style="auto" />
      
        <Stack.Navigator  initialRouteName='Home'
        screenOptions={globalOptions}
        >
          <Stack.Screen 
          options={{
            headerShown : false,
            
          }}  
          
          name='Home' component={HomeScreen} 
          
          />
          <Stack.Screen 
          
          name='SignIn' component={SignInScreen} />
          <Stack.Screen name='Options' component={Options} />
          <Stack.Screen name='Sign Up' component={SignUpScreen} />
          <Stack.Screen 
          name='Main' 
          options={{
            headerShown : false,
          
          }}  
          component={MainScreen} />

        </Stack.Navigator>
    </NavigationContainer>

    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
