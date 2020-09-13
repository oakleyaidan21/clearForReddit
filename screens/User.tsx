import React, { useContext, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import Text from "../components/Text";
import { useSelector } from "react-redux";
import MainNavigationContext from "../context/MainNavigationContext";
import { defaultColor } from "../assets/styles/palettes";
import UserHeader from "../components/UserHeader";
import CommentThread from "../components/CommentThread";
import { Comment, Listing, RedditUser } from "snoowrap";

const s = require("../assets/styles/mainStyles");

const contentTypes = [
  "Comments",
  "Posts",
  "Awards",
  "Gilded",
  "Upvoted",
  "Downvoted",
];

interface Props {
  navigation: any;
}

const User: React.FC<Props> = (props) => {
  const { user, setUser, currentSub } = useContext(MainNavigationContext);
  /**
   * *********REDUX********
   */
  const { users } = useSelector((state: any) => state);

  /**
   * ********STATE********
   */

  const [refreshingUser, setRefreshingUser] = useState<boolean>(false);
  const [comments, setComments] = useState<Listing<Comment>>();
  const [contentType, setContentType] = useState<String>("Comments");

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  const getUserComments = () => {
    user?.getComments().then((comments: any) => {
      setComments(comments);
    });
  };

  const getUserPosts = () => {
    user?.getSubmissions().then((submissions) => {});
  };

  const getContentType = () => {
    switch (contentType) {
      case "Comments": {
        getUserComments();
      }
      case "Posts": {
        getUserPosts();
      }
      default: {
      }
    }
  };

  useEffect(() => {
    if (user) {
      getContentType();
    }
  }, [user]);

  return (
    <>
      <View style={{ flex: 1 }}>
        {users !== "" && (
          <UserHeader addUser={() => props.navigation.navigate("Login")} />
        )}
        {users === "" ? (
          <View style={{ flex: 1 }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <Text style={{ fontSize: 25, textAlign: "center" }}>
                Log in with your Reddit account!
              </Text>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: defaultColor,
                  borderRadius: 10,
                  width: 100,
                  margin: 10,
                }}
                onPress={() => props.navigation.navigate("Login")}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <ScrollView
            style={{ flex: 1, width: "100%" }}
            refreshControl={
              <RefreshControl
                refreshing={refreshingUser}
                onRefresh={() => {
                  setRefreshingUser(true);
                  user?.fetch().then((newUser) => {
                    setUser(newUser);
                    setRefreshingUser(false);
                    getContentType();
                  });
                }}
              />
            }
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                backgroundColor: "white",
              }}
            >
              <View style={[s.karmaBox, { borderColor: primary_color }]}>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>LINK</Text>
                <Text>{user?.link_karma}</Text>
              </View>
              <View style={[s.karmaBox, { borderColor: primary_color }]}>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  COMMENT
                </Text>
                <Text>{user?.comment_karma}</Text>
              </View>
            </View>
            <ScrollView
              style={{
                width: "100%",
                height: 50,
                borderColor: primary_color,
                borderBottomWidth: 2,
                backgroundColor: "white",
              }}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              contentContainerStyle={{
                alignItems: "center",
              }}
            >
              {contentTypes.map((t) => {
                return (
                  <TouchableOpacity
                    key={t}
                    onPress={() => setContentType(t)}
                    style={{
                      width: 100,
                      height: 50,
                      justifyContent: "center",
                      borderBottomWidth: t === contentType ? 5 : 0,
                      borderColor: primary_color,
                      alignItems: "center",
                    }}
                  >
                    <Text>{t}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            {comments?.map((comment) => {
              return (
                <CommentThread
                  key={comment.id}
                  data={comment}
                  level={0}
                  onLinkPress={() => {}}
                  op={user as RedditUser}
                />
              );
            })}
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default User;
