import React, { useContext, useState } from "react";
import { View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import Text from "./Text";
import { defaultColor } from "../assets/styles/palettes";
import MainNavigationContext from "../context/MainNavigationContext";
import UserPicker from "./UserPicker";
import { Icon } from "react-native-elements";
import { createThemedStyle } from "../assets/styles/mainStyles";

type Props = {
  addUser: any;
  navigation: any;
};

const UserHeader: React.FC<Props> = (props) => {
  const { currentSub, user, theme } = useContext(MainNavigationContext);

  const [showUserPicker, setShowUserPicker] = useState<boolean>(false);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  const s = createThemedStyle(theme);

  return (
    <View style={[s.homeHeaderContainer, { borderColor: primary_color }]}>
      <UserPicker
        isVisible={showUserPicker}
        addUser={props.addUser}
        close={() => setShowUserPicker(false)}
      />
      <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
        <View style={[s.headerSubIcon, { borderColor: primary_color }]}>
          {user ? (
            <Image
              source={{ uri: user.icon_img }}
              style={{ width: "100%", height: "100%", borderRadius: 25 }}
            />
          ) : (
            <ActivityIndicator color={primary_color} />
          )}
        </View>

        <TouchableOpacity
          style={[s.headerDropdown, { borderColor: primary_color }]}
          onPress={() => setShowUserPicker(true)}
        >
          <Text
            style={{ maxWidth: 100, color: primary_color }}
            numberOfLines={1}
          >
            {user ? user.name : "Changing user..."}
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
      <TouchableOpacity>
        <Icon
          name="settings"
          color={primary_color}
          onPress={() => props.navigation.navigate("Settings")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default UserHeader;
