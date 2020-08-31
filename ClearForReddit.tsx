import React from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

import MainNavigator from "./navigation/mainNavigator";

const s = require("./assets/styles/mainStyles.js");

const ClearForReddit: React.FC = () => {
  return <MainNavigator />;
};

export default ClearForReddit;
