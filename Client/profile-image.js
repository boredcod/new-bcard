import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from './firebase-config';
import 'firebase/storage';
export default function ProfileImage() {
    const [image, setImage] = useState(null);
    const usersRef = firebase.firestore().collection('users');
    const [currentUserId, setCurrentUserId] = useState("");

    const getCurrentUser = () => {
        firebase.auth().onAuthStateChanged(user => {
        if (user) {
            usersRef
            .doc(user.uid)
            .get()
            .then((document) => {
                const userId = document.data().email
                setCurrentUserId(userId)
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            console.log("No user");
        }
        })
    }
    const imageUpload = async (uri,imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const imageRef = firebase.storage().ref().child("profileImages/"+imageName);
        imageRef.put(blob).then(() => {
            alert("Image uploaded successfully to Firebase.");
        });

    }
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
            }
        })();
    }, []);

    const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });


    if (!result.cancelled) {
        setImage(result.uri);
        getCurrentUser();
        imageUpload(result.uri, currentUserId);
    }
    };

    return (
    <View>
    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        <Button title="User ID" onPress={getCurrentUser} />
    </View>
    );
}