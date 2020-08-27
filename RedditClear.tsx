import React, { createContext, useContext, useEffect } from "react";
import { View } from "react-native";

import MainNavigator from "./navigation/mainNavigator";

const s = require("./assets/styles/mainStyles.js");

const RedditClear: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <MainNavigator />
    </View>
  );
};

export default RedditClear;
