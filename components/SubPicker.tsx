import React, { useContext, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Text from "../components/Text";
import { Icon } from "react-native-elements";
import MainNavigationContext from "../context/MainNavigationContext";
import { defaultColor } from "../assets/styles/palettes";
import { TextInput } from "react-native-gesture-handler";
import { searchPosts, searchForSubs } from "../util/snoowrap/snoowrapFunctions";
import ClearContext from "../context/Clear";
import { Subreddit } from "snoowrap";
import { createThemedStyle } from "../assets/styles/mainStyles";
import * as Animatable from "react-native-animatable";

const staticPages = ["Front Page", "Popular", "Saved", "All"];

interface Props {
  isVisible: boolean;
  close: any;
}

const SubPicker: React.FC<Props> = (props) => {
  const {
    userSubs,
    setCurrentSub,
    currentSub,
    updateCurrentPosts,
    user,
    theme,
  } = useContext(MainNavigationContext);

  const context: any = useContext(ClearContext);
  const s = createThemedStyle(theme);
  /**
   * *********STATE***********
   */
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [subResults, setSubResults] = useState<Array<string>>([]);

  const primary_color = currentSub.primary_color
    ? currentSub.primary_color
    : defaultColor;

  const subs = userSubs;
  subs.sort((a, b) =>
    a.display_name.toLowerCase().localeCompare(b.display_name.toLowerCase())
  );

  const subName: string = currentSub.display_name
    ? currentSub.display_name
    : currentSub;

  /**
   * ****FUNCTIONS*****
   */

  const searchSubmissions = (subName: string) => {
    setShowSearch(false);
    setCurrentSub("Search Results");
    updateCurrentPosts(null);
    props.close();
    searchPosts(context.clear.snoowrap, subName, query).then((res: any) => {
      updateCurrentPosts(res);
    });
  };

  /**
   * *****RENDER FUNCTIONS******
   */

  const _renderSearchTypes = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          alignItems: "center",
        }}
      >
        <View style={[s.searchTypeContainer, { borderColor: primary_color }]}>
          <TouchableOpacity
            style={[
              s.searchType,
              { borderColor: primary_color, borderRightWidth: 2 },
            ]}
            onPress={() => searchSubmissions("all")}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: primary_color,
              }}
            >
              All
            </Text>
          </TouchableOpacity>
          {typeof currentSub !== "string" && (
            <TouchableOpacity
              style={[
                s.searchType,
                { borderColor: primary_color, borderRightWidth: 2 },
              ]}
              onPress={() => searchSubmissions(subName)}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: primary_color,
                }}
                numberOfLines={1}
              >
                r/
                {subName}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={s.searchType}
            onPress={() => {
              searchForSubs(context.clear.snoowrap, query).then((subs) => {
                if (subs.length > 0) {
                  setSubResults(subs);
                } else {
                  alert("No results for given query");
                }
              });
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: primary_color,
              }}
            >
              Subs
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderStaticSub = (type: string) => {
    switch (type) {
      case "Front Page": {
        return (
          <Icon name="newspaper" type="font-awesome-5" color={primary_color} />
        );
      }
      case "Saved": {
        return (
          <Icon name="star" type="simple-line-icon" color={primary_color} />
        );
      }

      case "Popular": {
        return (
          <Icon name="fire" type="simple-line-icon" color={primary_color} />
        );
      }
      default: {
        return (
          <Text style={{ fontWeight: "bold", color: primary_color }}>
            {type}
          </Text>
        );
      }
    }
  };

  return (
    <Modal visible={props.isVisible} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback
        onPress={() => {
          setShowSearch(false);
          props.close();
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={[s.subPickerContainer, { borderColor: primary_color }]}
            >
              {/* FRONT PAGE, ALL, ETC */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: 46,
                  padding: 10,
                  alignItems: "center",
                  borderBottomWidth: userSubs.length > 0 || showSearch ? 2 : 0,
                  borderColor: primary_color,
                }}
              >
                {showSearch ? (
                  <TextInput
                    style={{
                      flex: 1,
                      height: 50,
                      color: theme === "light" ? "black" : "white",
                    }}
                    placeholder="Search..."
                    placeholderTextColor={"grey"}
                    autoFocus={true}
                    onChangeText={setQuery}
                  />
                ) : (
                  staticPages.map((p) => (
                    <TouchableOpacity
                      key={p}
                      onPress={() => {
                        setCurrentSub(p);
                        props.close();
                      }}
                    >
                      {renderStaticSub(p)}
                    </TouchableOpacity>
                  ))
                )}
                {/* SEARCH BUTTON */}
                <TouchableOpacity
                  onPress={() => {
                    setShowSearch(!showSearch);
                    setSubResults([]);
                  }}
                >
                  <Icon
                    name={showSearch ? "close" : "magnifier"}
                    type="simple-line-icon"
                    color={primary_color}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "100%",
                  position: "relative",
                  minHeight: showSearch ? 40 : 0,
                }}
              >
                <ScrollView
                  style={{ width: "100%", maxHeight: 400 }}
                  contentContainerStyle={{ paddingLeft: 10 }}
                >
                  {subResults.length > 0
                    ? // SUB SEARCH RESULTS
                      subResults.map((sub) => (
                        <TouchableOpacity
                          key={sub}
                          style={{ padding: 10 }}
                          onPress={() => {
                            props.close();
                            context.clear.snoowrap
                              .getSubreddit(sub)
                              .fetch()
                              .then((sub: Subreddit) => {
                                setCurrentSub(sub);
                                setShowSearch(false);
                                setSubResults([]);
                              });
                          }}
                        >
                          <Text
                            style={{
                              color: theme === "light" ? "black" : "white",
                            }}
                          >
                            {sub}
                          </Text>
                        </TouchableOpacity>
                      ))
                    : // YOUR SUBS

                      subs.map((sub, index) => {
                        const iconUrl = sub.icon_img
                          ? sub.icon_img
                          : "https://img.favpng.com/4/2/8/computer-icons-reddit-logo-website-png-favpng-hMmUQ5KAUjd27EWLvNwpuvW5Q.jpg";
                        const icon_color = sub.primary_color
                          ? sub.primary_color
                          : defaultColor;
                        return (
                          <Animatable.View
                            animation="fadeInUp"
                            delay={index * 10}
                          >
                            <TouchableOpacity
                              key={sub.name}
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 5,
                                marginTop: index === 0 ? 5 : 0,
                              }}
                              onPress={() => {
                                setCurrentSub(sub);
                                props.close();
                              }}
                            >
                              {sub.icon_img ? (
                                <Image
                                  style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 15,
                                    marginRight: 10,
                                    borderWidth: 2,
                                    borderColor: icon_color,
                                  }}
                                  source={{ uri: iconUrl }}
                                />
                              ) : (
                                <Icon
                                  name="social-reddit"
                                  type="simple-line-icon"
                                  color="white"
                                  size={20}
                                  style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 15,
                                    marginRight: 10,
                                    justifyContent: "center",
                                    backgroundColor: icon_color,
                                  }}
                                />
                              )}
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  color: theme === "light" ? "black" : "white",
                                }}
                              >
                                {sub.display_name}
                              </Text>
                            </TouchableOpacity>
                          </Animatable.View>
                        );
                      })}
                </ScrollView>
                {showSearch && subResults.length === 0 && _renderSearchTypes()}
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                  borderTopWidth: 2,
                  borderColor: primary_color,
                }}
              >
                {user ? (
                  <>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        borderRightWidth: 2,
                        borderColor: primary_color,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: primary_color,
                          fontWeight: "bold",
                        }}
                      >
                        Add sub
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        borderColor: primary_color,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: primary_color,
                          fontWeight: "bold",
                        }}
                      >
                        Create sub
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text style={{ color: primary_color }}>
                    Log in in order to view your subs!
                  </Text>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SubPicker;
