import React, { useContext } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Icon } from "react-native-elements";
import { Submission } from "snoowrap";
import MainNavigationContext from "../context/MainNavigationContext";

const s = require("../assets/styles/mainStyles");

interface Props {
  data: Submission;
  navigation: { navigate: any };
}

const PostListItem: React.FC<Props> = (props) => {
  const { data } = props;

  const imgUrl =
    data.thumbnail === "self" ||
    data.thumbnail === "spoiler" ||
    data.thumbnail === "default"
      ? "https://images-na.ssl-images-amazon.com/images/I/517hFQrVifL._AC_SY355_.jpg"
      : data.thumbnail;

  const useIcon =
    data.thumbnail === "self" ||
    data.thumbnail === "spoiler" ||
    data.thumbnail === "default";

  const { currentSub } = useContext(MainNavigationContext);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : "rgb(243,68,35)";

  return (
    <TouchableOpacity
      style={[s.postListItemContainer, { borderColor: primary_color }]}
      onPress={() => props.navigation.navigate("Post", { data: data })}
    >
      {useIcon ? (
        <View
          style={[s.postItemIconContainer, { backgroundColor: primary_color }]}
        >
          <Icon
            name="social-reddit"
            type="simple-line-icon"
            color="white"
            size={50}
          />
        </View>
      ) : (
        <Image
          source={{ uri: imgUrl }}
          style={{ width: 100, height: 100, borderRadius: 5, marginRight: 10 }}
        />
      )}
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={2} style={{ fontWeight: "bold" }}>
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
        }}
      >
        <Icon name="arrow-up" type="simple-line-icon" />
        <Text>{data.score}</Text>
        <Icon name="arrow-down" type="simple-line-icon" />
      </View>
    </TouchableOpacity>
  );
};

export default PostListItem;
