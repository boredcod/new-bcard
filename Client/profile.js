import { StatusBar } from 'expo-status-bar';
import React, { Profiler } from 'react';
import { StyleSheet, Text, View, Button, Image, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ProfileImage from './profile-image'
import { firebase } from './firebase-config';

export default function Profile(){
    return (  
        <View>
            <ProfileImage />
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
    }
})