
import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { firebase } from './firebase-config';
import NotLogged from "./notloggedinpage";
import Profile from "./profile";
import * as Font from 'expo-font';
import LandingPage from './LandingPage';
import Mainpage from "./mainpage";




let id = true;
export default function App () { 
  const [loggedIn, setLoggedIn] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async() =>{
    await Font.loadAsync({
      // Fix Fonts
      'RobotoMonoLight': require('./fonts/RobotoMono-Light.ttf')
    });
    setFontsLoaded(true);
    
  }
  
  useEffect(() => {
    // Fonts load
    loadFonts();
  });
    return (fontsLoaded ? <LandingPage /> : (<View><Text>Loading</Text></View>))
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  profileLogout:{
    flexDirection: 'row',
    marginTop: 50
  },
  halfContainer: {
    flex: 1, 
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  horButtons: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
