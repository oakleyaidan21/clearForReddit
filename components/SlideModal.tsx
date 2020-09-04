import React from "react";
import { View, Modal, TouchableWithoutFeedback, Platform } from "react-native";

type Props = {
  close: any;
  isVisible: boolean;
};

const SlideModal: React.FC<Props> = (props) => {
  return (
    <Modal
      visible={props.isVisible}
      animationType={Platform.OS === "ios" ? "slide" : "fade"}
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={props.close}>
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <TouchableWithoutFeedback>{props.children}</TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SlideModal;
