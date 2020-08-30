import React, { useState, memo } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import HTML from "react-native-render-html";

const { getParser } = require("../util/snuOwnd.js");

type Props = {
  body: string;
  onLinkPress: any;
  styles: Object;
};

const RedditMD: React.FC<Props> = (props) => {
  const { body, styles } = props;
  return (
    <HTML
      html={"<body>" + getParser().render(body) + "</body>"}
      onLinkPress={props.onLinkPress}
      tagsStyles={styles}
    />
  );
};

export default RedditMD;
