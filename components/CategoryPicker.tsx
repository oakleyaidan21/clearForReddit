import React, { useContext } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import MainNavigationContext from "../context/MainNavigationContext";
import { defaultColor } from "../assets/styles/palettes";
import { createThemedStyle } from "../assets/styles/mainStyles";

const categories = ["Hot", "New", "Top", "Cont."];

interface Props {
  isVisible: boolean;
  close: any;
  xPos: number;
  pad: number;
}

const CategoryPicker: React.FC<Props> = (props) => {
  const { setCurrentCategory, currentSub, theme } = useContext(
    MainNavigationContext
  );

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  const s = createThemedStyle(theme);
  return (
    <Modal visible={props.isVisible} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={props.close}>
        <View style={{ width: "100%", height: "100%" }}>
          <TouchableWithoutFeedback>
            <View
              style={[
                s.categoryPickerContainer,
                {
                  left: props.xPos + props.pad - 37.5,
                  borderColor: primary_color,
                },
              ]}
            >
              {categories.map((cat, index) => {
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      s.categoryItem,
                      {
                        borderTopWidth: index === 0 ? 0 : 2,
                        borderColor: primary_color,
                      },
                    ]}
                    onPress={() => {
                      setCurrentCategory(cat);
                      props.close();
                    }}
                  >
                    <Text style={{ color: primary_color }}>{cat}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CategoryPicker;
