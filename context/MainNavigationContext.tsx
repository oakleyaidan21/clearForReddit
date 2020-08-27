import { createContext } from "react";
// import { Listing, Submission } from "snoowrap";

interface MainNavigationContextInterface {
  currentPosts: Array<any>;
  updateCurrentPosts: any;
  showSubPicker: boolean;
  setShowSubPicker: any;
  user: any;
  setUser: any;
}

const MainNavigationContext = createContext<MainNavigationContextInterface>({
  currentPosts: [],
  updateCurrentPosts: null,
  showSubPicker: false,
  setShowSubPicker: null,
  user: null,
  setUser: null,
});

export default MainNavigationContext;
