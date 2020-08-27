import React, { useContext } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Icon } from "react-native-elements";
import MainNavigationContext from "../context/MainNavigationContext";

const s = require("../assets/styles/mainStyles");

const CustomTabBar: React.FC<any> = (props) => {
  const { state, navigation } = props;
  const { index } = state;

  return (
    <View style={s.tabBarContainer}>
      {state.routes.map((route: { name: any }, i: any) => {
        const focused = index === i;
        const { name } = route;
        const iconName = () => {
          switch (name) {
            case "Home": {
              return "bars";
            }
            case "Search": {
              return "search";
            }
            case "User": {
              return "user";
            }
            default: {
              return "close";
            }
          }
        };
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate(name);
            }}
            key={name}
          >
            <View style={s.tabBarIconContainer}>
              <Icon
                name={iconName()}
                color={focused ? "blue" : "black"}
                type="font-awesome"
              />
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
