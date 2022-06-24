import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

let firebase_images = [];

export const addItem = async (listing) => {
  Promise.all(listing.images.map((image) => putStorageImages(image)))
    .then((url) => {
      console.log(`All success`);
      firestore()
        .collection("items")
        .add({
          user: listing.user,
          title: listing.title,
          price: listing.price,
          images: firebase_images,
          categoryId: listing.category.value,
          description: listing.description,
          postTime: firestore.Timestamp.fromDate(new Date()),
        })
        .then((data) => {
          console.log(data);
          Alert.alert(
            "Item published!",
            "Your Item has been published Successfully!"
          );

          return true;
        })
        .catch((error) => {
          console.log(
            "Something went wrong with added post to firestore.",
            error
          );
          Alert.alert("Failed!", "uploading failed!");
        });
    })
    .catch((error) => {
      console.log(`Some failed: `, error.message);
    });
};

const putStorageImages = async (image) => {
  const uploadUri = image;
  let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

  // Add timestamp to File Name
  const extension = filename.split(".").pop();
  const name = filename.split(".").slice(0, -1).join(".");
  filename = name + Date.now() + "." + extension;

  const storageRef = storage().ref(`photos/${filename}`);
  const task = storageRef.putFile(uploadUri);

  // Set transferred state
  task.on("state_changed", (taskSnapshot) => {
    console.log(
      `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
    );
  });

  try {
    await task;

    const url = await storageRef.getDownloadURL();
    firebase_images.push(url);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getItems = async () => {
  try {
    const list = [];

    await firestore()
      .collection("items")
      .orderBy("postTime", "desc")
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          const {
            user,
            title,
            price,
            postTime,
            images,
            description,
            categoryId,
          } = doc.data();
          list.push({
            id: doc.id,
            user,
            title,
            price,
            postTime,
            images,
            description,
            categoryId,
          });
        });
      });

    return list;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getItem = async (itemID) => {
  const item = await firestore().collection("items").doc(itemID).get();

  return item.data();
};
