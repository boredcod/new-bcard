import React, {useState, useEffect} from "react";
import axios from 'axios';
import { SafeAreaView, StyleSheet, TextInput, Pressable, Text} from "react-native";
import Profile from './profile';

const databaseURL = "https://b-card-c6533-default-rtdb.firebaseio.com/"

function IdForm (){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [info,setInfo] = useState("");
  const [log_in, logIndone] = useState(false);


  useEffect(() => {
    fetch(`${databaseURL}/Test.json`).then(res => {
      if(res.status !== 200) {
        throw new Error(res.statusText);
      }
      return res.json()
    }).then(info=> setInfo(info));
  });
 
  return (log_in ? <Profile /> : (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={(username) => setUsername(username)}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
        placeholder="Password"
      />
      <Pressable style={styles.login} onPress= {() => {alert(info);logIndone(true);}}><Text style={styles.textStyle}>Log in</Text></Pressable>
    </SafeAreaView>
  ) );
}

export default IdForm;
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

