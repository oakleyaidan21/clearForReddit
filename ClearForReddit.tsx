import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

import MainNavigator from "./navigation/mainNavigator";

const s = require("./assets/styles/mainStyles.js");

const ClearForReddit: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} backgroundColor="white" />
      <MainNavigator />
    </SafeAreaView>
  );
};

export default ClearForReddit;
