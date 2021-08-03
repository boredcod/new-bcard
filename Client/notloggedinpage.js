import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef} from 'react';
import {Animated, StyleSheet, Button, Text, View } from 'react-native';
import IdMake from "./id-make";
import RegisterMake from "./register-make";
import { useFonts } from '@use-expo/font';
import * as Font from 'expo-font';
import { firebase } from './firebase-config';




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
    // Fonts load
    loadFonts();
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
    backgroundColor: '#f7f7ed',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  halfContainer: {
    flex: 1, 
    backgroundColor: '#f7f7ed',
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
