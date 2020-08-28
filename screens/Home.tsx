import React, { useContext, useState } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import { getGeneralPosts } from "../util/snoowrap/snoowrapFunctions";
import ClearContext from "../context/Clear";
import MainNavigationContext from "../context/MainNavigationContext";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../navigation/tabNavigator";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../navigation/mainNavigator";
import HomeListHeader from "../components/HomeListHeader";
import PostItem from "../components/PostItem";

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

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : "rgb(243,68,35)";

  return (
    <View style={{ flex: 1 }}>
      <HomeListHeader />
      {currentPosts.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={currentPosts}
            style={{ flex: 1 }}
            renderItem={({ item }) => (
              <PostItem
                data={item}
                onPress={() =>
                  props.navigation.navigate("Post", { data: item })
                }
                inList={true}
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
          />
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color={primary_color} />
        </View>
      )}
    </View>
  );
};

export default Home;
