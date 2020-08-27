import React, { useContext } from "react";
import { View, Text } from "react-native";
import ClearContext from "../context/Clear";

const s = require("../assets/styles/mainStyles");

const Search: React.FC = () => {
  const context: any = useContext(ClearContext);

  return (
    <View style={s.screen}>
      <Text>Search</Text>
    </View>
  );
};

export default Search;
