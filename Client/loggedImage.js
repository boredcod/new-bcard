import React, { useState, useEffect } from 'react';
import { Text, Button, Image, View, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from './firebase-config';
import * as Font from 'expo-font';
export default function LoggedImage ({Email}) {
    const [image, setImage] = useState(null);
    const storageRef = firebase.storage().ref();
    const loadFonts = async() =>{
        await Font.loadAsync({
          // Fix Fonts
          'RobotoMonoLight': require('./fonts/RobotoMono-Light.ttf')
        });
      }

    const imageUpload = async (uri,imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const imageRef = firebase.storage().ref().child("profileImages/"+imageName);
        imageRef.put(blob).then(() => {
            setImage(uri);
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

    useEffect(()=>{
        loadFonts();
        var starsRef = storageRef.child("profileImages/"+Email);
        // Get the download URL
        starsRef.getDownloadURL()
        .then((url) => {
            setImage(url)
        })
        .catch((error) => {
            console.log(error)
        });
    },[])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.cancelled) {
            setImage(result.uri);
            imageUpload(result.uri, Email);
        }
    };
   

  
    return (
    <View>
        {image && <Image source={{ uri: image }} style={styles.container} />}
        <Button title="Choose your profile picture" onPress={pickImage} style={styles.text} />
    </View>)
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: '100%',
        paddingTop: '100%',
        alignItems: 'center'
    },
    text:{
        fontFamily: 'RobotoMonoLight'
    }
})