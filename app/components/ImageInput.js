import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "react-native-image-picker";

import colors from "../config/colors";

const BUTTON_SIZE = 20;
const BORDER_WIDTH = 1;

function ImageInput({ imageUri, onChangeImage }) {
  const handlePress = () => {
    if (!imageUri) captureImage();
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs camera permission",
          }
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External Storage Write Permission",
            message: "App needs write permission",
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert("Write permission err", err);
      }
      return false;
    } else return true;
  };

  const captureImage = async () => {
    let options = {
      saveToPhotos: true,
      mediaType: "photo",
      includeBase64: false,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      ImagePicker.launchCamera(options, (response) => {
        console.log("Response = ", response);

        if (response.didCancel) {
          alert("User cancelled camera picker");
          return;
        } else if (response.errorCode == "camera_unavailable") {
          alert("Camera not available on device");
          return;
        } else if (response.errorCode == "permission") {
          alert("Permission not satisfied");
          return;
        } else if (response.errorCode == "others") {
          alert(response.errorMessage);
          return;
        }

        // console.log("uri -> ", response.assets[0].uri);
        onChangeImage(response.assets[0].uri);
      });
    }
  };

  const removeImage = () => {
    Alert.alert("Delete", "Are you sure you want to delete this image?", [
      { text: "Yes", onPress: () => onChangeImage(null) },
      { text: "No" },
    ]);
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <>
            <MaterialCommunityIcons
              name="camera"
              size={40}
              color={colors.medium}
            />
          </>
        )}
        {imageUri && (
          <>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={removeImage}
                style={[
                  styles.button,
                  { backgroundColor: "white", borderColor: colors.medium },
                ]}
              >
                <MaterialCommunityIcons
                  name="close"
                  color={colors.medium}
                  size={BUTTON_SIZE / 2}
                />
              </TouchableOpacity>
            </View>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 100,
    overflow: "hidden",
    width: 100,
  },
  image: {
    height: "100%",
    width: "100%",
    zIndex: 1,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: BUTTON_SIZE + BORDER_WIDTH,
    height: BUTTON_SIZE + BORDER_WIDTH,
    borderWidth: BORDER_WIDTH,
    borderRadius: BUTTON_SIZE / 2,
  },
  buttonContainer: {
    position: "absolute",
    top: 2,
    right: 2,
    zIndex: 2,
  },
});

export default ImageInput;
