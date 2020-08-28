import React from "react";
import { SafeAreaView } from "react-native";

import MainNavigator from "./navigation/mainNavigator";

const s = require("./assets/styles/mainStyles.js");

const ClearForReddit: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainNavigator />
    </SafeAreaView>
  );
};

export default ClearForReddit;
