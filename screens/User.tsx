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
  const navContext: any = useContext(MainNavigationContext);
  /**
   * *********REDUX********
   */
  const { authCode, refreshToken } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const { user } = navContext;

  return (
    <View style={s.screen}>
      {user ? (
        <View>
          <Text>{user.name}</Text>
          <TouchableOpacity
            onPress={() => {
              dispatch({ type: "LOGOUT" });
              navContext.setUser(null);
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
