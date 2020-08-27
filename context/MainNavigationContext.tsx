import { createContext } from "react";
import { Subreddit } from "snoowrap";

interface MainNavigationContextInterface {
  currentPosts: Array<any>;
  updateCurrentPosts: any;
  user: any;
  setUser: any;
  currentSub: any;
  setCurrentSub: any;
  userSubs: Array<Subreddit>;
  setUserSubs: any;
  currentCategory: string;
  setCurrentCategory: any;
}

const MainNavigationContext = createContext<MainNavigationContextInterface>({
  currentPosts: [],
  updateCurrentPosts: null,
  user: null,
  setUser: null,
  currentSub: "Front Page",
  setCurrentSub: null,
  userSubs: [],
  setUserSubs: null,
  currentCategory: "Hot",
  setCurrentCategory: null,
});

export default MainNavigationContext;
