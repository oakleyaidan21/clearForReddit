import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import MainNavigationContext from "../context/MainNavigationContext";
import { defaultColor } from "../assets/styles/palettes";

type Props = {
  navigation: any;
};

const Header: React.FC<Props> = (props) => {
  const { currentSub } = useContext(MainNavigationContext);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  return (
    <View
      style={{
        width: "100%",
        height: 60,
        backgroundColor: primary_color,
        padding: 10,
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
      >
        <Icon name="arrow-back" color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
