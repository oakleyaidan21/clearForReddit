import React, { useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import User from "../screens/User";
import CustomTabBar from "../components/CustomTabBar";

export type TabParamList = {
  Home: undefined;
  User: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  const homeScrollRef = useRef(null);
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} scrollRef={homeScrollRef} />}
    >
      <Tab.Screen name="Home">
        {({ navigation, route }) => {
          return (
            <Home
              navigation={navigation}
              route={route}
              scrollRef={homeScrollRef}
            />
          );
        }}
      </Tab.Screen>
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
