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

const sortingTypes = ["Best", "Top", "New", "Controversial"];

type Props = {
  isVisible: boolean;
  close: any;
  yPos: number;
  setType: any;
};

const CommentSortPicker: React.FC<Props> = (props) => {
  const { currentSub, theme } = useContext(MainNavigationContext);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  const s = createThemedStyle(theme);

  return (
    <Modal visible={props.isVisible} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={props.close}>
        <View
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={[
                s.timeframePickerContainer,
                { right: 5, top: props.yPos, borderColor: primary_color },
              ]}
            >
              {sortingTypes.map((t, index) => {
                return (
                  <TouchableOpacity
                    key={t}
                    style={[
                      s.categoryItem,
                      {
                        borderTopWidth: index === 0 ? 0 : 2,
                        borderColor: primary_color,
                      },
                    ]}
                    onPress={() => {
                      props.setType(t);
                      props.close();
                    }}
                  >
                    <Text style={{ color: primary_color }}>{t}</Text>
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

export default CommentSortPicker;
