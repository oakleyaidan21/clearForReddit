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
  getUserSubs,
  getGeneralPosts,
} from "../util/snoowrap/snoowrapFunctions";
import ClearContext from "../context/Clear";
import Snoowrap, { Submission } from "snoowrap";
import Post from "../screens/Post";
import { useDidUpdateEffect } from "../util/util";

export type MainStackParamList = {
  Tabs: undefined;
  Login: undefined;
  Post: { data: Object };
};

const Stack = createStackNavigator<MainStackParamList>();

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
  const [userSubs, setUserSubs] = useState([]);
  const [user, setUser] = useState(null);
  const [currentSub, setCurrentSub] = useState("Front Page");
  const [currentCategory, setCurrentCategory] = useState("Hot");

  /**
   * ********CONTEXT******
   */
  const context: any = useContext(ClearContext);

  const getRedditData = (r: Snoowrap | null) => {
    getPosts(r);
    getUser(r);
    getSubs(r);
  };

  const getUser = (r: Snoowrap | null) => {
    const snoo = r;
    getUserData(snoo)?.then((me: any) => {
      setUser(me);
    });
  };

  const getPosts = (r: Snoowrap | null) => {
    const snoo = r;
    getGeneralPosts(snoo, currentSub, "Hot", "").then((posts: any) => {
      setCurrentPosts(posts);
    });
  };

  const getSubs = (r: Snoowrap | null) => {
    const snoo = r;
    getUserSubs(snoo).then((subs: any) => {
      setUserSubs(subs);
    });
  };

  useDidUpdateEffect(() => {
    setCurrentPosts([]);
    getPosts(context.clear.snoowrap);
  }, [currentSub]);

  //when the user changes
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
        user: user,
        setUser: setUser,
        currentSub: currentSub,
        setCurrentSub: setCurrentSub,
        userSubs: userSubs,
        setUserSubs: setUserSubs,
        currentCategory: currentCategory,
        setCurrentCategory: setCurrentCategory,
      }}
    >
      <>
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
