import React, {useState, useEffect} from 'react';
import { Button } from 'react-native';
import { Alert, Modal, StyleSheet, Text, ScrollView, View, SafeAreaView, TextInput, Image, TouchableHighlight} from "react-native";
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
        var starsRef = storageRef.child("profileImages/"+dude);
        // Get the download URL
        starsRef.getDownloadURL()
        .then((url) => {
            setImage(url)
        })
        .catch((error) => {
            console.log(error)
        });
    }
    imgSearch(name)
    return (
        <View style={styles.smallProfile} key={name}>
            
            {image && <Image source={{uri:image}} style={styles.profileImage}/>}
            <View> 
                <Text>{name}</Text>
                <TouchableHighlight onPress ={()=>console.log("touch LD")} >
                    <Text>Additional Info</Text>
                </TouchableHighlight>
            </View>
            
            
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
    },[])
    const searchFriends = () => {
        firebase.database().ref('UserInfo/' + addFriends.substr(0,addFriends.indexOf('@'))).get().then(()=>{
            console.log(addFriends)
            let newFriends = friends.concat([addFriends]);
            const usersRef = firebase.firestore().collection('users');
            usersRef.doc(userId).update({
                friendslist: newFriends
            })
            setFriends(friends.concat([addFriends]))

            alert("friend added")
            console.log(friends)
        }).catch(()=>{
            alert("User Does Not Exist")
        })
    }
    return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <TextInput style={styles.input} onChangeText={setAddFriends}></TextInput>
            <Button title="Search By Email" onPress={searchFriends}></Button>
            <FriendsLoop list={friends}/>
        </ScrollView>
    </SafeAreaView>
    )

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
    profileImage: {
        justifyContent: 'center',
        width: '40%',
        paddingTop: '40%',
        alignItems: 'center'
    },
    container:{
        flex: 1
    },
    smallProfile:{
        flex:1,
        flexDirection: 'row'
    }
    
  });
  
  
  
  