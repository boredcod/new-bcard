import React, {useState, useEffect} from "react";
import { SafeAreaView, StyleSheet, TextInput, Pressable, Text} from "react-native";
import { firebase } from './firebase-config';



export default function RegisterForm (){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConformPassword] = useState("");
  const [fullname, setFullname] = useState("");


  const onRegisterPress = () => {
    if (password !== confirmPassword) {
        alert("Passwords don't match.")
        return
    }
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
                fullname,
            };
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .set(data)
                .then(() => {
                    console.log('firestore worked')
                })
                .catch((error) => {
                    alert(error)
                });
        })
        .catch((error) => {
            alert(error)
    });
    }
  return ((
    <SafeAreaView>
        <TextInput
        style={styles.input}
        onChangeText={(fullname) => setFullname(fullname)}
        placeholder="fullname"
      />
      <TextInput
        style={styles.input}
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
        placeholder="Password"
      />
      <TextInput
        style={styles.input}
        onChangeText={(confirmpassword) => setConformPassword(confirmpassword)}
        placeholder="Confirm Password"
      />
      <Pressable style={styles.login} onPress= {() => onRegisterPress()}><Text style={styles.textStyle}>Log in</Text></Pressable>
    </SafeAreaView>
  ) );
}


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 5,
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 40
  },
  login: {
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 10,
    elevation: 2,
    backgroundColor: "#2196F3"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

