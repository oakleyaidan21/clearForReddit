import React, { useContext, memo, useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Modal } from "react-native";
import Text from "../components/Text";
import ImageViewer from "react-native-image-zoom-viewer";
import VideoPlayer from "react-native-video-controls";
import { Icon } from "react-native-elements";
import { Submission, Subreddit } from "snoowrap";
import MainNavigationContext from "../context/MainNavigationContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { defaultColor } from "../assets/styles/palettes";
import RedditMD from "./RedditMD";
import ClearContext from "../context/Clear";
import { getTimeSincePosted } from "../util/util";
import { getPostById } from "../util/snoowrap/snoowrapFunctions";
import { createThemedStyle } from "../assets/styles/mainStyles";

interface Props {
  data: Submission;
  onPress: any;
  inList: boolean;
  navigation: any;
  openPosts: boolean;
  setOpenPosts: any;
  selected: boolean;
  contentHeight?: number;
}

const PostItem: React.FC<Props> = (props) => {
  const [showImageViewer, setShowImageViewer] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);
  const [data, setData] = useState(props.data);
  const [postItemHeight, setPostItemHeight] = useState<number>(0);
  const [listOpenPost, setListOpenPost] = useState<boolean>(false);

  useEffect(() => {
    setData(props.data);
  }, [props.data.id]);

  const { inList } = props;

  const imgUrl = data.thumbnail;

  const useIcon =
    data.thumbnail === "self" ||
    data.thumbnail === "spoiler" ||
    data.thumbnail === "default";

  const isSelf = data.selftext !== "";
  const isImage = data.url.includes(".jpg") || data.url.includes(".png");
  const isVideo = data.url.includes("v.redd.it");
  const isGif = data.url.includes(".gif");
  const isImgur = data.url.includes("imgur") && data.url.includes("gifv");
  const isLink = !isImage && !isVideo && !isGif && !isSelf;

  const { currentSub, setCurrentSub, updateCurrentPosts, theme } = useContext(
    MainNavigationContext
  );

  const s = createThemedStyle(theme);

  const context: any = useContext(ClearContext);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  const getPostData = async () => {
    getPostById(context.clear.snoowrap, data.id)
      ?.fetch()
      .then((post) => {
        setData(post);
      });
  };

  const showContent = props.openPosts || listOpenPost;

  return (
    <View
      style={{ borderColor: primary_color, borderBottomWidth: inList ? 0 : 2 }}
    >
      {/* IMAGE VIEWER MODAL */}
      <Modal
        visible={showImageViewer}
        transparent={false}
        animationType="none"
        onRequestClose={() => setShowImageViewer(false)}
      >
        <ImageViewer
          imageUrls={[{ url: data.url }]}
          onSwipeDown={() => setShowImageViewer(false)}
          enableSwipeDown={true}
        />

        <TouchableOpacity
          style={{ position: "absolute", top: 40, left: 10 }}
          onPress={() => setShowImageViewer(false)}
        >
          <Icon name="close" color="white" />
        </TouchableOpacity>
      </Modal>
      {/* MAIN INFO */}
      <TouchableOpacity
        style={[
          s.postItemContainer,
          {
            margin: inList ? 10 : 0,
            borderRadius: inList ? 5 : 0,
            borderBottomLeftRadius: listOpenPost ? 0 : 5,
            borderBottomRightRadius: listOpenPost ? 0 : 5,
            borderColor: props.selected ? primary_color : "transparent",
          },
        ]}
        onLayout={(e) => setPostItemHeight(e.nativeEvent.layout.height)}
        disabled={!inList && isSelf}
        onPress={() => {
          if (props.inList) {
            props.onPress();
          } else {
            isLink
              ? props.navigation.navigate("Web", { url: data.url })
              : props.setOpenPosts();
          }
        }}
        onLongPress={() => {
          if (props.inList) {
            setListOpenPost(!listOpenPost);
          }
        }}
      >
        <TouchableOpacity
          style={[
            s.postItemIconContainer,
            { backgroundColor: useIcon ? primary_color : "transparent" },
          ]}
          disabled={inList}
          onPress={() => props.navigation.navigate("Web", { url: data.url })}
        >
          {useIcon ? (
            <Icon
              name="social-reddit"
              type="simple-line-icon"
              color="white"
              size={50}
              style={{ backgroundColor: primary_color }}
            />
          ) : (
            <Image
              source={{ uri: imgUrl }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
              }}
            />
          )}
        </TouchableOpacity>
        <View style={{ flex: 3 }}>
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={inList ? 3 : 10}
              style={{
                fontWeight: "bold",
                color: theme === "light" ? "black" : "white",
              }}
            >
              {data.title}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            {data.over_18 && <Text style={{ color: "red" }}>NSFW</Text>}
            <TouchableOpacity
              disabled={inList}
              onPress={() => {
                data.author.fetch().then((author) => {
                  console.log("author", author);
                  props.navigation.navigate("RedditUser", { author: author });
                });
              }}
            >
              <Text style={{ color: "grey" }}>{data.author.name}</Text>
            </TouchableOpacity>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Home");
                  context.clear?.snoowrap
                    ?.getSubreddit(data.subreddit.display_name)
                    .fetch()
                    .then((sub: Subreddit) => {
                      setCurrentSub(sub);
                    });
                }}
                disabled={inList}
              >
                <Text style={{ color: "grey", fontWeight: "bold" }}>
                  {data.subreddit_name_prefixed}
                </Text>
              </TouchableOpacity>

              <Text style={{ color: "grey" }}>
                {getTimeSincePosted(data.created_utc)}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 100,
          }}
        >
          <Icon
            name="arrow-up"
            type="simple-line-icon"
            size={15}
            onPress={() => data.upvote().then(() => getPostData())}
            color={
              data.likes ? "orange" : theme === "light" ? "black" : "white"
            }
          />
          <Text
            style={{
              margin: 10,
              color: theme === "light" ? "black" : "white",
              fontSize: 12,
            }}
          >
            {data.score}
          </Text>
          <Icon
            name="arrow-down"
            type="simple-line-icon"
            size={15}
            onPress={() => data.downvote().then(() => getPostData())}
            color={
              data.likes === false
                ? "purple"
                : theme === "light"
                ? "black"
                : "white"
            }
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          marginLeft: props.inList ? 10 : 0,
          marginRight: props.inList ? 10 : 0,
          borderBottomLeftRadius: props.inList ? 5 : 0,
          borderBottomRightRadius: props.inList ? 5 : 0,
          overflow: "hidden",
        }}
      >
        {isSelf && listOpenPost && (
          <RedditMD
            body={data.selftext}
            onLinkPress={(url: any, href: string) =>
              props.navigation.navigate("Web", { url: href })
            }
            styles={{
              body: {
                backgroundColor: theme === "light" ? "white" : "black",
                padding: 10,
                color: theme === "light" ? "black" : "white",
              },
            }}
          />
        )}
      </View>
      <View
        style={{
          marginLeft: props.inList ? 10 : 0,
          marginRight: props.inList ? 10 : 0,
          borderBottomLeftRadius: props.inList ? 5 : 0,
          borderBottomRightRadius: props.inList ? 5 : 0,
          overflow: "hidden",
        }}
      >
        {showContent &&
          (isImage || (isGif && !isImgur) ? (
            <TouchableWithoutFeedback onPress={() => setShowImageViewer(true)}>
              <Image
                source={{ uri: data.url }}
                style={{
                  height: props.contentHeight
                    ? props.contentHeight - postItemHeight + 50
                    : props.inList
                    ? 300
                    : 500,
                  backgroundColor: theme === "light" ? "white" : "black",
                }}
                resizeMode={"contain"}
              />
            </TouchableWithoutFeedback>
          ) : (
            (isVideo || isImgur) && (
              <View style={{ width: "100%" }}>
                <VideoPlayer
                  source={{
                    uri: isImgur
                      ? data.url.substring(0, data.url.length - 4) + "mp4"
                      : (data.media?.reddit_video?.hls_url as string),
                  }}
                  onError={(e: any) => console.log(e)}
                  paused={paused}
                  resizeMode="contain"
                  controls={false}
                  disableBack={true}
                  style={{
                    width: "100%",
                    height: props.contentHeight
                      ? props.contentHeight - postItemHeight + 50
                      : props.inList
                      ? 300
                      : 500,
                    backgroundColor: "black",
                  }}
                />
              </View>
            )
          ))}
      </View>
    </View>
  );
};

export default PostItem;
