
import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { firebase } from './firebase-config';
import NotLogged from "./notloggedinpage";
import Profile from "./profile";
import Mainpage from "./mainpage";



let id = true;
export default function App () { 
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
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
    <View style = {styles.profileLogout}>
        <Profile/>
        <Button
            title="Log out"
            onPress={() => signOut()}
       
        />
    </View>
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
