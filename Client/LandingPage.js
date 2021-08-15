
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { firebase } from './firebase-config';
import NotLogged from "./notloggedinpage";
import Profile from "./profile";
import * as Font from 'expo-font';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation,DrawerActions } from '@react-navigation/native';
import FriendsPage from'./FriendsPage';

const Tab = createBottomTabNavigator();

let id = true;
function MyStack (){
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile}/>
      <Tab.Screen name="FriendsPage" component={FriendsPage}/>
      <Tab.Screen name="Log out" component={logOut}/>
      
    </Tab.Navigator>
  )
}
function logOut ({navgiation}){
  const signOut = () => {
    firebase.auth().signOut().then(() => {
        console.log("signout")
      }).catch((error) => {
        console.log(error)
      });    
  }
    return( 
      <View style={styles.navbar}>
        <Button
          title="Log out"
          onPress={() => signOut()}
          color="#f194ff"
          style={styles.profileLogout}
        />    
      </View>
    )
}
export default function LandingPage ({navigation}) { 
  
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [userId, setUserId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

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
  },[]);

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
        setLoggedIn(false);
      }
    });
  }, []);
    return (loggedIn ? (
        <NavigationContainer>
          <MyStack />
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
  navbar:{
    flexDirection: 'row'
  },
  profileLogout:{
    flex: 1
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
