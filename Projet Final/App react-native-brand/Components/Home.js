import React from "react";
import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from "react-native";
import Header from "./Header";
import { Actions } from "react-native-router-flux";

const Home = () => {
  checkIn = () => {
    Actions.Qrcode();
  };

  readData = () => {
    Actions.NfcRead();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TouchableOpacity style={styles.buttonWrite} onPress={this.checkIn}>
        <Text style={styles.buttonText}>Check-in Instrument</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRead} onPress={this.readData}>
        <Text style={styles.buttonText}>Read Data</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonWrite: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "blue"
  },
  buttonRead: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "green"
  },

  buttonText: {
    color: "#ffffff",
    margin: 10
  }
});

export default Home;
