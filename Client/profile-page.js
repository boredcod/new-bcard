import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import IdMake from "./id-make";
import RegisterMake from "./register-make";
import { firebase } from './firebase-config';
import Profile from "./profile";


export default function ProfilePage (){
    return (<Profile/ >)
}