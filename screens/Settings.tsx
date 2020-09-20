import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import MainNavigationContext from "../context/MainNavigationContext";

const Settings: React.FC = (props) => {
  const { theme } = useContext(MainNavigationContext);

  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() =>
          dispatch({
            type: "SET_THEME",
            theme: theme === "light" ? "dark" : "light",
          })
        }
      >
        <Text>{theme}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
