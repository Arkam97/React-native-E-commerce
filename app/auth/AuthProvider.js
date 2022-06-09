import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from "react-native-fbsdk-next";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const Login = async (email, password) => {
    try {
      console.log(email + password);
      console.log("first");
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log("login in successfully");
          return true;
        })
        .catch((error) => {
          console.log("Something went wrong : ", error);
          return error;
        });
    } catch (e) {
      console.log(e);
    }
  };

  const googleLogin = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth()
        .signInWithCredential(googleCredential)
        .catch((error) => {
          console.log("Something went wrong with sign up: ", error);
        });
    } catch (error) {
      console.log({ error });
    }
  };

  const faceBookLogin = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      if (result.isCancelled) {
        throw "User cancelled the login process";
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw "Something went wrong obtaining access token";
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      // Sign-in the user with the credential
      await auth()
        .signInWithCredential(facebookCredential)
        .catch((error) => {
          console.log("Something went wrong with sign up: ", error);
        });
    } catch (error) {
      console.log({ error });
    }
  };

  const register = async (email, password) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          //Once the user creation has happened successfully, we can add the currentUser into firestore
          //with the appropriate details.
          firestore()
            .collection("users")
            .doc(auth().currentUser.uid)
            .set({
              fname: "",
              lname: "",
              email: email,
              createdAt: firestore.Timestamp.fromDate(new Date()),
              userImg: null,
            })
            //ensure we catch any errors at this stage to advise us if something does go wrong
            .catch((error) => {
              console.log(
                "Something went wrong with added user to firestore: ",
                error
              );
            });
        })
        //we need to catch the whole sign up process if it fails too.
        .catch((error) => {
          console.log("Something went wrong with sign up: ", error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  const value = {
    user,
    setUser,
    Login,
    register,
    logout,
    googleLogin,
    faceBookLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
