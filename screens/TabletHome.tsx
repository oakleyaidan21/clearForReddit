import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import MainNavigationContext from "../context/MainNavigationContext";
import { MainStackParamList } from "../navigation/mainNavigator";
import { TabParamList } from "../navigation/tabNavigator";
import PostSwiper from "./PostSwiper";
import HomeListHeader from "../components/HomeListHeader";
import PostItem from "../components/PostItem";
import Post from "./Post";
import { getGeneralPosts } from "../util/snoowrap/snoowrapFunctions";
import ClearContext from "../context/Clear";
import { defaultColor } from "../assets/styles/palettes";

type Props = any;

const TabletHome: React.FC<Props> = (props) => {
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const [openPosts, setOpenPosts] = useState<boolean>(false);
  const [gettingPosts, setGettingPosts] = useState<boolean>(false);

  const {
    currentPosts,
    currentSub,
    currentCategory,
    updateCurrentPosts,
  } = useContext(MainNavigationContext);

  const clearContext: any = useContext(ClearContext);

  const getMainPosts = () => {
    console.log("getting main posts...");
    if (clearContext.clear) {
      getGeneralPosts(
        clearContext.clear.snoowrap,
        currentSub,
        currentCategory,
        ""
      ).then((posts) => {
        updateCurrentPosts(posts);
        setGettingPosts(false);
      });
    }
  };

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  return (
    <View style={{ width: "100%", height: "100%", flexDirection: "row" }}>
      <View style={{ flex: 4 }}>
        <HomeListHeader showSubModal={() => {}} />
        {currentPosts ? (
          currentPosts.length > 0 ? (
            <FlatList
              keyExtractor={(item, index) => item.id + index.toString()}
              data={currentPosts}
              renderItem={({ item, index }) => (
                <PostItem
                  data={item}
                  onPress={() => {
                    setCurrentPostIndex(index);
                  }}
                  inList={true}
                  navigation={null}
                  openPosts={false}
                  selected={currentPostIndex === index}
                  setOpenPosts={() => {}}
                />
              )}
              refreshControl={
                <RefreshControl
                  onRefresh={() => {
                    setGettingPosts(true);
                    getMainPosts();
                  }}
                  refreshing={gettingPosts}
                />
              }
              ListFooterComponent={
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ color: "grey", marginBottom: 10 }}>
                    Getting more posts...
                  </Text>
                  <ActivityIndicator color={primary_color} />
                </View>
              }
            />
          ) : (
            <Text style={{ alignSelf: "center" }}>No posts...</Text>
          )
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator
              style={{ alignSelf: "center" }}
              color={primary_color}
            />
          </View>
        )}
      </View>
      <View style={{ flex: 6 }}>
        {currentPosts ? (
          <Post
            navigation={props.navigation}
            route={props.route}
            data={currentPosts[currentPostIndex]}
            openPosts={openPosts}
            setOpenPosts={() => setOpenPosts(!openPosts)}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator
              style={{ alignSelf: "center" }}
              color={primary_color}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default TabletHome;
