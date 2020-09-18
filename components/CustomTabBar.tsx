import React, { useContext } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Icon } from "react-native-elements";
import MainNavigationContext from "../context/MainNavigationContext";
import { defaultColor } from "../assets/styles/palettes";

const s = require("../assets/styles/mainStyles");

const CustomTabBar: React.FC<any> = (props) => {
  const { state, navigation } = props;
  const { index } = state;

  const { currentSub } = useContext(MainNavigationContext);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  return (
    <View style={[s.tabBarContainer, { backgroundColor: primary_color }]}>
      <View
        style={{
          width: 300,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
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
                if (name === "Home" && focused && props.scrollRef.current) {
                  props.scrollRef.current.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                }
              }}
              key={name}
            >
              <View
                style={[
                  s.tabBarIconContainer,
                  {
                    backgroundColor: focused ? "white" : primary_color,
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Icon
                  name={iconName()}
                  color={focused ? primary_color : "white"}
                  type="simple-line-icon"
                />
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;
