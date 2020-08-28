import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../navigation/mainNavigator";
import { RouteProp } from "@react-navigation/native";

type WebScreenNavProp = StackNavigationProp<MainStackParamList, "Web">;
type WebScreenRouteProp = RouteProp<MainStackParamList, "Web">;

type Props = {
  navigation: WebScreenNavProp;
  route: WebScreenRouteProp;
};

const Web: React.FC<Props> = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ width: "100%", height: 50, backgroundColor: "black" }}
      ></View>
      <WebView
        style={{ flex: 1 }}
        source={{ uri: props.route.params.url }}
      ></WebView>
    </View>
  );
};

export default Web;
