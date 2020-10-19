import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MainNavigationContext from "../context/MainNavigationContext";
import { Icon } from "react-native-elements";
import SubPicker from "./SubPicker";
import CategoryPicker from "./CategoryPicker";
import { defaultColor } from "../assets/styles/palettes";
import { createThemedStyle } from "../assets/styles/mainStyles";

type Props = {
  showSubModal: any;
};

const HomeListHeader: React.FC<Props> = (props) => {
  const [showSubPicker, setShowSubPicker] = useState<boolean>(false);
  const [showCatPicker, setShowCatPicker] = useState<boolean>(false);
  const [categoryLocation, setCategoryLocation] = useState<number>(0);

  const { currentSub, currentCategory, currentTimeframe, theme } = useContext(
    MainNavigationContext
  );

  console.log(categoryLocation);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  const s = createThemedStyle(theme);

  const renderStaticIcon = (type: string) => {
    switch (currentSub) {
      case "Front Page": {
        return "newspaper";
      }
      case "Saved": {
        return "star";
      }
      case "Popular": {
        return "fire";
      }
      case "Search Results": {
        return "magnifier";
      }
      default: {
        return "social-reddit";
      }
    }
  };

  return (
    <View
      style={[s.homeHeaderContainer, { borderColor: primary_color }]}
      onLayout={(e) => setCategoryLocation(e.nativeEvent.layout.width)}
    >
      <SubPicker
        isVisible={showSubPicker}
        close={() => setShowSubPicker(false)}
      />
      <CategoryPicker
        isVisible={showCatPicker}
        close={() => setShowCatPicker(false)}
        xPos={categoryLocation}
      />
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          disabled={!currentSub.display_name}
          onPress={props.showSubModal}
        >
          {currentSub.icon_img ? (
            <Image
              source={{ uri: currentSub.icon_img }}
              style={[s.headerSubIcon, { borderColor: primary_color }]}
            />
          ) : (
            <Icon
              name={renderStaticIcon(currentSub)}
              type={
                renderStaticIcon(currentSub) === "newspaper"
                  ? "font-awesome-5"
                  : "simple-line-icon"
              }
              color="white"
              backgroundColor={primary_color}
              style={{
                ...s.headerSubIcon,
                justifyContent: "center",
                borderColor: primary_color,
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.headerDropdown, { borderColor: primary_color }]}
          onPress={() => setShowSubPicker(true)}
        >
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
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={[s.headerDropdown, { borderColor: primary_color }]}
          onPress={() => setShowCatPicker(!showCatPicker)}
        >
          <Text style={{ color: primary_color }}>
            {currentCategory === "Top" || currentSub === "Category"
              ? currentCategory + " of " + currentTimeframe
              : currentCategory}
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
