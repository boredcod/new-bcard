import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from './firebase-config';
import LoggedImage from './loggedImage';
import 'firebase/storage';
export default function ProfileImage({currentUserEmail}) {
    return (
    <View>
        <LoggedImage Email={currentUserEmail}/>
    </View>
    );
}