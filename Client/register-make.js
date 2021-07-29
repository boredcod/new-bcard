import React, { Component, useState, useEffect} from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, SafeAreaView, TextInput} from "react-native";
import { firebase } from './firebase-config';
import * as Font from 'expo-font';


export default function RegisterMake (){
  const [modalVisible, setModalVisible] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConformPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const company = "";
  const title = "";
  const phone = "";

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = ()=> {
    Font.loadAsync({
      // Fix Fonts
      'RobotoMonoLight': require('./fonts/RobotoMono-Light.ttf')
    });
  }
  useEffect(() => {
    // Fonts load
    loadFonts();
  });

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
                company,
                title,
                phone
            };
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .set(data)
                .then(() => {
                    setModalVisible(false);
                })
                .catch((error) => {
                    alert(error)
                });
        })
        .catch((error) => {
            alert(error)
    });
    }
    

    return ( 
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
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
                    <Pressable style={styles.login} onPress= {() => onRegisterPress()}><Text style={styles.textStyle}>Register</Text></Pressable>
                </SafeAreaView>
              
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
                >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {setModalVisible(true);}}
        >
          <Text style={styles.textStyle}>Register</Text>
        </Pressable>
      </View>
    );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#A9A9A9",
    marginTop: -200,
    paddingHorizontal: 20
  },
  buttonClose: {
    backgroundColor: "#A9A9A9",
    marginTop: 20
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'RobotoMonoLight',
    fontSize: 20
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  login: {
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 10,
    elevation: 2,
    backgroundColor: "#2196F3"
  },
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
  }
});



