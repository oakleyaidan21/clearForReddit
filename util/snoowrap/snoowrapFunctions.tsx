import snoowrap, { Listing, Submission } from "snoowrap";
import snoowrapConfig from "./snoowrapConfig";

export const initializeSnoowrap = async (authCode: string) => {
  let r = null;
  if (authCode !== "none") {
    console.log("authCode", authCode);
    try {
      r = await snoowrap.fromAuthCode({
        code: authCode,
        userAgent: snoowrapConfig.userAgent,
        clientId: snoowrapConfig.clientId,
        redirectUri: "https://localhost:8080",
      });
    } catch (error) {
      console.log("error initializing user snoowrap instance", error);
      return false;
    }
  } else {
    try {
      r = await snoowrap.fromApplicationOnlyAuth({
        userAgent: snoowrapConfig.userAgent,
        clientId: snoowrapConfig.clientId,
        deviceId: "",
      });
    } catch (error) {
      console.log("error initializing default snoowrap instance", error);
      return false;
    }
  }
  r._nextRequestTimestamp = -1;
  r.config({ proxies: false });
  return r;
};

export const initializeDefaultSnoowrap = async () => {
  const auth = {
    clientId: snoowrapConfig.clientId,
    userAgent: snoowrapConfig.userAgent,
    clientSecret: snoowrapConfig.clientSecret,
    refreshToken: snoowrapConfig.refreshToken,
  };

  const r = new snoowrap(auth);
  r._nextRequestTimestamp = -1;
  r.config({ proxies: false });
  return r;
};

export const initializeUserSnoowrap = async (token: string) => {
  const auth = {
    clientId: snoowrapConfig.clientId,
    clientSecret: snoowrapConfig.clientSecret,
    refreshToken: token,
    userAgent: snoowrapConfig.userAgent,
  };
  let r = new snoowrap(auth);
  r._nextRequestTimestamp = -1;
  r.config({ proxies: false });
  return r;
};

export const getPostsFromSub = async (
  snoowrap: snoowrap | undefined | null,
  subName: string,
  category: string
) => {
  if (!snoowrap) return [];
  switch (category) {
    case "Hot": {
      return snoowrap
        .getHot(subName)
        .then((posts: Listing<Submission>) => {
          return posts;
        })
        .catch((error: Error) => console.log("error getting posts", error));
    }
  }
};

export const getHot = async (
  snoowrap: snoowrap | undefined | null,
  subName: string
) => {
  if (!snoowrap) return [];
  switch (subName) {
    case "Front Page": {
      return snoowrap
        .getHot()
        .then((posts: Listing<Submission>) => {
          return posts;
        })
        .catch((error: Error) => console.log("error getting posts", error));
    }
    default: {
      return snoowrap
        .getHot(subName)
        .then((posts: Listing<Submission>) => {
          return posts;
        })
        .catch((error: Error) => console.log("error getting posts", error));
    }
  }
};

export const getUserData = (snoowrap: snoowrap | undefined | null) => {
  // if (!snoowrap) return null;
  // return snoowrap.getMe().then((me) => {

  //   return me;
  // });
  if (!snoowrap) return null;

  return snoowrap.getMe().then((me) => {
    return me;
  });
};