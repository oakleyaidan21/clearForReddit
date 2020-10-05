import React, { useState, useContext, useEffect } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Text from "../components/Text";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { MainStackParamList } from "../navigation/mainNavigator";
import MainNavigationContext from "../context/MainNavigationContext";
import PostItem from "../components/PostItem";
import { Comment, Submission } from "snoowrap";
import { getPostById } from "../util/snoowrap/snoowrapFunctions";
import ClearContext from "../context/Clear";
import { SwiperScreenNavProp } from "./PostSwiper";
import CommentThread from "../components/CommentThread";
import { defaultColor } from "../assets/styles/palettes";
import { createThemedStyle } from "../assets/styles/mainStyles";

type PostScreenNavProp = StackNavigationProp<MainStackParamList, "Post">;

type PostScreenRouteProp = RouteProp<MainStackParamList, "Post">;

type Props = {
  navigation: PostScreenNavProp | SwiperScreenNavProp;
  route: PostScreenRouteProp | null;
  data: Submission;
  openPosts: boolean;
  setOpenPosts: any;
};

const Post: React.FC<Props> = (props) => {
  const [comments, setComments] = useState<null | Array<Comment>>(null);
  const [refreshingPost, setRefreshingPost] = useState<boolean>(false);
  const [data, setData] = useState<Submission>(
    props.route?.params ? props.route.params.data : props.data
  );

  const [postHeight, setPostHeight] = useState<number>(0);

  const context: any = useContext(ClearContext);

  const { theme } = useContext(MainNavigationContext);

  const s = createThemedStyle(theme);

  useEffect(() => {
    setData(props.data);
    new Promise((resolve) => {
      setComments(null);
      resolve();
    }).then(async () => {
      const comments = await props.data.comments.fetchMore({
        amount: 10,
      });
      setComments(comments);
    });
  }, [props.data?.id]);

  useEffect(() => {
    //get comments
    getComments();
  }, []);

  const { currentSub } = useContext(MainNavigationContext);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

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
      });
  };

  const refreshPost = () => {
    Promise.all([getComments(), getPostData()]).then(() =>
      setRefreshingPost(false)
    );
  };

  return data ? (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "light" ? "#ebebeb" : "#202020",
      }}
      onLayout={(e) => setPostHeight(e.nativeEvent.layout.height)}
    >
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
          contentHeight={postHeight - 50}
          setOpenPosts={
            props.setOpenPosts
              ? props.setOpenPosts
              : console.log("not implemented yet...")
          }
          selected={false}
        />
        {/* OTHER POST FUNCTIONS */}
        {/* COMMENTS */}
        <View>
          {comments ? (
            comments.length > 0 ? (
              comments.map((comment: Comment) => {
                return (
                  <CommentThread
                    data={comment}
                    theme={theme}
                    key={comment.id}
                    level={0}
                    op={data.author}
                    navigation={props.navigation}
                    onLinkPress={(url: any, href: string) =>
                      props.navigation.navigate("Web", { url: href })
                    }
                  />
                );
              })
            ) : (
              <View
                style={{
                  height: 200,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "grey" }}>No Comments</Text>
              </View>
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
  ) : null;
};

export default Post;
