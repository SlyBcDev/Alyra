import React, { Component } from "react";
import { AppRegistry, View } from "react-native";
import Routes from "./Routes";

export default class App extends Component {
  render() {
    return <Routes />;
  }
}

AppRegistry.registerComponent("App", () => App);
