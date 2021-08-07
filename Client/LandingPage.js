
import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { firebase } from './firebase-config';
import NotLogged from "./notloggedinpage";
import Profile from "./profile";
import * as Font from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation,DrawerActions } from '@react-navigation/native';
import FriendsPage from'./FriendsPage';



const Stack = createNativeStackNavigator();
let id = true;

export default function LandingPage (props) { 
  const [loggedIn, setLoggedIn] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [userId, setUserId] = useState("");

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

  useEffect(() => {
    // Firebase user auth
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data().id;
            setUserId(userData);
            setLoggedIn(true);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("not loaded");
      }
    });
  }, []);
  const signOut = () => {
    firebase.auth().signOut().then(() => {
        console.log("signout")
        setLoggedIn(false);
      }).catch((error) => {
        console.log(error)
      });
      
}
    return (loggedIn ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="FriendsPage" component={FriendsPage}/>
        </Stack.Navigator>
          <Button
            title="Log out"
            onPress={() => signOut()}
            color="#f194ff"
            style={styles.profileLogout}
          />
        </NavigationContainer>
    ) : <NotLogged />)
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
    flexDirection: 'column',
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
