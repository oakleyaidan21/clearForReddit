import React, { useContext, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import Text from "../components/Text";
import { useSelector } from "react-redux";
import MainNavigationContext from "../context/MainNavigationContext";
import { defaultColor } from "../assets/styles/palettes";
import UserHeader from "../components/UserHeader";
import CommentThread from "../components/CommentThread";
import { Comment, Listing, RedditUser, Submission } from "snoowrap";
import PostItem from "../components/PostItem";
import { createThemedStyle } from "../assets/styles/mainStyles";
import GeneralModal from "../components/GeneralModal";
import Login from "./Login";

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
  route: any;
}

const User: React.FC<Props> = (props) => {
  const { user, setUser, currentSub, theme } = useContext(
    MainNavigationContext
  );
  const userToView: RedditUser = props.route.params
    ? props.route.params.author
    : user;

  const isClient = props.route.params ? false : true;
  /**
   * *********REDUX********
   */
  const { users } = useSelector((state: any) => state);

  /**
   * ********STATE********
   */

  const [refreshingUser, setRefreshingUser] = useState<boolean>(false);
  const [comments, setComments] = useState<Listing<Comment>>();
  const [posts, setPosts] = useState<Listing<Submission>>();
  const [contentType, setContentType] = useState<String>("Comments");
  const [openPosts, setOpenPosts] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  const getUserComments = () => {
    userToView?.getComments().then((comments: any) => {
      setComments(comments);
    });
  };

  const getUserPosts = () => {
    userToView?.getSubmissions().then((submissions: Listing<Submission>) => {
      setPosts(submissions);
    });
  };

  const s = createThemedStyle(theme);

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
    if (userToView) {
      getContentType();
    }
  }, [userToView]);

  const _renderContent = () => {
    switch (contentType) {
      case "Comments": {
        return comments?.map((comment) => {
          return (
            <CommentThread
              key={comment.id}
              theme={theme}
              data={comment}
              level={0}
              onLinkPress={() => {}}
              navigation={props.navigation}
              op={userToView as RedditUser}
            />
          );
        });
      }
      // TO-DO: the rest of these views
      case "Posts": {
        return posts?.map((post) => {
          return (
            <PostItem
              key={post.id}
              selected={false}
              data={post}
              navigation={props.navigation}
              inList={true}
              onPress={() => {
                props.navigation.navigate("Post", { data: post });
              }}
              openPosts={openPosts}
              setOpenPosts={() => setOpenPosts(!openPosts)}
            />
          );
        });
      }
      default: {
        return <Text>TO-DO: {contentType}</Text>;
      }
    }
  };

  return (
    <>
      <GeneralModal
        title="Login"
        isVisible={showLogin}
        close={() => setShowLogin(false)}
        disableClose={false}
        content={
          <View style={{ width: "100%", height: 400, alignSelf: "center" }}>
            <Login
              navigation={props.navigation}
              close={() => setShowLogin(false)}
            />
          </View>
        }
      />
      <View
        style={{
          flex: 1,
          backgroundColor: theme === "light" ? "#ebebeb" : "#202020",
        }}
      >
        {users !== "[]" && isClient && (
          <UserHeader
            addUser={() => setShowLogin(true)}
            navigation={props.navigation}
          />
        )}
        {users === "[]" && isClient ? (
          <View
            style={{
              flex: 1,
              backgroundColor: theme === "light" ? "white" : "black",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                textAlign: "center",
                color: theme === "light" ? "black" : "white",
              }}
            >
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
              onPress={() => setShowLogin(true)}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            style={{ flex: 1, width: "100%" }}
            refreshControl={
              <RefreshControl
                refreshing={refreshingUser}
                onRefresh={() => {
                  setRefreshingUser(true);
                  userToView?.fetch().then((newUser: any) => {
                    setRefreshingUser(false);
                    getContentType();
                  });
                }}
              />
            }
            stickyHeaderIndices={[isClient ? 1 : 2]}
          >
            {!isClient && (
              <View
                style={{
                  backgroundColor: theme === "light" ? "white" : "black",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: userToView.icon_img }}
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: primary_color,
                    borderRadius: 25,
                    margin: 10,
                  }}
                />
                <Text style={{ color: theme === "light" ? "black" : "white" }}>
                  {userToView.name}
                </Text>
              </View>
            )}
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                backgroundColor: theme === "light" ? "white" : "black",
              }}
            >
              <View style={[s.karmaBox, { borderColor: primary_color }]}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    color: theme === "light" ? "black" : "white",
                  }}
                >
                  LINK
                </Text>
                <Text style={{ color: theme === "light" ? "black" : "white" }}>
                  {userToView?.link_karma}
                </Text>
              </View>
              <View style={[s.karmaBox, { borderColor: primary_color }]}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    color: theme === "light" ? "black" : "white",
                  }}
                >
                  COMMENT
                </Text>
                <Text style={{ color: theme === "light" ? "black" : "white" }}>
                  {userToView?.comment_karma}
                </Text>
              </View>
            </View>
            <ScrollView
              style={{
                width: "100%",
                height: 50,
                borderColor: primary_color,
                borderBottomWidth: 2,
                backgroundColor: theme === "light" ? "white" : "black",
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
                    onPress={() => {
                      setContentType(t);
                    }}
                    style={{
                      width: 100,
                      height: 50,
                      justifyContent: "center",
                      borderBottomWidth: t === contentType ? 5 : 0,
                      borderColor: primary_color,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{ color: theme === "light" ? "black" : "white" }}
                    >
                      {t}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            {userToView && _renderContent()}
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default User;
