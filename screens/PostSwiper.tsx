import React, { useContext, useState } from "react";
import Swiper from "react-native-swiper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import MainNavigationContext from "../context/MainNavigationContext";
import Post from "./Post";
import { MainStackParamList } from "../navigation/mainNavigator";
import { Submission, Listing } from "snoowrap";

export type SwiperScreenNavProp = StackNavigationProp<
  MainStackParamList,
  "PostSwiper"
>;
type SwiperScreenRouteProp = RouteProp<MainStackParamList, "PostSwiper">;

type Props = {
  navigation: SwiperScreenNavProp;
  route: SwiperScreenRouteProp;
};

const PostSwiper: React.FC<Props> = (props) => {
  const { updateCurrentPosts, currentPosts } = useContext(
    MainNavigationContext
  );

  const [openPosts, setOpenPosts] = useState<boolean>(false);

  return (
    currentPosts && (
      <Swiper
        loadMinimal={true}
        showsPagination={false}
        index={props.route.params.index}
        loop={false}
        onIndexChanged={(index) => {
          if (currentPosts) {
            if (index === currentPosts.length - 1) {
              (currentPosts as any)
                .fetchMore({ amount: 25, append: true })
                .then((list: Listing<Submission>) => {
                  if (props.route.params.searchResults.length === 0) {
                    updateCurrentPosts(list);
                  }
                });
            }
          }
        }}
      >
        {currentPosts &&
          currentPosts.map((post, index) => (
            <Post
              key={post.id + index.toString()}
              data={post}
              navigation={props.navigation}
              route={null}
              openPosts={openPosts}
              setOpenPosts={() => setOpenPosts(!openPosts)}
            />
          ))}
      </Swiper>
    )
  );
};

export default PostSwiper;
