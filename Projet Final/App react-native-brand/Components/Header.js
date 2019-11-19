import React from "react";
import { StyleSheet, Image, View } from "react-native";

const Header = () => {
  return (
    <View>
      <Image style={styles.container} source={require("../img/logo.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 150,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Header;
