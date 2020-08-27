import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { getHot } from "../util/snoowrap/snoowrapFunctions";
import ClearContext from "../context/Clear";
import MainNavigationContext from "../context/MainNavigationContext";

const s = require("../assets/styles/mainStyles");

const Home: React.FC = (props) => {
  /**
   * *******STATE********
   */
  const [gettingPosts, setGettingPosts] = useState(false);
  const clearContext: any = useContext(ClearContext);
  const { currentPosts, updateCurrentPosts } = useContext(
    MainNavigationContext
  );

  useEffect(() => {
    if (!__DEV__) {
      getMainPosts();
    }
  }, []);

  const getMainPosts = () => {
    console.log("getting main posts...");
    if (clearContext.clear) {
      getHot(clearContext.clear.snoowrap, "Front Page").then((posts) => {
        updateCurrentPosts(posts);
        setGettingPosts(false);
      });
    }
  };

  return (
    <View style={s.screen}>
      {currentPosts.length > 0 ? (
        <FlatList
          data={currentPosts}
          style={{ width: "100%", height: "100%" }}
          renderItem={({ item, index }) => {
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
      ) : (
        <View>
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
