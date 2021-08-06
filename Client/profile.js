import { StatusBar } from 'expo-status-bar';
import React, { Profiler , useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, KeyboardAvoidingView, SafeAreaView, TextInput} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker';
import ProfileImage from './profile-image'
import { firebase } from './firebase-config';
import * as Font from 'expo-font';

export default function Profile({UserId}){
    const [currentUserEmail, setCurrentUserEmail] = useState("");
    const [currentUserId, setCurrentUserId] = useState("");
    const [currentUserCompany, setCurrentUserCompany] = useState("");
    const [currentUserPhone, setCurrentUserPhone] = useState("");
    const [currentUserTitle, setCurrentUserTitle] = useState("");
    const [name, setName] = useState("");
    const [first, setFirst] = useState(true);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(true);
    const loadFonts = async() =>{
        await Font.loadAsync({
          // Fix Fonts
          'RobotoMonoLight': require('./fonts/RobotoMono-Light.ttf')
        });
      }
    
    useEffect(() => {
    // Firebase user auth
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
        usersRef
            .doc(user.uid)
            .get()
            .then((document) => {
            const userData = document.data().id;
            setCurrentUserId(userData);
            })
            .catch((error) => {
           
            console.log(error);
            });
        } else {
        console.log("not loaded");
        }
    });
    })
    useEffect(()=>{
    
        loadFonts();
        const usersRef = firebase.firestore().collection('users');
        usersRef
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((document) => {
            console.log("nah")
            const userEmail = document.data().email
            const userId = document.data().id
            const userCompany = document.data().company
            const userName = document.data().fullname
            const userTitle = document.data().title
            const userPhone = document.data().phone
            if (first) {   
                setCurrentUserEmail(userEmail)
                setCurrentUserId(userId)
                setCurrentUserCompany(userCompany)
                setCurrentUserTitle(userTitle)
                setCurrentUserPhone(userPhone)
                setName(userName)
                setLoading(true);
                setFirst(false)
            }
            else {
                setName(userName)
            }
        })
        .catch((error) => {
            console.log("hey")
            console.log(error);
        });
    
    })
    const editDoc = () => {
        console.log(currentUserCompany)
        const usersRef = firebase.firestore().collection('users').doc(currentUserId);
        usersRef.update({
            company: currentUserCompany,
            phone: currentUserPhone,
            title: currentUserTitle
        }).then(()=>{
            alert("Upload done")
        }).catch((error) => {
            alert(error)
        })
    }

    return( loading ? (
        <View style={styles.container}>
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
                    onPress={editDoc}
                    title="Edit"
                    color="#000000"
                />
            </KeyboardAwareScrollView>
        </View>
    ): <View><Text>Loading</Text></View>);
}
const styles = StyleSheet.create({
    container : {
        marginTop: 0
    },
    log_out: {
        color: "#f194ff"
    },
    input: {
        height: 40,
        margin: 5,
        borderBottomWidth: 1,
        flexDirection: "row",
        paddingHorizontal: 40,
        fontFamily: 'RobotoMonoLight',
      },
    edit: {
        fontFamily: 'RobotoMonoLight'
    }
})