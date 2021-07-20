import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { firebase } from './firebase-config';
import ProfilePage from "./profile-page"


export default function Mainpage() {
    return (<ProfilePage />)
}