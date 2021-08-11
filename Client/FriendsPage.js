import React, {useState, useEffect} from 'react';
import { Button } from 'react-native';
import { Alert, Modal, StyleSheet, Text, Pressable, View, SafeAreaView, TextInput} from "react-native";
import { firebase } from './firebase-config';
import NotLogged from "./notloggedinpage";
import Profile from "./profile";
import * as Font from 'expo-font';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function FriendsLoop({list}){

    return (
        <View>
            <Text>{list}</Text>
        </View>
    )
}
export default function FriendsPage({navigation}){
    const [friends,setFriends] = useState([]);
    const [modalVisible, setModalVisible] = useState(false)
    useEffect(()=>{
        const usersRef = firebase.firestore().collection('users');
        usersRef
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((document) => {
            console.log("nah")
            const userFriends = document.data().friendslist
         
            setFriends(userFriends);
        })
        .catch((error) => {
            console.log(error);
        });
    })
    return (
    <View>
        <FriendsLoop list={friends}/>
    </View>)
    

}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0
    },
    
  });
  
  
  
  