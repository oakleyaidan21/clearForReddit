import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import MainNavigationContext from "../context/MainNavigationContext";
import { Comment } from "snoowrap";

type Props = {
  data: Comment;
};

const CommentThread: React.FC<Props> = (props) => {
  return (
    <View style={{ margin: 10 }}>
      <Text>{props.data.body}</Text>
    </View>
  );
};

export default CommentThread;
