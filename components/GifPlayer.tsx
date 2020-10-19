import React, { useState } from "react";
import { View, Image } from "react-native";
import Text from "./Text";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

type Props = {
  style: any;
  url: string;
  theme: string;
};

const GifPlayer: React.FC<Props> = (props) => {
  const [showGif, setShowGif] = useState<boolean>(false);

  return (
    <TouchableWithoutFeedback onPress={() => setShowGif(!showGif)}>
      <View style={props.style}>
        {showGif ? (
          <Image
            source={{ uri: props.url }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: props.theme === "light" ? "black" : "white" }}
            >
              Tap to show gif
            </Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GifPlayer;
