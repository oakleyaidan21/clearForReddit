import React, { useContext } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MainNavigationContext from "../context/MainNavigationContext";

const s = require("../assets/styles/mainStyles.js");

interface Props {
  isVisible: boolean;
  close: any;
}

const SubPicker: React.FC<Props> = (props) => {
  const { userSubs, setCurrentSub, currentSub } = useContext(
    MainNavigationContext
  );

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : "rgb(243,68,35)";

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
              style={[s.subPickerContainer, { borderColor: primary_color }]}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Subs</Text>
              <ScrollView style={{ width: "100%", maxHeight: 400 }}>
                {userSubs.map((sub) => {
                  return (
                    <TouchableOpacity
                      key={sub.name}
                      style={{ margin: 10 }}
                      onPress={() => {
                        setCurrentSub(sub);
                        props.close();
                      }}
                    >
                      <Text>{sub.display_name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SubPicker;
