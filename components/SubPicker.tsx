import React, { useContext } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import MainNavigationContext from "../context/MainNavigationContext";

const s = require("../assets/styles/mainStyles.js");

const staticPages = ["Front Page", "All", "Popular", "Saved"];

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

  const subs = userSubs;
  subs.sort((a, b) =>
    a.display_name.toLowerCase().localeCompare(b.display_name.toLowerCase())
  );

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
              {/* FRONT PAGE, ALL, ETC */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 5,
                  padding: 10,
                  borderBottomWidth: 2,
                  borderColor: primary_color,
                }}
              >
                {staticPages.map((p) => (
                  <TouchableOpacity
                    key={p}
                    onPress={() => {
                      setCurrentSub(p);
                      props.close();
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: primary_color }}>
                      {p}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {/* YOUR SUBS */}
              <ScrollView
                style={{ width: "100%", maxHeight: 400 }}
                contentContainerStyle={{ paddingLeft: 10 }}
              >
                {subs.map((sub) => {
                  const iconUrl = sub.icon_img
                    ? sub.icon_img
                    : "https://img.favpng.com/4/2/8/computer-icons-reddit-logo-website-png-favpng-hMmUQ5KAUjd27EWLvNwpuvW5Q.jpg";
                  const icon_color = sub.primary_color
                    ? sub.primary_color
                    : "rgb(243,68,35)";
                  return (
                    <TouchableOpacity
                      key={sub.name}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                      }}
                      onPress={() => {
                        setCurrentSub(sub);
                        props.close();
                      }}
                    >
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 15,
                          marginRight: 10,
                          borderWidth: 2,
                          borderColor: icon_color,
                        }}
                        source={{ uri: iconUrl }}
                      />
                      <Text style={{ fontWeight: "bold" }}>
                        {sub.display_name}
                      </Text>
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
