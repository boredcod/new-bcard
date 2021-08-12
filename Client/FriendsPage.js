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
    const [addFriends, setAddFriends] = useState("");
    const [userId, setUserId] = useState("");
    const [modalVisible, setModalVisible] = useState(false)
    useEffect(() => {
        setUserId(firebase.auth().currentUser.uid)
    }, [])
    useEffect(()=>{
        const usersRef = firebase.firestore().collection('users');
        if(userId =="") {
            usersRef
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((document) => {
                const userFriends = document.data().friendslist
                setFriends(userFriends);
            })
            .catch((error) => {
                console.log(error);
            });
        }
        else{
            usersRef
            .doc(userId)
            .get()
            .then((document) => {
                const userFriends = document.data().friendslist
                setFriends(userFriends);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    })
    const searchFriends = () => {
        firebase.database().ref('UserInfo/' + addFriends).get().then(()=>{
            alert("User Exists")
            setFriends(friends.push(addFriends));
            const usersRef = firebase.firestore().collection('users');
            usersRef.doc(userId).update({
                friendslist: friends
            })
        }).catch(()=>{
            alert("User Does Not Exist")
        })
    }
    return (
    <View>
        <FriendsLoop list={friends}/>
        <TextInput style={styles.input} onChangeText={setAddFriends}></TextInput>
        <Button title="Search" onPress={searchFriends}></Button>
    </View>)
    

}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0
    },
    
  });
  
  
  
  