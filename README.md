# Clear for Reddit

Clear is an open-sourced, cross-platform mobile application for browsing reddit.

So far, Clear is mostly contained to mass browsing, but features will be added as time goes on.

## Setup

In order to run Clear yourself, you'll need to set it up like any other react-native application.

### Android

Simply run `npm install` in the root directory

### iOS

run `npm install` in the root directory, then run `pod install` in the `ios` directory

### Creating a Reddit Application

For communicating with the reddit API, you'll need to create an application in your reddit account's preferences. [Here's](https://redditclient.readthedocs.io/en/latest/oauth/) a link to doing so.

Once you have your apps userAgent, clientID, and refreshToken (helper [here](https://github.com/not-an-aardvark/reddit-oauth-helper) for retrieving that), put them each in a file within `util/snoowrap` titled `snoowrapConfig.tsx`. It should look like:

```ts
type Config = {
  userAgent: string;
  clientId: string;
  refreshToken: string;
};

const snoowrapConfig: Config = {
  userAgent: "USERAGENT", //a unique name for your app; you create this yourself
  clientId: "CLIENTID", //your clients id, found underneath the name of your application in your reddit account's app preferences
  refreshToken: "REFRESHTOKEN", //a refreshToken for creating a default account that unauthed users will use when they use the app without an account
};

export default snoowrapConfig;
```

## Current Features

- sign users in
  - view subreddits and their posts
    - sort posts
  - view All/Popular posts
  - add/remove subscribed subreddits
  - view sub sidebars
  - save posts
  - view own user comments
- search for posts or subs

## TO-DO (that I currently have thought of)

- add ability to retrieve other sections of a user's page
- add ability to view non-signed-in user's page
- add better UI
- add theming (Dark, light, choose default highlight color, etc)
- add imgur/gfycat integration
- add comment functionality
- add report functionality
- add voting functionality
- create tablet version
