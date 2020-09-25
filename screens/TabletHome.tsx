import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import MainNavigationContext from "../context/MainNavigationContext";
import HomeListHeader from "../components/HomeListHeader";
import PostItem from "../components/PostItem";
import Post from "./Post";
import { getGeneralPosts } from "../util/snoowrap/snoowrapFunctions";
import ClearContext from "../context/Clear";
import { defaultColor } from "../assets/styles/palettes";
import { Listing, Submission } from "snoowrap";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { createThemedStyle } from "../assets/styles/mainStyles";
import SubModal from "../components/SubModal";

type Props = any;

const TabletHome: React.FC<Props> = (props) => {
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const [openPosts, setOpenPosts] = useState<boolean>(false);
  const [gettingPosts, setGettingPosts] = useState<boolean>(false);
  const [showSubModal, setShowSubModal] = useState<boolean>(false);

  const scrollRef = useRef<any>();

  const {
    currentPosts,
    currentSub,
    currentCategory,
    updateCurrentPosts,
    theme,
    setCurrentSub,
  } = useContext(MainNavigationContext);

  const clearContext: any = useContext(ClearContext);

  useEffect(() => {
    scrollRef.current.scrollToIndex({
      animated: true,
      index: currentPostIndex,
      viewPosition: 0.5,
    });
  }, [currentPostIndex]);

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

  const s = createThemedStyle(theme);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "row",
        backgroundColor: theme === "light" ? "#ebebeb" : "#202020",
      }}
    >
      <View style={{ flex: 2 }}>
        <HomeListHeader showSubModal={() => setShowSubModal(true)} />
        {currentPosts ? (
          currentPosts.length > 0 ? (
            <FlatList
              keyExtractor={(item, index) => item.id + index.toString()}
              data={currentPosts}
              ref={scrollRef}
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
              onEndReached={() => {
                (currentPosts as any)
                  .fetchMore({ amount: 25, append: true })
                  .then((list: Listing<Submission>) => {
                    updateCurrentPosts(list);
                  });
              }}
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
      <View
        style={{ flex: 3, borderLeftWidth: 2, borderLeftColor: primary_color }}
      >
        {currentPosts ? (
          <View style={{ flex: 1, position: "relative" }}>
            <Post
              navigation={props.navigation}
              route={props.route}
              data={currentPosts[currentPostIndex]}
              openPosts={openPosts}
              setOpenPosts={() => setOpenPosts(!openPosts)}
            />
            <View style={{ position: "absolute", bottom: 10, right: 10 }}>
              <TouchableOpacity
                style={[
                  s.postControlButton,
                  { backgroundColor: primary_color },
                ]}
                onPress={() => setCurrentPostIndex(currentPostIndex - 1)}
              >
                <Icon name="chevron-left" color={"white"} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  s.postControlButton,
                  { backgroundColor: primary_color },
                ]}
                onPress={() => setCurrentPostIndex(currentPostIndex + 1)}
              >
                <Icon name="chevron-right" color={"white"} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator
              style={{ alignSelf: "center" }}
              color={primary_color}
            />
          </View>
        )}
      </View>
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

export default TabletHome;
