import React, { useContext, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import MainNavigationContext from "../context/MainNavigationContext";
import { defaultColor } from "../assets/styles/palettes";
import { createThemedStyle } from "../assets/styles/mainStyles";

const categories = ["Hot", "New", "Top", "Cont."];
const times = ["hour", "day", "week", "month", "year", "all"];

interface Props {
  isVisible: boolean;
  close: any;
  xPos: number;
}

const CategoryPicker: React.FC<Props> = (props) => {
  const {
    setCurrentCategory,
    currentSub,
    theme,
    setCurrentTimeframe,
  } = useContext(MainNavigationContext);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  const [showTimes, setShowTimes] = useState<null | string>(null);

  const s = createThemedStyle(theme);
  return (
    <Modal visible={props.isVisible} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback
        onPress={() => {
          setShowTimes(null);
          props.close();
        }}
      >
        <View style={{ width: "100%", height: "100%" }}>
          <TouchableWithoutFeedback>
            <View
              style={[
                s.categoryPickerContainer,
                {
                  left: props.xPos - 160,
                  borderColor: primary_color,
                },
              ]}
            >
              {categories.map((cat, index) => {
                return (
                  <TouchableOpacity
                    key={cat}
                    disabled={showTimes !== null}
                    style={[
                      s.categoryItem,
                      {
                        borderTopWidth: index === 0 ? 0 : 2,
                        height: 40,
                        borderColor: primary_color,
                      },
                    ]}
                    onPress={() => {
                      if (cat === "Top" || cat === "Cont.") {
                        setShowTimes(cat);
                      } else {
                        setShowTimes(null);
                        setCurrentCategory(cat);
                        props.close();
                      }
                    }}
                  >
                    {showTimes && cat === showTimes ? (
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        {times.map((time) => {
                          return (
                            <TouchableOpacity
                              key={time}
                              onPress={() => {
                                setShowTimes(null);
                                setCurrentCategory(cat);
                                setCurrentTimeframe(time);
                                props.close();
                              }}
                            >
                              <Text style={{ color: primary_color }}>
                                {time[0].toUpperCase()}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    ) : (
                      <Text style={{ color: primary_color }}>{cat}</Text>
                    )}
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
