import React, { useState, memo } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Comment, RedditUser } from "snoowrap";
import Text from "../components/Text";
import { getTimeSincePosted } from "../util/util";
import RedditMD from "./RedditMD";
import { defaultColor } from "../assets/styles/palettes";
import { TouchableOpacity } from "react-native-gesture-handler";

const { getParser } = require("../util/snuOwnd.js");

type Props = {
  data: Comment;
  level: number;
  op: RedditUser;
  onLinkPress: any;
  navigation: any;
  theme: string;
};

const CommentThread: React.FC<Props> = (props) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);

  const { data, level, op, theme } = props;

  return (
    <TouchableWithoutFeedback onPress={() => setShowReplies(!showReplies)}>
      {/* THREAD CONTAINER */}
      <View
        style={{
          marginBottom: 10,
          backgroundColor: theme === "light" ? "white" : "black",
        }}
      >
        {/* COMMENT BODY */}
        <View
          style={{
            padding: 10,
            backgroundColor: theme === "light" ? "white" : "black",
          }}
        >
          {/* AUTHOR */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("RedditUser", { author: data.author })
              }
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color:
                    data.author.name === op.name
                      ? defaultColor
                      : theme === "light"
                      ? "black"
                      : "white",
                }}
              >
                {data.author.name}
              </Text>
            </TouchableOpacity>
            <Text style={{ color: "grey" }}>
              {" "}
              • {data.score} • {getTimeSincePosted(data.created_utc)}
            </Text>
          </View>
          <RedditMD
            body={data.body}
            onLinkPress={props.onLinkPress}
            styles={{ body: { color: theme === "light" ? "black" : "white" } }}
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
        <View
          style={{
            borderLeftWidth: 2,
            marginLeft: 5,
            borderColor: theme === "light" ? "black" : "white",
          }}
        >
          {showReplies &&
            data.replies.map((reply, index) => (
              <CommentThread
                data={reply}
                key={reply.id}
                theme={theme}
                level={level + 1}
                op={op}
                navigation={props.navigation}
                onLinkPress={props.onLinkPress}
              />
            ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(CommentThread);
