import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import Snoowrap from "snoowrap";
import snoowrapConfig from "../util/snoowrap/snoowrapConfig";

interface Props {
  navigation: any;
}

const s = require("../assets/styles/mainStyles");

const url = Snoowrap.getAuthUrl({
  clientId: snoowrapConfig.clientId,
  scope: [
    "identity",
    "account",
    "flair",
    "edit",
    "history",
    "mysubreddits",
    "privatemessages",
    "read",
    "report",
    "save",
    "submit",
    "subscribe",
    "vote",
    "wikiread",
  ],
  redirectUri: "https://localhost:8080",
  permanent: true,
}).replace("https://www.", "https://i.");

const Login: React.FC<Props> = (props) => {
  /**
   * *********REDUX********
   */
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: url }}
        renderLoading={() => <ActivityIndicator />}
        incognito={true}
        onNavigationStateChange={(newNavState) => {
          if (newNavState.url.includes("https://localhost:8080")) {
            const start_i = newNavState.url.indexOf("code");
            const code = newNavState.url.slice(start_i + 5);
            dispatch({ type: "SET_AUTH_CODE", authCode: code });
            props.navigation.navigate("Tabs");
          }
        }}
        renderError={() => <ActivityIndicator />}
      />
    </View>
  );
};

export default Login;
