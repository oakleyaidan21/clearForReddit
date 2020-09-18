"use strict";

var React = require("react-native");

var { StyleSheet } = React;

import { Dimensions, Platform } from "react-native";

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

export const defaultColor = "#579bfa";

const pickerYLocation = Platform.OS === "ios" ? 85 : 65;

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
    justifyContent: "center",
    alignItems: "center",

    // ...elevationShadowStyle(5),
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
    marginTop: pickerYLocation,
    marginLeft: 5,
    maxWidth: screenWidth * 0.7,
  },

  searchTypeContainer: {
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 2,
    backgroundColor: "white",
    borderTopWidth: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    width: "70%",
  },

  searchType: {
    padding: 5,
    justifyContent: "center",
    flex: 1,
  },

  /**
   * *********CATPICKER*********
   */
  categoryPickerContainer: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "lightgrey",
    borderRadius: 5,
    top: pickerYLocation,
  },

  categoryItem: {
    padding: 10,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "lightgrey",
  },

  /**
   * *******TIMEFRAMEPICKER*******
   */
  timeframePickerContainer: {
    position: "absolute",
    top: pickerYLocation,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "lightgrey",
    borderRadius: 5,
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
    backgroundColor: "white",
  },

  /**
   * ********HOMELISTHEADER*******
   */
  headerSubIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "grey",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  headerDropdown: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 20,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  /**
   * *******POSTITEM**********
   */
  postItemContainer: {
    padding: 10,
    margin: 10,

    marginBottom: 0,
    borderWidth: 2,
    borderColor: "grey",
    flexDirection: "row",
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    flex: 1,
  },

  postItemIconContainer: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * *********POST************
   */
  replyModalContainer: {
    width: "98%",
    height: 200,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    ...elevationShadowStyle(5),
    ...centeredContentContainer(),
  },

  /**
   * ********SUBMODAL*********
   */

  subModalContainer: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.75,
    backgroundColor: "white",
    alignItems: "center",
  },

  subscribeButton: {
    width: 150,
    height: 50,
    ...centeredContentContainer(),
    borderRadius: 10,
  },

  subModalHeader: {
    height: 150,
    width: screenWidth * 0.9,
    position: "absolute",
    top: 0,
  },
  /**
   * ********GENERALMODAL*****
   */
  genModalHeader: {
    width: "100%",
    height: 60,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
  },

  /**
   * *******USERPICKER*********
   */
  userPickerContainer: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "lightgrey",
    borderRadius: 5,
    marginTop: pickerYLocation,
    marginLeft: 5,
    maxWidth: screenWidth * 0.7,
  },

  /**
   * *******USER**********
   */
  karmaBox: {
    flex: 1,
    height: 100,
    borderWidth: 2,
    margin: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
