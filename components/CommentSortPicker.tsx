import React, { useContext } from "react";
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Text from "./Text";
import { createThemedStyle } from "../assets/styles/mainStyles";
import { defaultColor } from "../assets/styles/palettes";
import MainNavigationContext from "../context/MainNavigationContext";

const sortingTypes = ["Top", "Best", "New", "Cont."];

type Props = {
  setType: any;
  type: string;
};

const CommentSortPicker: React.FC<Props> = (props) => {
  const { currentSub, theme } = useContext(MainNavigationContext);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  const s = createThemedStyle(theme);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
        flexDirection: "row",
        paddingLeft: 10,
        height: "100%",
      }}
    >
      {sortingTypes.map((type) => {
        return (
          <TouchableOpacity
            key={type}
            style={{
              borderBottomWidth: props.type === type ? 2 : 0,
              justifyContent: "center",
              borderColor: "white",
            }}
            onPress={() => props.setType(type)}
          >
            <Text
              style={{
                color: "white",
                fontWeight: props.type === type ? "bold" : "normal",
              }}
            >
              {type}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CommentSortPicker;
