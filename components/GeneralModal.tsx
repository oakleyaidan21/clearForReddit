import React, { cloneElement } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { Icon } from "react-native-elements";
import { createThemedStyle } from "../assets/styles/mainStyles";

type Props = {
  isVisible: boolean;
  close: any;
  disableClose: boolean;
  content: any;
};

const GeneralModal: React.FC<Props> = (props) => {
  const s = createThemedStyle("light");
  return (
    <Modal
      visible={props.isVisible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={props.close}
    >
      <TouchableWithoutFeedback onPress={() => props.close()}>
        <KeyboardAvoidingView
          behavior={"padding"}
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={{
                width: "90%",
              }}
            >
              {/* {!props.hideHeader && props.title && (
                <View style={s.genModalHeader}>
                  <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                    {props.title}
                  </Text>
                  {!props.disableClose && (
                    <TouchableOpacity
                      onPress={props.close}
                      style={{ position: "absolute", right: 10 }}
                    >
                      <Icon name="close" />
                    </TouchableOpacity>
                  )}
                </View>
              )} */}

              {cloneElement(props.content, { close: props.close })}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default GeneralModal;
