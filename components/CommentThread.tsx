import React, { useState, memo } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { Comment, RedditUser } from "snoowrap";
import { getTimeSincePosted } from "../util/util";
import HTML from "react-native-render-html";
import RedditMD from "./RedditMD";

const { getParser } = require("../util/snuOwnd.js");

type Props = {
  data: Comment;
  level: number;
  op: RedditUser;
  onLinkPress: any;
};

const CommentThread: React.FC<Props> = (props) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);

  const { data, level, op } = props;

  return (
    <TouchableWithoutFeedback onPress={() => setShowReplies(!showReplies)}>
      {/* THREAD CONTAINER */}
      <View
        style={{
          borderLeftWidth: 2,
          marginLeft: level === 0 ? 0 : 5,
          marginBottom: 10,
        }}
      >
        {/* COMMENT BODY */}
        <View style={{ paddingLeft: 10, paddingBottom: 10 }}>
          {/* AUTHOR */}
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontWeight: "bold",
                color: data.author.name === op.name ? "blue" : "black",
              }}
            >
              {data.author.name}
            </Text>
            <Text>
              {" "}
              • {data.score} • {getTimeSincePosted(data.created_utc)}
            </Text>
          </View>
          <RedditMD
            body={data.body}
            onLinkPress={props.onLinkPress}
            styles={{}}
          />
          <View style={{ flexDirection: "row" }}>
            {data.replies.length > 0 && (
              <Text style={{ fontWeight: "bold", color: "grey" }}>
                {data.replies.length}{" "}
                {data.replies.length > 1 ? "replies" : "reply"}
              </Text>
            )}
          </View>
        </View>
        {/* REPLIES */}
        {showReplies &&
          data.replies.map((reply, index) => (
            <CommentThread
              data={reply}
              key={reply.id}
              level={level + 1}
              op={op}
              onLinkPress={props.onLinkPress}
            />
          ))}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(CommentThread);
