import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import MainNavigationContext from "../context/MainNavigationContext";
import { Icon } from "react-native-elements";
import SubPicker from "./SubPicker";
import CategoryPicker from "./CategoryPicker";
import TimeframePicker from "./TimeframePicker";
import { defaultColor } from "../assets/styles/palettes";

const s = require("../assets/styles/mainStyles");

const HomeListHeader: React.FC = (props) => {
  const [showSubPicker, setShowSubPicker] = useState<boolean>(false);
  const [showCatPicker, setShowCatPicker] = useState<boolean>(false);
  const [showTimeframePicker, setShowTimeframePicker] = useState<boolean>(
    false
  );
  const [categoryLocation, setCategoryLocation] = useState<number>(0);
  const [preciseLocation, setPreciseLocation] = useState<number>(0);

  const { currentSub, currentCategory, currentTimeframe } = useContext(
    MainNavigationContext
  );

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  return (
    <View style={[s.homeHeaderContainer, { borderColor: primary_color }]}>
      <SubPicker
        isVisible={showSubPicker}
        close={() => setShowSubPicker(false)}
      />
      <CategoryPicker
        isVisible={showCatPicker}
        close={() => setShowCatPicker(false)}
        xPos={categoryLocation}
        pad={preciseLocation}
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
        {currentSub.icon_img ? (
          <Image
            source={{ uri: currentSub.icon_img }}
            style={[s.headerSubIcon, { borderColor: primary_color }]}
          />
        ) : (
          <Icon
            name={
              currentSub === "Search Results" ? "magnifier" : "social-reddit"
            }
            type="simple-line-icon"
            color="white"
            backgroundColor={primary_color}
            style={{
              ...s.headerSubIcon,
              justifyContent: "center",
              borderColor: primary_color,
            }}
          />
        )}
        <View style={[s.headerDropdown, { borderColor: primary_color }]}>
          <Text
            style={{ maxWidth: 100, color: primary_color }}
            numberOfLines={1}
          >
            {currentSub.display_name ? currentSub.display_name : currentSub}
          </Text>
          <Icon
            name="arrow-down"
            color={primary_color}
            type="simple-line-icon"
            size={13}
            style={{ marginLeft: 10 }}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        onLayout={(e) => setCategoryLocation(e.nativeEvent.layout.x)}
      >
        <TouchableOpacity
          style={[
            s.headerDropdown,
            { borderColor: primary_color, marginRight: 10 },
          ]}
          onPress={() => setShowCatPicker(!showCatPicker)}
          onLayout={(e) => setPreciseLocation(e.nativeEvent.layout.x)}
        >
          <Text style={{ color: primary_color }}>{currentCategory}</Text>
          <Icon
            name="arrow-down"
            color={primary_color}
            type="simple-line-icon"
            size={13}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.headerDropdown, { borderColor: primary_color }]}
          onPress={() => setShowTimeframePicker(!showTimeframePicker)}
        >
          <Text style={{ color: primary_color }}>
            {currentTimeframe.charAt(0).toUpperCase() +
              currentTimeframe.slice(1)}
          </Text>
          <Icon
            name="arrow-down"
            color={primary_color}
            type="simple-line-icon"
            size={13}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeListHeader;
