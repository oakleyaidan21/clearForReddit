import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import ClearContext from "../context/Clear";
import { useDispatch, useSelector } from "react-redux";
import MainNavigationContext from "../context/MainNavigationContext";
import { defaultColor } from "../assets/styles/palettes";
import GeneralModal from "../components/GeneralModal";
import { Icon } from "react-native-elements";

const s = require("../assets/styles/mainStyles");

interface Props {
  navigation: any;
}

const User: React.FC<Props> = (props) => {
  const { user, updateCurrentPosts } = useContext(MainNavigationContext);
  /**
   * *********REDUX********
   */
  const { users } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  /**
   * ********STATE*********
   */
  const [showUsers, setShowUsers] = useState(false);

  return (
    <>
      <View style={s.screen}>
        {user ? (
          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: user.icon_img }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 5,
                borderColor: defaultColor,
              }}
            />
            <TouchableOpacity
              onPress={() => setShowUsers(true)}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                {user.name}
              </Text>
              <Icon name="expand-more" style={{ marginLeft: 5 }} size={30} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 25, textAlign: "center" }}>
              Log in with your Reddit account!
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: defaultColor,
                borderRadius: 10,
                width: 100,
                margin: 10,
              }}
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <GeneralModal
        isVisible={showUsers}
        close={() => setShowUsers(false)}
        disableClose={false}
        content={
          <View
            style={{
              padding: 10,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              maxHeight: 400,
            }}
          >
            <Text style={{ margin: 10, fontSize: 20, fontWeight: "bold" }}>
              Accounts
            </Text>
            {users.map((u: { name: string; token: string }) => {
              return (
                <TouchableOpacity
                  key={u.name}
                  onPress={() => {
                    setShowUsers(false);
                    updateCurrentPosts(null);
                    dispatch({
                      type: "SET_REFRESH_TOKEN",
                      refreshToken: u.token,
                    });
                  }}
                >
                  <Text>{u.name}</Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              onPress={() => {
                setShowUsers(false);
                props.navigation.navigate("Login");
              }}
            >
              <Icon name="plus" type="simple-line-icon" />
            </TouchableOpacity>
          </View>
        }
      />
    </>
  );
};

export default User;
