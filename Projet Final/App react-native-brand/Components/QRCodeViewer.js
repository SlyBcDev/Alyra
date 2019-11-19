import React, { Component } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Actions } from "react-native-router-flux";

export default class QRCodeViewer extends Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    data: ""
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  exportIt = () => {
    let data = this.state.data;
    Actions.NfcWrite({ data });
  };

  render() {
    const { hasCameraPermission, scanned, scannedValue } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end"
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={"Export it on NFC ship"} onPress={this.exportIt} />
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ data }) => {
    this.setState({ scanned: true });

    alert(`You can now export it on NFC Ship`);
    this.setState({ data });
  };
}
