import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import IdMake from "./id-make";
import RegisterMake from "./register-make";
import { useFonts } from '@use-expo/font';
import Font from 'expo-font';
import { firebase } from './firebase-config';
import ProfilePage from "./profile-page"



let id = true;
export default function NotLogged () { 
  const [createID, setCreateID] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async() =>{
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      // Any string can be used as the fontFamily name. Here we use an object to provide more control
      "RobotoMono-Light": {
        uri: require('./fonts/RobotoMono-Light.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    setFontsLoaded(true);
  }
  useEffect(() => {
    // Update the document title using the browser API
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
    backgroundColor: "#f0f0f0",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  bFont: {
    fontSize: 40
  }
});
