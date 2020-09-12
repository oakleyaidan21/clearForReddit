import React, { useContext } from "react";
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Text from "./Text";
import { defaultColor } from "../assets/styles/palettes";
import MainNavigationContext from "../context/MainNavigationContext";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "react-native-elements";

const s = require("../assets/styles/mainStyles");

type Props = {
  isVisible: boolean;
  close: any;
  addUser: any;
};

const UserPicker: React.FC<Props> = (props) => {
  const { currentSub, user, updateCurrentPosts, setUser } = useContext(
    MainNavigationContext
  );

  const { users } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  const usersToRender = users ? JSON.parse(users) : [];

  return (
    <Modal visible={props.isVisible} animationType="none" transparent={true}>
      <TouchableWithoutFeedback onPress={props.close}>
        <View
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={[s.userPickerContainer, { borderColor: primary_color }]}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 5,
                  borderBottomWidth: 2,
                  borderColor: primary_color,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: primary_color,
                  }}
                >
                  Users
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    props.close();
                    props.addUser();
                  }}
                >
                  <Icon
                    name="plus"
                    type="simple-line-icon"
                    size={20}
                    color={primary_color}
                  />
                </TouchableOpacity>
              </View>
              {usersToRender.map(
                (u: { name: string; token: string }, index: number) => (
                  <TouchableOpacity
                    key={u.name}
                    style={[
                      s.categoryItem,
                      {
                        borderTopWidth: index === 0 ? 0 : 2,
                        borderColor: primary_color,
                      },
                    ]}
                    onPress={() => {
                      props.close();
                      setUser(null);
                      updateCurrentPosts(null);
                      dispatch({
                        type: "SET_REFRESH_TOKEN",
                        refreshToken: u.token,
                      });
                    }}
                  >
                    <Text style={{ color: primary_color }}>{u.name}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default UserPicker;
