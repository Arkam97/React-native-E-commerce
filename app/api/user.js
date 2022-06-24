import firestore from "@react-native-firebase/firestore";

export const getUser = async (userID) => {
  const user = await firestore().collection("users").doc(userID).get();
  return user.data();
};
