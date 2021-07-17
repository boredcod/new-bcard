import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, SafeAreaView, TextInput} from "react-native";
import RegisterForm from "./register-form";
import Profile from "./profile";


export default class RegisterMake extends Component {
  state = {
    modalVisible: false
  };


  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    return ( 
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <RegisterForm/>
              
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {this.setModalVisible(true);}}
        >
          <Text style={styles.textStyle}>Register</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#A9A9A9",
  },
  buttonClose: {
    backgroundColor: "#A9A9A9",
    marginTop: 20
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  login: {
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 10,
    elevation: 2,
    backgroundColor: "#2196F3"
  }
});

