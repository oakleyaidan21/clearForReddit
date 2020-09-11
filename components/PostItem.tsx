import React, { useContext, memo, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import Text from "../components/Text";
import ImageViewer from "react-native-image-zoom-viewer";
import Video from "react-native-video";
import { Icon } from "react-native-elements";
import { Submission } from "snoowrap";
import MainNavigationContext from "../context/MainNavigationContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { defaultColor } from "../assets/styles/palettes";
import RedditMD from "./RedditMD";

const s = require("../assets/styles/mainStyles");

interface Props {
  data: Submission;
  onPress: any;
  inList: boolean;
  navigation: any;
  openPosts: boolean;
  setOpenPosts: any;
}

const PostItem: React.FC<Props> = (props) => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showImageViewer, setShowImageViewer] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);
  const { data, inList } = props;

  const imgUrl = data.thumbnail;

  const useIcon =
    data.thumbnail === "self" ||
    data.thumbnail === "spoiler" ||
    data.thumbnail === "default";

  const isSelf = data.selftext !== "";
  const isImage = data.url.includes(".jpg") || data.url.includes(".png");
  const isVideo = data.url.includes("v.redd.it");
  const isGif = data.url.includes(".gif");
  const isLink = !isImage && !isVideo && !isGif && !isSelf;

  const { currentSub } = useContext(MainNavigationContext);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

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
      <TouchableOpacity
        style={[
          s.postItemContainer,
          {
            borderColor: primary_color,
            margin: inList ? 10 : 0,
            borderRadius: inList ? 5 : 0,
            borderWidth: inList ? 2 : 0,
          },
        ]}
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
              style={{ fontWeight: "bold" }}
            >
              {data.title}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text style={{ color: "grey" }}>{data.author.name}</Text>
            <Text style={{ color: "grey", fontWeight: "bold" }}>
              {data.subreddit_name_prefixed}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            height: 100,
          }}
        >
          <Icon name="arrow-up" type="simple-line-icon" />
          <Text>{data.score}</Text>
          <Icon name="arrow-down" type="simple-line-icon" />
        </View>
      </TouchableOpacity>

      {isSelf && (!inList || showContent) && (
        <RedditMD
          body={data.selftext}
          onLinkPress={(url: any, href: string) =>
            props.navigation.navigate("Web", { url: href })
          }
          styles={{ body: { backgroundColor: "white", padding: 10 } }}
        />
      )}
      {props.openPosts &&
        (isImage ? (
          <TouchableWithoutFeedback onPress={() => setShowImageViewer(true)}>
            <Image
              source={{ uri: data.url }}
              style={{ height: 500, backgroundColor: "white" }}
              resizeMode={"contain"}
            />
          </TouchableWithoutFeedback>
        ) : isVideo ? (
          <View style={{ height: 300, width: "100%" }}>
            <Video
              source={{ uri: data.media?.reddit_video?.hls_url as string }}
              onError={(e: Error) => console.log(e)}
              onLoad={() => setShowVideo(true)}
              paused={paused}
              resizeMode="contain"
              controls={false}
              style={{ width: "100%", height: 300, backgroundColor: "black" }}
            />
            {!showVideo ? (
              <ActivityIndicator
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: 300,
                }}
                color="white"
                size="large"
              />
            ) : (
              <View
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
              >
                <Icon
                  name={paused ? "control-play" : "control-pause"}
                  type="simple-line-icon"
                  color="white"
                  onPress={() => setPaused(!paused)}
                />
              </View>
            )}
          </View>
        ) : (
          isGif && <Text>gifs currently not supported</Text>
        ))}
    </View>
  );
};

export default memo(PostItem);
