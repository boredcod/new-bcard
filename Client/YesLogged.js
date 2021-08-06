import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef} from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Animated, StyleSheet, Button, Text, View } from 'react-native';
import Profile from './profile';
import * as Font from 'expo-font';
import { firebase } from './firebase-config';

const Drawer = createDrawerNavigator();

export default function YesLogged (){
    return(
        <NavigationContainer>
        <Drawer.Navigator initialRouteName="Profile">
          <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
}