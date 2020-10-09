import React, { useState } from "react";
import { View, TouchableWithoutFeedback, Image, Modal } from "react-native";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageViewer from "react-native-image-zoom-viewer";
import { getAlbum } from "../util/imgur/imgurFunctions";
import Text from "./Text";

type Props = {
  style: any;
  hash: string;
  theme: string;
  color: string;
};
const ImgurAlbumViewer: React.FC<Props> = (props) => {
  const [showAlbum, setShowAlbum] = useState<boolean>(false);
  const [images, setImages] = useState<any>();
  const [showAlbumModal, setShowAlbumModal] = useState<boolean>(false);

  const getImages = async () => {
    getAlbum(props.hash).then((data: string) => {
      setImages(JSON.parse(data).data.images);
    });
  };
  return (
    <>
      <Modal
        visible={showAlbumModal}
        transparent={false}
        animationType="none"
        onRequestClose={() => setShowAlbumModal(false)}
      >
        <ImageViewer
          imageUrls={
            images &&
            images.map((i: any) => {
              return { url: i.link };
            })
          }
          onSwipeDown={() => setShowAlbumModal(false)}
          enableSwipeDown={true}
        />

        <TouchableOpacity
          style={{ position: "absolute", top: 40, left: 10 }}
          onPress={() => setShowAlbumModal(false)}
        >
          <Icon name="close" color="white" />
        </TouchableOpacity>
      </Modal>
      <View style={props.style}>
        {showAlbum && images ? (
          <TouchableWithoutFeedback onPress={() => setShowAlbumModal(true)}>
            <View style={{ flex: 1, position: "relative" }}>
              <Image
                source={{ uri: images[0].link }}
                style={{ width: "100%", height: "100%" }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  padding: 10,
                  backgroundColor: props.color,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "white" }}>{images.length} image(s)</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowAlbum(true);
                getImages();
              }}
            >
              <Text
                style={{ color: props.theme === "light" ? "black" : "white" }}
              >
                Tap to get album images
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

export default ImgurAlbumViewer;
