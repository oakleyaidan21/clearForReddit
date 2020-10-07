import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Share,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "./Text";
import { Icon } from "react-native-elements";
import { Submission } from "snoowrap";
import { defaultColor } from "../assets/styles/palettes";
import MainNavigationContext from "../context/MainNavigationContext";
import SlideModal from "./SlideModal";
import { createThemedStyle } from "../assets/styles/mainStyles";
import { getPostById } from "../util/snoowrap/snoowrapFunctions";
import ClearContext from "../context/Clear";

type Props = {
  data: Submission;
};

const PostBar: React.FC<Props> = (props) => {
  const [saving, setSaving] = useState<boolean>(false);
  const [showReplyModal, setShowReplyModal] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [data, setData] = useState<Submission>(props.data);
  const { currentSub, theme } = useContext(MainNavigationContext);
  const context: any = useContext(ClearContext);

  useEffect(() => {
    setData(props.data);
  }, [props.data.id]);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  const s = createThemedStyle(theme);

  const getPostData = async () => {
    getPostById(context.clear.snoowrap, data.id)
      ?.fetch()
      .then((post) => {
        setData(post);
        setSaving(false);
      });
  };

  const _renderModals = () => {
    return (
      <>
        {/* REPLY MODAL */}
        <SlideModal
          isVisible={showReplyModal}
          close={() => setShowReplyModal(false)}
        >
          <View style={s.replyModalContainer}>
            <Text>Reply Modal</Text>
          </View>
        </SlideModal>
        {/* REPORT MODAL */}
        <SlideModal
          isVisible={showReportModal}
          close={() => setShowReportModal(false)}
        >
          <View style={s.replyModalContainer}>
            <Text>Report Modal</Text>
          </View>
        </SlideModal>
      </>
    );
  };

  return (
    <>
      <View
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: primary_color,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity onPress={() => setShowReplyModal(true)}>
          <Icon name="action-redo" type="simple-line-icon" color="white" />
        </TouchableOpacity>
        {saving ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <TouchableOpacity
            onPress={() => {
              console.log(data.title);
              setSaving(true);
              if (data.saved) {
                data.unsave().then(() => getPostData());
              } else {
                data.save().then(() => getPostData());
              }
            }}
          >
            <Icon
              name="star"
              type="simple-line-icon"
              color={data.saved ? "yellow" : "white"}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setShowReportModal(true)}>
          <Icon name="flag" type="simple-line-icon" color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Share.share(
              {
                message: Platform.OS === "ios" ? data.title : data.url,
                url: data.url,
              },
              { dialogTitle: data.title }
            );
          }}
        >
          <Icon name="share" type="simple-line-icon" color="white" />
        </TouchableOpacity>
      </View>
      {_renderModals()}
    </>
  );
};

export default PostBar;
