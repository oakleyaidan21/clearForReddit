import React, { useState } from "react";
import { View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import Text from "../components/Text";
import { Subreddit } from "snoowrap";
import { defaultColor } from "../assets/styles/palettes";
import { Icon } from "react-native-elements";
import RedditMD from "./RedditMD";
import { ScrollView } from "react-native-gesture-handler";
import GeneralModal from "./GeneralModal";

const s = require("../assets/styles/mainStyles");

type Props = {
  currentSub: Subreddit;
  isVisible: boolean;
  close: any;
  updateSub: any;
  navigation: any;
};

const SubModal: React.FC<Props> = (props) => {
  const { currentSub } = props;

  /**
   * *******STATE********
   */
  const [changingSubStatus, setChangingSubStatus] = useState<boolean>(false);
  const iconUrl = currentSub.icon_img
    ? currentSub.icon_img
    : "https://img.favpng.com/4/2/8/computer-icons-reddit-logo-website-png-favpng-hMmUQ5KAUjd27EWLvNwpuvW5Q.jpg";
  const icon_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  const topImage = currentSub.banner_img;

  return (
    <GeneralModal
      {...props}
      disableClose={false}
      content={
        <View style={s.subModalContainer}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 10 }}
          >
            {topImage ? (
              <Image
                source={{ uri: topImage as string }}
                style={s.subModalHeader}
                resizeMode="stretch"
              />
            ) : (
              <View
                style={[s.subModalHeader, { backgroundColor: icon_color }]}
              />
            )}

            <View style={{ marginTop: 100 }}>
              {currentSub.icon_img ? (
                <Image
                  source={{ uri: iconUrl }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    borderWidth: 5,
                    backgroundColor: "white",
                    borderColor: icon_color,
                  }}
                />
              ) : (
                <Icon
                  name="social-reddit"
                  type="simple-line-icon"
                  color="white"
                  size={50}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    justifyContent: "center",
                    backgroundColor: icon_color,
                  }}
                />
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ margin: 10, fontWeight: "bold", fontSize: 28 }}>
                {currentSub.display_name}
              </Text>
              <Text>{currentSub.subscribers} subscribers</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setChangingSubStatus(true);
                if (currentSub.user_is_subscriber) {
                  currentSub.unsubscribe().then(() => {
                    currentSub.fetch().then((sub) => {
                      props.updateSub(sub);
                      setChangingSubStatus(false);
                    });
                  });
                } else {
                  currentSub.subscribe().then(() => {
                    currentSub.fetch().then((sub) => {
                      props.updateSub(sub);
                      setChangingSubStatus(false);
                    });
                  });
                }
              }}
              style={[s.subscribeButton, { backgroundColor: icon_color }]}
            >
              {changingSubStatus ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {currentSub.user_is_subscriber ? "Unsubscribe" : "Subscribe"}
                </Text>
              )}
            </TouchableOpacity>
            <RedditMD
              body={currentSub.description}
              onLinkPress={(url: any, href: string) => {
                props.close();
                props.navigation.navigate("Web", { url: href });
              }}
              styles={{ body: { color: "black" } }}
            />
          </ScrollView>
        </View>
      }
    ></GeneralModal>
  );
};

export default SubModal;
