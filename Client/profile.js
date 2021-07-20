import { StatusBar } from 'expo-status-bar';
import React, { Profiler } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { firebase } from './firebase-config';

export default function Profile(){
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            console.log("signout")
          }).catch((error) => {
            // An error happened.
          });
          
    }
    return (
        
        <View style = {styles.container}>
            <Text>Name</Text>
            <Text>Role</Text>
            <Text>Company</Text>
            <Button
                title="Log out"
                disabled
                onPress={() => signOut()}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container : {
        justifyContent: 'center',
        marginTop: 50,
        marginLeft: 10
    }
})