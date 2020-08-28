import React, { useContext } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Icon } from "react-native-elements";
import { Submission } from "snoowrap";

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

  return (
    <TouchableOpacity
      style={s.postListItemContainer}
      onPress={() => props.navigation.navigate("Post", { data: data })}
    >
      <Image
        source={{ uri: imgUrl }}
        style={{ width: 100, height: 100, borderRadius: 5, marginRight: 10 }}
      />
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={2}>{data.title}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{data.subreddit_name_prefixed}</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Icon name="arrow-up" type="evilicon" size={40} />
        <Text>{data.score}</Text>
        <Icon name="arrow-down" type="evilicon" size={40} />
      </View>
    </TouchableOpacity>
  );
};

export default PostListItem;
