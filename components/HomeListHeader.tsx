import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import MainNavigationContext from "../context/MainNavigationContext";
import { Icon } from "react-native-elements";
import SubPicker from "./SubPicker";
import CategoryPicker from "./CategoryPicker";
import TimeframePicker from "./TimeframePicker";

const s = require("../assets/styles/mainStyles");

const HomeListHeader: React.FC = (props) => {
  const [showSubPicker, setShowSubPicker] = useState(false);
  const [showCatPicker, setShowCatPicker] = useState(false);
  const [showTimeframePicker, setShowTimeframePicker] = useState(false);
  const [categoryLocation, setCategoryLocation] = useState(0);

  const { currentSub, currentCategory, currentTimeframe } = useContext(
    MainNavigationContext
  );

  const iconUrl = currentSub.icon_img
    ? currentSub.icon_img
    : "https://img.favpng.com/4/2/8/computer-icons-reddit-logo-website-png-favpng-hMmUQ5KAUjd27EWLvNwpuvW5Q.jpg";

  return (
    <View style={s.homeHeaderContainer}>
      <SubPicker
        isVisible={showSubPicker}
        close={() => setShowSubPicker(false)}
      />
      <CategoryPicker
        isVisible={showCatPicker}
        close={() => setShowCatPicker(false)}
        xPos={categoryLocation}
      />
      <TimeframePicker
        isVisible={showTimeframePicker}
        close={() => setShowTimeframePicker(false)}
        xPos={categoryLocation}
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
        <Text style={{ maxWidth: 100 }} numberOfLines={1}>
          {currentSub.display_name ? currentSub.display_name : currentSub}
        </Text>
        <Icon name="expand-more" color="grey" />
      </TouchableOpacity>
      <View
        style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
        onLayout={(e) => setCategoryLocation(e.nativeEvent.layout.x)}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            style={s.headerDropdown}
            onPress={() => setShowCatPicker(!showCatPicker)}
          >
            <Text style={{ color: "grey" }}>{currentCategory}</Text>
            <Icon name="expand-more" color={"grey"} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            style={s.headerDropdown}
            onPress={() => setShowTimeframePicker(!showTimeframePicker)}
          >
            <Text style={{ color: "grey" }}>
              {currentTimeframe.charAt(0).toUpperCase() +
                currentTimeframe.slice(1)}
            </Text>
            <Icon name="expand-more" color={"grey"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeListHeader;
