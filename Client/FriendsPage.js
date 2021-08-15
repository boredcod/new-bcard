import React, {useState, useEffect} from 'react';
import { Button } from 'react-native';
import { Alert, Modal, StyleSheet, Text, Pressable, View, SafeAreaView, TextInput, Image} from "react-native";
import { firebase } from './firebase-config';
import NotLogged from "./notloggedinpage";
import Profile from "./profile";
import * as Font from 'expo-font';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
function FriendProfile({name}){
    const storageRef = firebase.storage().ref();
    const dbRef = firebase.database().ref();
    const [image, setImage] = useState(null);
    let useremail;
    const imgSearch = (dude) => {
        
        firebase.database().ref("UserInfo").child("Joon").get().then((data)=>{
            console.log(data.email)
            useremail = data.email
        })
       
        var starsRef = storageRef.child("profileImages/Joon@gmail.com");
        // Get the download URL
        starsRef.getDownloadURL()
        .then((url) => {
            setImage(url)
        })
        .catch((error) => {
    


        });
    }
    imgSearch(name)
    return (
        <View key={name}>
            {image && <Image source={{uri:image}} style={styles.container}/>}
            <Text>{name}</Text>
        </View>
    )
}
function FriendsLoop({list}){
    

    return (
        <View>
            {list.map((item) => (
            <FriendProfile key={item} name={item}/>
            ))}
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
    }, [])
    const searchFriends = () => {
        firebase.database().ref('UserInfo/' + addFriends.substr(0,addFriends.indexOf('@'))).get().then(()=>{
            console.log(addFriends)
            setFriends(friends.concat([addFriends]));
            
            const usersRef = firebase.firestore().collection('users');
           
            usersRef.doc(userId).update({
                friendslist: friends
            })
            alert("friend added")
            console.log(friends)
        }).catch(()=>{
            alert("User Does Not Exist")
        })
    }
    return (
    <View>
        <TextInput style={styles.input} onChangeText={setAddFriends}></TextInput>
        <Button title="Search By Email" onPress={searchFriends}></Button>
        <FriendsLoop list={friends}/>
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
    container: {
        justifyContent: 'center',
        width: '50%',
        paddingTop: '50%',
        alignItems: 'center'
    }
    
  });
  
  
  
  