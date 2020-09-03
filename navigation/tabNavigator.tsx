import React from "react";
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
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
