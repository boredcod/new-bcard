import { StatusBar } from 'expo-status-bar';
import React, { Profiler , useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, KeyboardAvoidingView, SafeAreaView, TextInput} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker';
import ProfileImage from './profile-image'
import { firebase } from './firebase-config';

export default function Profile(){
    const [currentUserEmail, setCurrentUserEmail] = useState("");
    const [currentUserId, setCurrentUserId] = useState("");
    const [currentUserCompany, setCurrentUserCompany] = useState("");
    const [currentUserPhone, setCurrentUserPhone] = useState("");
    const [currentUserTitle, setCurrentUserTitle] = useState("");
    const [name, setName] = useState("");
    const [edit, setEdit] = useState(false);
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
                const userName = document.data().fullname
                const userCompany = document.data().company
                const userTitle = document.data().title
                const userPhone = document.data().phone
                setCurrentUserEmail(userEmail)
                setCurrentUserId(userId)
                setName(userName)
                setCurrentUserCompany(userCompany)
                setCurrentUserPhone(userPhone)
                setCurrentUserTitle(userTitle)
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            console.log("No user");
        }
        })
    })
    const updateDoc = () => {
        const usersRef = firebase.firestore().collection('users').doc(currentUserId);
        usersRef.update({
            company: currentUserCompany,
            phone: currentUserPhone,
            title: currentUserTitle
        }).then(()=>{
            alert("data successfully updated")
            setEdit(!edit)
            usersRef
            .get()
            .then((document) => {
                const userEmail = document.data().email
                const userId = document.data().id
                const userName = document.data().fullname
                const userCompany = document.data().company
                const userTitle = document.data().title
                const userPhone = document.data().phone
                setCurrentUserEmail(userEmail)
                setCurrentUserId(userId)
                setName(userName)
                setCurrentUserCompany(userCompany)
                setCurrentUserPhone(userPhone)
                setCurrentUserTitle(userTitle)
                setDataLoading(true)
            })
            .catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            alert("error")
        })
    }

    return( edit ? (
        <View>
        <KeyboardAwareScrollView>
            <ProfileImage currentUserEmail={currentUserEmail}/>
            <TextInput
                style={styles.input}
                onChangeText={(name) => setName(name)}
                placeholder="name"
                value={name}
                
            />
            <TextInput
                style={styles.input}
                onChangeText={(company) => setCurrentUserCompany(company)}
                placeholder="company"
                value={currentUserCompany}
            />
            <TextInput
                style={styles.input}
                onChangeText={(title) => setCurrentUserTitle(title)}
                placeholder="title"
                value={currentUserTitle}
            />
            <TextInput
                style={styles.input}
                onChangeText={(phone) => setCurrentUserPhone(phone)}
                placeholder="phone number"
                value={currentUserPhone}
            />
            <Button
                onPress={updateDoc}
                title="Update The Information"
                color="#841584"
            />
        </KeyboardAwareScrollView>
    </View>) :
    (  
        <View>
            <KeyboardAwareScrollView>
                <ProfileImage currentUserEmail={currentUserEmail}/>
                <TextInput
                    style={styles.input}
                    onChangeText={(name) => setName(name)}
                    placeholder="name"
                />
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
                <Button
                    onPress={updateDoc}
                    title="Edit"
                    color="#841584"
                />
            </KeyboardAwareScrollView>
        </View>
    ));
}
const styles = StyleSheet.create({
    container : {
        flex: 1
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