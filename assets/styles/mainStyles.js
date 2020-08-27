"use strict";

var React = require("react-native");

var { StyleSheet } = React;

import { Dimensions, Platform } from "react-native";

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

function elevationShadowStyle(elevation) {
  //large elevation values look good on Android but not on iOS,
  //so we set the elevation value to 1 on ios
  let ele = Platform.OS === "ios" ? 1 : elevation;

  return {
    elevation: ele,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.5 * ele },
    shadowOpacity: 0.8,
    backgroundColor: "white",
    shadowRadius: 1 * ele,
  };
}

export const centeredContentContainer = () => {
  return {
    justifyContent: "center",
    alignItems: "center",
  };
};

module.exports = StyleSheet.create({
  /**
   * ******GENERAL*********
   */
  screen: {
    flex: 1,
    ...centeredContentContainer(),
    backgroundColor: "white",
  },

  /**
   * ******CUSTOMTABBAR*******
   */
  tabBarContainer: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "lightgrey",
    ...elevationShadowStyle(5),
  },

  tabBarIconContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * ********SUBPICKER********
   */
  subPickerBackdrop: {
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
});
