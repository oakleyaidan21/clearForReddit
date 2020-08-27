import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./tabNavigator";
import MainNavigationContext from "../context/MainNavigationContext";
import SubPicker from "../components/SubPicker";
import Login from "../screens/Login";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserData,
  initializeSnoowrap,
  initializeDefaultSnoowrap,
  initializeUserSnoowrap,
  getHot,
} from "../util/snoowrap/snoowrapFunctions";
import ClearContext from "../context/Clear";
import Snoowrap, { Submission } from "snoowrap";
import Post from "../screens/Post";

const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  /**
   * *******REDUX*********
   */
  const { authCode, refreshToken } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  /**
   * ********STATE********
   */
  const [currentPosts, setCurrentPosts] = useState([]);
  const [showSubPicker, setShowSubPicker] = useState(false);
  const [user, setUser] = useState(null);

  /**
   * ********CONTEXT******
   */
  const context: any = useContext(ClearContext);

  const getRedditData = (r: Snoowrap | null) => {
    getPosts(r);
    getUser(r);
  };

  const getUser = (r: Snoowrap | null) => {
    const snoo = r;
    getUserData(snoo)?.then((me: any) => {
      setUser(me);
    });
  };

  const getPosts = (r: Snoowrap | null) => {
    const snoo = r;
    getHot(snoo, "Front Page").then((posts: any) => {
      console.log("new posts", posts.length);
      setCurrentPosts(posts);
    });
  };

  useEffect(() => {
    if (refreshToken !== "none") {
      console.log("remaking snoowrap");
      initializeUserSnoowrap(refreshToken).then((r) => {
        context.updateClear({ ...context.clear, snoowrap: r });
        getRedditData(r);
      });
    } else {
      if (authCode === "none") {
        console.log("creating default snoowrap");
        initializeDefaultSnoowrap().then((r) => {
          context.updateClear({ ...context.clear, snoowrap: r });
          getPosts(r);
        });
      } else {
        initializeSnoowrap(authCode).then((r: any) => {
          dispatch({ type: "SET_REFRESH_TOKEN", refreshToken: r.refreshToken });
          context.updateClear({ ...context.clear, snoowrap: r });
          getPosts(r);
        });
      }
    }
  }, [authCode, refreshToken]);

  return (
    <MainNavigationContext.Provider
      value={{
        currentPosts: currentPosts,
        updateCurrentPosts: setCurrentPosts,
        showSubPicker: false,
        setShowSubPicker: setShowSubPicker,
        user: user,
        setUser: setUser,
      }}
    >
      <>
        {/* SUB PICKER */}
        {/* {showSubPicker && <SubPicker />} */}
        {/* NAVIGATION CONTAINER */}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Post" component={Post} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    </MainNavigationContext.Provider>
  );
};

export default MainNavigator;
