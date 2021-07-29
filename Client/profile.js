import { StatusBar } from 'expo-status-bar';
import React, { Profiler , useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, Platform, SafeAreaView, TextInput} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ProfileImage from './profile-image'
import { firebase } from './firebase-config';

export default function Profile(){
    const [currentUserEmail, setCurrentUserEmail] = useState("");
    const [currentUserId, setCurrentUserId] = useState("");
    const [currentUserCompany, setCurrentUserCompany] = useState("");
    const [currentUserPhone, setCurrentUserPhone] = useState("");
    const [currentUserTitle, setCurrentUserTitle] = useState("");
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user => {
        const usersRef = firebase.firestore().collection('users');
        if (user) {
            usersRef
            .doc(user.uid)
            .get()
            .then((document) => {
                const userEmail = document.data().email
                const userId = document.data().id
                setCurrentUserEmail(userEmail)
                setCurrentUserId(userId)

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
            <ProfileImage currentUserEmail={currentUserEmail}/>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={(company) => setCurrentUserCompany(company)}
                    placeholder="company"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(title) => setCurrentUserTitle(title)}
                    placeholder="title"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(phone) => setCurrentUserPhone(phone)}
                    placeholder="phone number"
                />
            </SafeAreaView>
        </View>
    );
}
const styles = StyleSheet.create({
    container : {
        justifyContent: 'center',
        marginTop: 50,
        marginLeft: 10
    },
    log_out: {
        color: "#f194ff"
    },
    input: {
        height: 40,
        margin: 5,
        borderBottomWidth: 1,
        flexDirection: "row",
        paddingHorizontal: 40
      },
})