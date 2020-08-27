import React, { useContext } from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import { Icon } from "react-native-elements";
import MainNavigationContext from "../context/MainNavigationContext";

const s = require("../assets/styles/mainStyles.js");

const SubPicker: React.FC = (props) => {
  return (
    <View style={s.subPickerBackdrop}>
      <View style={{ width: 300, padding: 10 }}>
        <Text>YAAAA</Text>
      </View>
    </View>
  );
};

export default SubPicker;
