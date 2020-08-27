import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MainNavigationContext from "../context/MainNavigationContext";
import { Icon } from "react-native-elements";
import SubPicker from "./SubPicker";

const s = require("../assets/styles/mainStyles");

const HomeListHeader: React.FC = (props) => {
  const [showSubPicker, setShowSubPicker] = useState(false);

  const { currentSub, currentCategory } = useContext(MainNavigationContext);

  const iconUrl = currentSub.icon_img
    ? currentSub.icon_img
    : "https://img.favpng.com/4/2/8/computer-icons-reddit-logo-website-png-favpng-hMmUQ5KAUjd27EWLvNwpuvW5Q.jpg";

  return (
    <View style={s.homeHeaderContainer}>
      <SubPicker
        isVisible={showSubPicker}
        close={() => setShowSubPicker(false)}
      />
      <TouchableOpacity
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
        }}
        onPress={() => setShowSubPicker(true)}
      >
        <Image source={{ uri: iconUrl }} style={s.headerSubIcon} />

        <Text>
          {currentSub.display_name ? currentSub.display_name : currentSub}
        </Text>
        <Icon name="expand-more" color="grey" />
      </TouchableOpacity>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity style={s.headerDropdown}>
            <Text>{currentCategory}</Text>
            <Icon name="expand-more" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity style={s.headerDropdown}>
            <Text>Time</Text>
            <Icon name="expand-more" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeListHeader;
