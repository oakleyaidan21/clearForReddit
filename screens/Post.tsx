import React, { useState } from "react";
import { View, ActivityIndicator, Text, ScrollView } from "react-native";

const s = require("../assets/styles/mainStyles");

const Post: React.FC = (props) => {
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
