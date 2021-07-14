import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import IdMake from "./id-make";
import IdForm from "./id-form";


let id = true;
export default class App extends React.Component{
  state = {
    createID: false
  };
  responseNo (){
    return (<Text> Looks like you do not have ID. Want one ?</Text>);
  }
  render() {
    return (
    <View style={styles.container}>
      <View style = {styles.halfContainer}>
        <View style = {styles.halfContainer}>
          <Text>
            {this.state.createID ? <IdMake /> : this.responseNo()}
          </Text>
          <Text>

          </Text>
        </View>
        <View style = {styles.halfContainer}>
            <View style = {styles.horButtons}>
              <Button title= "Yes Button" onPress= {()=> {console.log(id);this.setState({createID:true});}}></Button>
              <Button title= "No Button" onPress= {()=> {console.log(id);this.setState({createID:false});}}></Button>
            </View>
        </View>
        <StatusBar style="auto" />
      </View>
      <View style = {styles.halfContainer}></View>
    </View>
    );
  }
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
