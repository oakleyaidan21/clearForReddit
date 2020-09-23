import React, { useContext, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import User from "../screens/User";
import CustomTabBar from "../components/CustomTabBar";
import DeviceInfo from "react-native-device-info";
import TabletHome from "../screens/TabletHome";
import { View } from "react-native";
import MainNavigationContext from "../context/MainNavigationContext";

export type TabParamList = {
  Home: undefined;
  User: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  const homeScrollRef = useRef(null);
  const isTablet = DeviceInfo.isTablet();

  const { theme } = useContext(MainNavigationContext);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "light" ? "#ebebeb" : "#202020",
      }}
    >
      <Tab.Navigator
        tabBar={(props) => (
          <CustomTabBar {...props} scrollRef={homeScrollRef} />
        )}
      >
        <Tab.Screen name="Home">
          {({ navigation, route }) => {
            return !isTablet ? (
              <Home
                navigation={navigation}
                route={route}
                scrollRef={homeScrollRef}
              />
            ) : (
              <TabletHome navigation={navigation} route={route} />
            );
          }}
        </Tab.Screen>
        <Tab.Screen name="User" component={User} />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;
