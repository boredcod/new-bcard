import { StatusBar } from 'expo-status-bar';
import React, { Profiler } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Profile(){
    return (
        <View>
            <Text>Name</Text>
            <Text>Role</Text>
            <Text>Company</Text>
        </View>
    );
}