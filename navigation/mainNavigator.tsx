import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import TabNavigator from "./tabNavigator";
import MainNavigationContext from "../context/MainNavigationContext";
import Login from "../screens/Login";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserData,
  initializeSnoowrap,
  initializeDefaultSnoowrap,
  initializeUserSnoowrap,
  getUserSubs,
  getGeneralPosts,
} from "../util/snoowrap/snoowrapFunctions";
import ClearContext from "../context/Clear";
import Settings from "../screens/Settings";
import Snoowrap, { Submission, Listing, RedditUser } from "snoowrap";
import Post from "../screens/Post";
import { useDidUpdateEffect } from "../util/util";
import PostSwiper from "../screens/PostSwiper";
import Web from "../screens/Web";
import { defaultColor } from "../assets/styles/palettes";
import Header from "../components/Header";
import User from "../screens/User";
import { createThemedStyle } from "../assets/styles/mainStyles";

export type MainStackParamList = {
  Tabs: undefined;
  Login: undefined;
  Post: { data: Submission };
  PostSwiper: {
    index: number;
    searchResults: Listing<Submission> | Array<Submission>;
  };
  Web: { url: string };
  RedditUser: { author: RedditUser };
};

const Stack = createStackNavigator<MainStackParamList>();

const MainNavigator: React.FC = () => {
  /**
   * *******REDUX*********
   */
  const { authCode, refreshToken, users, theme } = useSelector(
    (state: any) => state
  );
  const dispatch = useDispatch();

  /**
   * ********STATE********
   */
  const [currentPosts, setCurrentPosts] = useState<Array<Submission> | null>(
    null
  );
  const [userSubs, setUserSubs] = useState([]);
  const [user, setUser] = useState(null);
  const [currentSub, setCurrentSub] = useState<any>("Front Page");
  const [currentCategory, setCurrentCategory] = useState("Hot");
  const [currentTimeframe, setCurrentTimeframe] = useState("day");

  const s = createThemedStyle(theme);

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
    getGeneralPosts(snoo, currentSub, currentCategory, currentTimeframe).then(
      (posts: any) => {
        setCurrentPosts(posts);
      }
    );
  };

  const getSubs = (r: Snoowrap | null) => {
    const snoo = r;
    getUserSubs(snoo).then((subs: any) => {
      setUserSubs(subs);
    });
  };

  useDidUpdateEffect(() => {
    if (currentSub !== "Search Results") {
      setCurrentPosts(null);
      getPosts(context.clear.snoowrap);
    }
  }, [currentSub, currentCategory, currentTimeframe]);

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
        console.log("creating new user snoowrap");
        initializeSnoowrap(authCode).then((r: any) => {
          const newUsers = users ? JSON.parse(users) : [];
          r.getMe().then((me: any) => {
            newUsers.push({ name: me.name, token: r.refreshToken });
            setUser(me);
            dispatch({ type: "SET_USERS", users: JSON.stringify(newUsers) });
            dispatch({
              type: "SET_REFRESH_TOKEN",
              refreshToken: r.refreshToken,
            });
            context.updateClear({ ...context.clear, snoowrap: r });
            getPosts(r);
          });
        });
      }
    }
  }, [authCode, refreshToken]);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

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
        currentTimeframe: currentTimeframe,
        setCurrentTimeframe: setCurrentTimeframe,
        theme: theme,
        setTheme: (t: string) => dispatch({ type: "SET_THEME", theme: t }),
      }}
    >
      <SafeAreaView style={{ backgroundColor: primary_color, flex: 1 }}>
        {/* STATUS BAR */}
        <StatusBar barStyle={"light-content"} backgroundColor={primary_color} />
        {/* NAVIGATION CONTAINER */}
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
              headerShown: route.name !== "Tabs",
              headerStyle: { backgroundColor: primary_color },
              headerBackTitleVisible: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              header: () => <Header navigation={navigation} />,
            })}
            headerMode={"screen"}
          >
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen name="PostSwiper" component={PostSwiper} />
            <Stack.Screen name="Web" component={Web} />
            <Stack.Screen name="RedditUser" component={User} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </MainNavigationContext.Provider>
  );
};

export default MainNavigator;
