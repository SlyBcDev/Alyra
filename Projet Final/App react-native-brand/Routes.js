import React from "react";
import { Router, Scene } from "react-native-router-flux";
import Home from "./Components/Home";
import QRCodeViewer from "./Components/QRCodeViewer";
import NfcWrite from "./Components/NfcWrite";
import NfcRead from "./Components/NfcRead";

const Routes = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="home" component={Home} title="Brand App" initial={true} />
        <Scene key="Qrcode" component={QRCodeViewer} title="Scan Flash Code" />
        <Scene key="NfcWrite" component={NfcWrite} title="NfcWrite" />
        <Scene key="NfcRead" component={NfcRead} title="NfcRead" />
      </Scene>
    </Router>
  );
};

export default Routes;
