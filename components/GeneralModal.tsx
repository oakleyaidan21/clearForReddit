import React, { cloneElement, useContext } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import Text from "./Text";
import { Icon } from "react-native-elements";
import { createThemedStyle } from "../assets/styles/mainStyles";
import MainNavigationContext from "../context/MainNavigationContext";

type Props = {
  isVisible: boolean;
  close: any;
  disableClose: boolean;
  content: any;
  hideHeader?: boolean;
  title: string;
};

const GeneralModal: React.FC<Props> = (props) => {
  const { theme } = useContext(MainNavigationContext);
  const s = createThemedStyle(theme);
  return (
    <Modal
      visible={props.isVisible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={props.close}
    >
      <KeyboardAvoidingView
        behavior={"padding"}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <TouchableWithoutFeedback onPress={props.close}>
          <KeyboardAvoidingView
            behavior={"padding"}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          ></KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <>
          <KeyboardAvoidingView
            behavior={"padding"}
            style={{
              position: "absolute",
              width: "90%",
              maxWidth: 400,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {!props.hideHeader && props.title && (
              <View style={s.genModalHeader}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    color: theme === "light" ? "black" : "white",
                  }}
                >
                  {props.title}
                </Text>
                {!props.disableClose && (
                  <TouchableOpacity
                    onPress={props.close}
                    style={{ position: "absolute", right: 10 }}
                  >
                    <Icon
                      name="close"
                      color={theme === "light" ? "black" : "white"}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}

            {cloneElement(props.content, { close: props.close })}
          </KeyboardAvoidingView>
        </>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default GeneralModal;
