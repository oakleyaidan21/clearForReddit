import React, { useContext } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Icon } from "react-native-elements";
import MainNavigationContext from "../context/MainNavigationContext";

const s = require("../assets/styles/mainStyles");

const CustomTabBar: React.FC<any> = (props) => {
  const { state, navigation } = props;
  const { index } = state;

  const { currentSub } = useContext(MainNavigationContext);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : "rgb(243,68,35)";

  return (
    <View style={[s.tabBarContainer, { borderColor: primary_color }]}>
      {state.routes.map((route: { name: any }, i: any) => {
        const focused = index === i;
        const { name } = route;
        const iconName = () => {
          switch (name) {
            case "Home": {
              return "menu";
            }
            case "Search": {
              return "magnifier";
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
                color={focused ? primary_color : "grey"}
                type="simple-line-icon"
              />
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
