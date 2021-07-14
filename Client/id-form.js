import React, {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, Pressable, Text} from "react-native";
import Profile from './profile';
function IdForm (){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [log_in, logIndone] = useState(false);
  

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
      <Pressable style={styles.login} onPress= {() => {alert(username);logIndone(true);}}><Text style={styles.textStyle}>Log in</Text></Pressable>
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

