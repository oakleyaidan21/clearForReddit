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

const s = require("../assets/styles/mainStyles.js");

const timeframes = ["hour", "day", "week", "month", "year", "all"];

interface Props {
  isVisible: boolean;
  close: any;
  xPos: number;
}

const TimeframePicker: React.FC<Props> = (props) => {
  const { setCurrentTimeframe } = useContext(MainNavigationContext);
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
            <View style={[s.timeframePickerContainer, { right: 5 }]}>
              {timeframes.map((t, index) => {
                return (
                  <TouchableOpacity
                    key={t}
                    style={[
                      s.categoryItem,
                      { borderTopWidth: index === 0 ? 0 : 2 },
                    ]}
                    onPress={() => {
                      setCurrentTimeframe(t);
                      props.close();
                    }}
                  >
                    <Text style={{ color: "grey" }}>{t}</Text>
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

export default TimeframePicker;
