import React, { useRef } from "react";
import { View, Linking } from "react-native";

import { WebView } from "react-native-webview";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../navigation/mainNavigator";
import { RouteProp } from "@react-navigation/native";
import { Icon } from "react-native-elements";

type WebScreenNavProp = StackNavigationProp<MainStackParamList, "Web">;
type WebScreenRouteProp = RouteProp<MainStackParamList, "Web">;

type Props = {
  navigation: WebScreenNavProp;
  route: WebScreenRouteProp;
};

const Web: React.FC<Props> = (props) => {
  const webRef = useRef<WebView>(null);

  const goBack = () => {
    if (webRef.current) webRef.current.goBack();
  };

  const goForward = () => {
    if (webRef.current) webRef.current.goForward();
  };

  const refresh = () => {
    if (webRef.current) webRef.current.reload();
  };
  return (
    <View style={{ flex: 1 }}>
      {/* SEARCH FUNCTIONS */}
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "black",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Icon name="arrow-back" color="white" onPress={goBack} />
        <Icon name="arrow-forward" color="white" onPress={goForward} />
        <Icon name="refresh" color="white" onPress={refresh} />
        <Icon
          name="link"
          color="white"
          onPress={() => Linking.openURL(props.route.params.url)}
        />
      </View>
      <WebView
        javaScriptCanOpenWindowsAutomatically={false}
        style={{ flex: 1 }}
        source={{ uri: props.route.params.url }}
        ref={webRef}
      />
    </View>
  );
};

export default Web;
