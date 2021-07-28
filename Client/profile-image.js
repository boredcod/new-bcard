import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from './firebase-config';
import LoggedImage from './loggedImage';
import 'firebase/storage';
export default function ProfileImage() {

    
    const [currentUserId, setCurrentUserId] = useState("");

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user => {
        const usersRef = firebase.firestore().collection('users');
        if (user) {
            usersRef
            .doc(user.uid)
            .get()
            .then((document) => {
                const userId = document.data().email
                setCurrentUserId(userId)
                console.log("user exist")
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            console.log("No user");
        }
        })
    })



    
    return (
    <View>
        <LoggedImage uid={currentUserId}/>
    </View>
    );
}