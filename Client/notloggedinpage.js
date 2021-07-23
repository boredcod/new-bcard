import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import IdMake from "./id-make";
import RegisterMake from "./register-make";
import { useFonts } from '@use-expo/font';
import * as Font from 'expo-font';
import { firebase } from './firebase-config';
import ProfilePage from "./profile-page"



let id = true;
export default function NotLogged () { 
  const [createID, setCreateID] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async() =>{
    await Font.loadAsync({
      // Fix Fonts
      'RobotoMonoLight': require('./fonts/RobotoMono-Light.ttf')
    });
    setFontsLoaded(true);
    
  }
  useEffect(() => {
    // Update the document title using the browser API
    loadFonts();
    console.log("fond loaded")
  });
  return (
    <View style={styles.container}>
        <View style = {styles.halfContainer}>
            <Text style={styles.bFont}>
                B-Card
            </Text>
        </View>
        <View style = {styles.halfContainer}>
            <View style = {styles.horButtons}>
                <IdMake/>
                <RegisterMake/>
            </View>
        </View>
        <StatusBar style="auto" />
    </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  halfContainer: {
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  horButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bFont: {
    fontFamily: "RobotoMonoLight",
    fontSize: 40
  }
});
