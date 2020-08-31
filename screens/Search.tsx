import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ClearContext from "../context/Clear";
import { Icon } from "react-native-elements";
import MainNavigationContext from "../context/MainNavigationContext";
import { defaultColor } from "../assets/styles/palettes";
import { searchPosts, searchForSubs } from "../util/snoowrap/snoowrapFunctions";
import PostItem from "../components/PostItem";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { TabParamList } from "../navigation/tabNavigator";
import { MainStackParamList } from "../navigation/mainNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";

const s = require("../assets/styles/mainStyles");

type SearchScreenNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, "Search">,
  StackNavigationProp<MainStackParamList>
>;
type SearchScreenRouteProp = RouteProp<TabParamList, "Search">;

type Props = {
  navigation: SearchScreenNavProps;
  route: SearchScreenRouteProp;
};

const Search: React.FC<Props> = (props) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchingPosts, setSearchingPosts] = useState<boolean>(false);
  const [searchingAll, setSearchingAll] = useState<boolean>(false);
  const [searchingSubs, setSearchingSubs] = useState<boolean>(false);
  const [postResults, setPostResults] = useState([]);
  const [subResults, setSubResults] = useState([]);

  const { currentSub } = useContext(MainNavigationContext);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  const context: any = useContext(ClearContext);

  console.log(Object.keys(currentSub));

  const subName = currentSub.display_name
    ? currentSub.display_name_prefixed
    : currentSub;

  const searching = searchingPosts || searchingAll || searchingSubs;

  return (
    <View style={{ flex: 1 }}>
      {/* SEARCH BAR */}
      <View
        style={{
          height: 50,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "lightgrey",
          borderRadius: 5,
          margin: 10,
        }}
      >
        <TextInput
          onChangeText={setSearchText}
          style={{ flex: 1, padding: 5 }}
        />
        {(postResults.length > 0 || subResults.length > 0) && (
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            }}
            onPress={() => {
              setSubResults([]);
              setPostResults([]);
            }}
          >
            <Icon name="close" type="simple-line-icon" />
          </TouchableOpacity>
        )}
      </View>
      {postResults.length > 0 ? (
        // POST RESULTS
        <FlatList
          style={{ flex: 1 }}
          data={postResults}
          renderItem={({ item, index }) => {
            return (
              <PostItem
                data={item}
                inList={true}
                navigation={props.navigation}
                openPosts={false}
                setOpenPosts={() => {}}
                onPress={() =>
                  props.navigation.navigate("PostSwiper", {
                    index: index,
                    searchResults: postResults,
                  })
                }
              />
            );
          }}
        ></FlatList>
      ) : subResults.length > 0 ? (
        // SUB RESULTS
        <FlatList
          data={subResults}
          style={{ flex: 1 }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={{ padding: 10 }}>
                <Text>r/{item}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => item + index.toString()}
        />
      ) : (
        // SEARCH TYPES
        <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
          <TouchableOpacity
            disabled={searching}
            style={[s.searchTypeBox, { borderColor: primary_color }]}
            onPress={() => {
              setSearchingPosts(true);
              searchPosts(context.clear.snoowrap, subName, searchText).then(
                (res: any) => {
                  if (res.length === 0) {
                    alert("No results for given search");
                  } else {
                    setPostResults(res);
                  }
                  setSearchingPosts(false);
                }
              );
            }}
          >
            {searchingPosts ? (
              <ActivityIndicator color={primary_color} />
            ) : (
              <Text>Search {subName}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[s.searchTypeBox, { borderColor: primary_color }]}
            disabled={searching}
            onPress={() => {
              setSearchingAll(true);
              searchPosts(context.clear.snoowrap, "all", searchText).then(
                (res: any) => {
                  if (res.length === 0) {
                    alert("No results for given search");
                  } else {
                    setPostResults(res);
                  }
                  setSearchingAll(false);
                }
              );
            }}
          >
            {searchingAll ? (
              <ActivityIndicator color={primary_color} />
            ) : (
              <Text>Search All Posts</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.searchTypeBox, { borderColor: primary_color }]}
            disabled={searching}
            onPress={() => {
              setSearchingSubs(true);
              searchForSubs(context.clear.snoowrap, searchText).then(
                (res: any) => {
                  if (res.length === 0) {
                    alert("No results for given search");
                  } else {
                    setSubResults(res);
                  }
                  setSearchingSubs(false);
                }
              );
            }}
          >
            {searchingSubs ? (
              <ActivityIndicator color={primary_color} />
            ) : (
              <Text>Search for Subreddit</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Search;
