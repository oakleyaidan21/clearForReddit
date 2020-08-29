import React, { useState, memo } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { Comment } from "snoowrap";

type Props = {
  data: Comment;
  level: number;
};

const CommentThread: React.FC<Props> = (props) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);

  return (
    <TouchableWithoutFeedback onPress={() => setShowReplies(!showReplies)}>
      <View
        style={{
          marginBottom: props.level > 0 ? 0 : 10,
          borderWidth: 2,
          borderRightWidth: props.level > 0 ? 0 : 2,
          marginLeft: props.level > 0 ? 10 : 0,
          borderBottomWidth: props.level > 0 ? 0 : 2,
          borderTopWidth: props.level > 0 ? 0 : 2,
        }}
      >
        {/* BODY */}
        <View
          style={{
            padding: 10,
            borderBottomWidth: 2,
          }}
        >
          <Text>{props.data.body}</Text>
        </View>

        {showReplies &&
          props.data.replies.map((reply, index) => (
            <CommentThread
              data={reply}
              key={reply.id}
              level={props.level + 1}
            />
          ))}
        {/* REPLY INDICATOR */}
        {props.data.replies.length > 0 && (
          <View
            style={{ flex: 1, height: 20, borderTopWidth: showReplies ? 2 : 0 }}
          ></View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(CommentThread);
