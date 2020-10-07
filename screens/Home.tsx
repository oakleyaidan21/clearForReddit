import React, { useContext, useState } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import { getGeneralPosts } from "../util/snoowrap/snoowrapFunctions";
import Text from "../components/Text";
import ClearContext from "../context/Clear";
import MainNavigationContext from "../context/MainNavigationContext";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../navigation/tabNavigator";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../navigation/mainNavigator";
import HomeListHeader from "../components/HomeListHeader";
import PostItem from "../components/PostItem";
import { Listing, Submission } from "snoowrap";
import { defaultColor } from "../assets/styles/palettes";
import SubModal from "../components/SubModal";

type HomeScreenNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, "Home">,
  StackNavigationProp<MainStackParamList>
>;
type HomeScreenRouteProp = RouteProp<TabParamList, "Home">;

type Props = {
  navigation: HomeScreenNavProps;
  route: HomeScreenRouteProp;
  scrollRef: any;
};

const Home: React.FC<Props> = (props) => {
  /**
   * *******STATE********
   */
  const [gettingPosts, setGettingPosts] = useState(false);
  const [showSubModal, setShowSubModal] = useState<boolean>(false);
  const clearContext: any = useContext(ClearContext);
  const {
    currentPosts,
    updateCurrentPosts,
    setCurrentSub,
    currentSub,
    currentCategory,
    theme,
  } = useContext(MainNavigationContext);
  const [openPosts, setOpenPosts] = useState<boolean>(false);

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
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "light" ? "#ebebeb" : "#202020",
        position: "relative",
      }}
    >
      <HomeListHeader showSubModal={() => setShowSubModal(true)} />
      {currentPosts ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {currentPosts.length > 0 ? (
            <FlatList
              ref={props.scrollRef}
              keyExtractor={(item, index) => item.id + index.toString()}
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
              data={currentPosts}
              onEndReached={() => {
                (currentPosts as any)
                  .fetchMore({ amount: 25, append: true })
                  .then((list: Listing<Submission>) => {
                    updateCurrentPosts(list);
                  });
              }}
              style={{ width: "100%", height: "100%" }}
              renderItem={({ item, index }) => (
                <View style={{ margin: 10, marginBottom: 0 }}>
                  <PostItem
                    data={item}
                    onPress={() =>
                      props.navigation.navigate("PostSwiper", {
                        index: index,
                        searchResults: [],
                      })
                    }
                    selected={false}
                    inList={true}
                    navigation={props.navigation}
                    openPosts={openPosts}
                    setOpenPosts={() => setOpenPosts(true)}
                  />
                </View>
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
          ) : (
            <Text>No results...</Text>
          )}
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color={primary_color} />
        </View>
      )}
      <SubModal
        isVisible={showSubModal}
        close={() => {
          setShowSubModal(false);
        }}
        updateSub={setCurrentSub}
        currentSub={currentSub}
        navigation={props.navigation}
      />
    </View>
  );
};

export default Home;
