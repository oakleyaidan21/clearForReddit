import React, { useContext, useState } from "react";
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
import { Listing } from "snoowrap";

const s = require("../assets/styles/mainStyles");

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

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

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
            style={{
              flex: 1,
              backgroundColor: "white",
            }}
            contentContainerStyle={{ alignItems: "center", padding: 10 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshingUser}
                onRefresh={() => {
                  setRefreshingUser(true);
                  user?.fetch().then((newUser) => {
                    setUser(newUser);
                    setRefreshingUser(false);
                  });
                }}
              />
            }
          >
            <View style={{ width: "100%", flexDirection: "row" }}>
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
            <TouchableOpacity
              onPress={() =>
                user?.getComments().then((comments: any) => {
                  setComments(comments);
                })
              }
            >
              <Text>get comments</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default User;
