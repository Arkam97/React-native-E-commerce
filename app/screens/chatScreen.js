import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useContext,
} from "react";
import { TouchableOpacity, Text, SafeAreaView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firestore from "@react-native-firebase/firestore";

import { AuthContext } from "../auth/AuthProvider";

export default function Chat({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState("");
  const { user } = useContext(AuthContext);
  const productOwner = route.params;

  console.log(user.uid);
  console.log(productOwner);

  useEffect(() => {
    let unsubscribeListener = firestore()
      .collection("chats")
      .onSnapshot((querySnapshot) => {
        console.log(querySnapshot);
        let docs = [];
        querySnapshot.forEach((doc) => docs.push({ ...doc.data() }));
        console.log(docs);
        // setMessages(
        //   querySnapshot.docs.map((doc) => ({
        //     _id: doc.data()._id,
        //     createdAt: doc.data().createdAt.toDate(),
        //     text: doc.data().text,
        //     user: doc.data().user,
        //   }))
        // );
      });

    return () => unsubscribeListener();
  }, [user.uid]);

  // const myFirebaseCallback = useCallback(() => {
  // let unsubscribeListener = firestore()
  //   .collection("chats")
  //   .orderBy("createdAt", "desc")
  //   .onSnapshot((querySnapshot) => {
  //     setMessages(
  //       querySnapshot.docs.map((doc) => ({
  //         _id: doc.data()._id,
  //         createdAt: doc.data().createdAt.toDate(),
  //         text: doc.data().text ? doc.data().text : "",
  //         user: doc.data().user,
  //       }))
  //     );
  //   });

  // return () => unsubscribeListener();
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: "2",
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //   ]);
  // }, []);

  // useEffect(() => {
  //   myFirebaseCallback();
  //   console.log("1");
  // }, [myFirebaseCallback]);

  // const onSend = useCallback((messages = []) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages)
  //   );

  // const { _id, createdAt, text, user } = messages[0];

  // firestore()
  //   .collection("chats")
  //   .add({
  //     // createdAt: new Date(),
  //     // text: newMessages[0].text,
  //     // user: productOwner,
  //     _id,
  //     createdAt,
  //     text,
  //     user,
  //   })
  //   .then(() => {});
  // }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <SafeAreaView>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
}
