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
  subPickerContainer: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "lightgrey",
    borderRadius: 5,
    marginTop: 120,
    marginLeft: 10,
    padding: 10,
    maxWidth: screenWidth * 0.7,
  },

  /**
   * *******HOME***********
   */
  homeHeaderContainer: {
    height: 60,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "lightgrey",
  },

  /**
   * ********HOMELISTHEADER*******
   */
  headerSubIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "grey",
    marginRight: 10,
  },

  headerDropdown: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: "lightgrey",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
