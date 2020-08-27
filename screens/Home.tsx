import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { getHot, getGeneralPosts } from "../util/snoowrap/snoowrapFunctions";
import ClearContext from "../context/Clear";
import MainNavigationContext from "../context/MainNavigationContext";
import {
  BottomTabScreenProps,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { TabParamList } from "../navigation/tabNavigator";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../navigation/mainNavigator";
import HomeListHeader from "../components/HomeListHeader";

const s = require("../assets/styles/mainStyles");

type HomeScreenNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, "Home">,
  StackNavigationProp<MainStackParamList>
>;
type HomeScreenRouteProp = RouteProp<TabParamList, "Home">;

type Props = {
  navigation: HomeScreenNavProps;
  route: HomeScreenRouteProp;
};

const Home: React.FC<Props> = (props) => {
  /**
   * *******STATE********
   */
  const [gettingPosts, setGettingPosts] = useState(false);
  const clearContext: any = useContext(ClearContext);
  const {
    currentPosts,
    updateCurrentPosts,
    currentSub,
    currentCategory,
  } = useContext(MainNavigationContext);

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

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}>
      <HomeListHeader />
      {currentPosts.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={currentPosts}
            style={{ flex: 1 }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{ margin: 10 }}
                  onPress={() =>
                    props.navigation.navigate("Post", {
                      data: item,
                    })
                  }
                >
                  <Text numberOfLines={1}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
            refreshControl={
              <RefreshControl
                onRefresh={() => {
                  setGettingPosts(true);
                  getMainPosts();
                }}
                refreshing={gettingPosts}
              />
            }
          />
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={"large"} />
          <TouchableOpacity onPress={getMainPosts}>
            <Text>Get Posts</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Home;
