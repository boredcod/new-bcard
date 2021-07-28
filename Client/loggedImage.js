import React, { useState, useEffect } from 'react';
import { Text, Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from './firebase-config';
export default function LoggedImage ({uid}) {
    const [image, setImage] = useState(null);
    
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
        });
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
            imageUpload(result.uri, uid);
        }
    };
    const storageRef = firebase.storage().ref();

    useEffect(()=>{
        var starsRef = storageRef.child("profileImages/"+uid);

        // Get the download URL
        starsRef.getDownloadURL()
        .then((url) => {
            setImage(url)
        })
        .catch((error) => {
            console.log("penis")
        });
    })
    return (
    <View>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button title="Choose your profile picture" onPress={pickImage} />
    </View>)
}