import { createContext } from "react";
import { Subreddit, Submission, Listing } from "snoowrap";

interface MainNavigationContextInterface {
  currentPosts: Listing<Submission> | Array<Submission>;
  updateCurrentPosts: any;
  user: any;
  setUser: any;
  currentSub: any;
  setCurrentSub: any;
  userSubs: Array<Subreddit>;
  setUserSubs: any;
  currentCategory: string;
  setCurrentCategory: any;
  currentTimeframe: string;
  setCurrentTimeframe: any;
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
  currentTimeframe: "day",
  setCurrentTimeframe: null,
});

export default MainNavigationContext;
