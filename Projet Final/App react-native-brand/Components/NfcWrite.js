import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert
} from "react-native";

export default class NfcWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log: "Ready...",
      data: props.data
    };
  }

  componentDidMount() {
    NfcManager.start();
  }

  componentWillUnmount() {
    this._cleanUp();
  }

  _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  };

  writeData = async () => {
    if (!this.state.data) {
      Alert.alert("Nothing to write");
      return;
    }
    try {
      let tech = Platform.OS === "ios" ? NfcTech.MifareIOS : NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: "Ready to do some custom Mifare cmd!"
      });

      let data = this.state.data;
      let fullLength = data.length + 7;
      let payloadLength = data.length + 3;

      let cmd =
        Platform.OS === "ios"
          ? NfcManager.sendMifareCommandIOS
          : NfcManager.transceive;

      resp = await cmd([0xa2, 0x04, 0x03, fullLength, 0xd1, 0x01]); // 0x0C is the length of the entry with all the fluff (bytes + 7)
      resp = await cmd([0xa2, 0x05, payloadLength, 0x54, 0x02, 0x65]); // 0x54 = T = Text block, 0x08 = length of string in bytes + 3

      let currentPage = 6;
      let currentPayload = [0xa2, currentPage, 0x6e];

      for (let i = 0; i < text.length; i++) {
        currentPayload.push(text.charCodeAt(i));
        if (currentPayload.length == 6) {
          resp = await cmd(currentPayload);
          currentPage += 1;
          currentPayload = [0xa2, currentPage];
        }
      }

      // close the string and fill the current payload
      currentPayload.push(254);
      while (currentPayload.length < 6) {
        currentPayload.push(0);
      }

      resp = await cmd(currentPayload);

      this.setState({
        log: resp.toString()
      });

      this._cleanUp();
    } catch (ex) {
      this.setState({
        log: ex.toString()
      });
      this._cleanUp();
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.buttonWrite} onPress={this.writeData}>
          <Text style={styles.buttonText}>Write data</Text>
        </TouchableOpacity>

        <View style={styles.log}>
          <Text>{this.state.log}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  textInput: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    height: 50,
    textAlign: "center",
    color: "black"
  },
  buttonWrite: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#9D2235"
  },
  buttonRead: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#006C5B"
  },
  buttonText: {
    color: "#ffffff"
  },
  log: {
    marginTop: 30,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  }
});
