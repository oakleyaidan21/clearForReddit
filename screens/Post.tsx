import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { MainStackParamList } from "../navigation/mainNavigator";
import MainNavigationContext from "../context/MainNavigationContext";
import { Icon } from "react-native-elements";
import PostItem from "../components/PostItem";
import { Comment, Submission } from "snoowrap";
import { getPostById } from "../util/snoowrap/snoowrapFunctions";
import ClearContext from "../context/Clear";
import { SwiperScreenNavProp } from "./PostSwiper";
import CommentThread from "../components/CommentThread";

type PostScreenNavProp = StackNavigationProp<MainStackParamList, "Post">;

type PostScreenRouteProp = RouteProp<MainStackParamList, "Post">;

type Props = {
  navigation: PostScreenNavProp | SwiperScreenNavProp;
  route: PostScreenRouteProp | null;
  data: Submission;
  openPosts: boolean;
  setOpenPosts: any;
};

const s = require("../assets/styles/mainStyles");

const Post: React.FC<Props> = (props) => {
  const [comments, setComments] = useState<null | Array<Comment>>(null);
  const [refreshingPost, setRefreshingPost] = useState<boolean>(false);
  const [data, setData] = useState<Submission>(
    props.route?.params.data ? props.route.params.data : props.data
  );
  const [saving, setSaving] = useState<boolean>(false);

  const context: any = useContext(ClearContext);

  useEffect(() => {
    //get comments
    getComments();
  }, []);

  const getComments = async () => {
    const comments = await data.comments.fetchMore({
      amount: 10,
    });
    setComments(comments);
  };

  const getPostData = async () => {
    getPostById(context.clear.snoowrap, data.id)
      ?.fetch()
      .then((post) => {
        setData(post);
        setSaving(false);
      });
  };

  const refreshPost = () => {
    Promise.all([getComments(), getPostData()]).then(() =>
      setRefreshingPost(false)
    );
  };

  const { currentSub } = useContext(MainNavigationContext);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : "rgb(243,68,35)";

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshingPost}
            onRefresh={() => {
              setRefreshingPost(true);
              refreshPost();
            }}
          />
        }
      >
        {/* MAIN POST HEADER */}
        <PostItem
          data={data}
          onPress={() => {}}
          inList={false}
          navigation={props.navigation}
          openPosts={props.openPosts}
          setOpenPosts={props.setOpenPosts}
        />
        {/* OTHER POST FUNCTIONS */}
        <View
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity>
            <Icon name="action-redo" type="simple-line-icon" />
          </TouchableOpacity>
          {saving ? (
            <ActivityIndicator color={primary_color} />
          ) : (
            <TouchableOpacity
              onPress={() => {
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
                color={data.saved ? "yellow" : "black"}
              />
            </TouchableOpacity>
          )}

          <Icon name="flag" type="simple-line-icon" />
          <Icon name="share" type="simple-line-icon" />
        </View>
        {/* COMMENTS */}
        <View style={{ padding: 10 }}>
          {comments ? (
            comments.length > 0 ? (
              comments.map((comment: Comment) => {
                return (
                  <CommentThread data={comment} key={comment.id} level={0} />
                );
              })
            ) : (
              <Text style={{ marginTop: 200 }}>No Comments</Text>
            )
          ) : (
            <ActivityIndicator
              style={{ marginTop: 200 }}
              color={primary_color}
              size={"large"}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Post;
