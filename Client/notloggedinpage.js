import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import IdMake from "./id-make";
import RegisterMake from "./register-make";
import { firebase } from './firebase-config';
import ProfilePage from "./profile-page"



let id = true;
export default function NotLogged () { 
  const [createID, setCreateID] = useState(false);

 
 
  return (
    <View style={styles.container}>
      <View style = {styles.halfContainer}>
        <View style = {styles.halfContainer}>
          <Text>
          {createID ? <IdMake /> :<RegisterMake />}
          </Text>
          <Text>

          </Text>
        </View>
        <View style = {styles.halfContainer}>
            <View style = {styles.horButtons}>
              <Button title= "Yes Button" onPress= {()=> {console.log(id);setCreateID(true);}}></Button>
              <Button title= "No Button" onPress= {()=> {console.log(id);setCreateID(false);}}></Button>
            </View>
        </View>
        <StatusBar style="auto" />
      </View>
      <View style = {styles.halfContainer}></View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  halfContainer: {
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  horButtons: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
