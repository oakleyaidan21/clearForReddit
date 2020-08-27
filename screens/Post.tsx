import React, { useState } from "react";
import { View, ActivityIndicator, Text, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { MainStackParamList } from "../navigation/mainNavigator";

type PostScreenNavProp = StackNavigationProp<MainStackParamList, "Post">;

type PostScreenRouteProp = RouteProp<MainStackParamList, "Post">;

type Props = {
  navigation: PostScreenNavProp;
  route: PostScreenRouteProp;
};

const s = require("../assets/styles/mainStyles");

const Post: React.FC<Props> = (props) => {
  const { data } = props.route.params;

  return (
    <View style={s.screen}>
      <ScrollView style={{ height: "100%", width: "100%" }}>
        <Text>{JSON.stringify(data)}</Text>
      </ScrollView>
    </View>
  );
};

export default Post;
