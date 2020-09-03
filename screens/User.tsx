import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ClearContext from "../context/Clear";
import { useDispatch, useSelector } from "react-redux";
import MainNavigationContext from "../context/MainNavigationContext";

const s = require("../assets/styles/mainStyles");

interface Props {
  navigation: any;
}

const User: React.FC<Props> = (props) => {
  const context: any = useContext(ClearContext);
  const { setUser, setUserSubs, user } = useContext(MainNavigationContext);
  /**
   * *********REDUX********
   */
  const { authCode, refreshToken } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  return (
    <View style={s.screen}>
      {user ? (
        <View>
          <Text>{user.name}</Text>
          <TouchableOpacity
            onPress={() => {
              dispatch({ type: "LOGOUT" });
              setUser(null);
              setUserSubs([]);
            }}
          >
            <Text>logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
          <Text>login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default User;
