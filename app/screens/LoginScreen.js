// import {
//   KeyboardAvoidingView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useContext } from "react";
// import { AuthContext } from "../auth/AuthProvider";
// import * as Yup from "yup";
// import Screen from "../components/Screen";

// const LoginScreen = () => {
//   // const [info, setInfo] = useState({
//   //   email: '',
//   //   password: ''
//   // });
//   const { register } = useContext(AuthContext);
//   // const handleSignUp = () => {
//   //   auth()
//   //     .createUserWithEmailAndPassword('mohamed@gmail.com', '122345678')
//   //     .then(() => {
//   //       console.log('User account created & signed in!');
//   //     })
//   //     .catch(error => {
//   //       if (error.code === 'auth/email-already-in-use') {
//   //         console.log('That email address is already in use!');
//   //       }

//   //       if (error.code === 'auth/invalid-email') {
//   //         console.log('That email address is invalid!');
//   //       }

//   //       console.error(error);
//   //     });
//   // };
//   return (
//     <KeyboardAvoidingView style={styles.container} behavior="padding">
//       {/* <View style={styles.inputContainer}>
//         <TextInput
//           placeholder="email"
//           style={styles.input}
//           value={info.email}
//           onChangeText={text => setInfo({...info, email: text.toString})}
//         />
//         <TextInput
//           placeholder="password"
//           style={styles.input}
//           value={info.password}
//           onChangeText={text => setInfo({...info, password: text.toString()})}
//           secureTextEntry
//         />
//       </View> */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           onPress={() => register("arkam@gmail.com", "1fgg345678")}
//           style={styles.button}
//         >
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {}}
//           style={[styles.button, styles.buttonOutLine]}
//         >
//           <Text style={styles.buttonOutLineText}>Register</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//   },
//   inputContainer: {
//     width: "80%",
//   },
//   buttonContainer: {
//     width: "60%",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 40,
//   },
//   input: {
//     backgroundColor: "white",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   button: {
//     width: "100%",
//     backgroundColor: "#0782F9",
//     padding: 20,
//     borderRadius: 20,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   buttonOutLine: {
//     backgroundColor: "white",
//     borderColor: "#0782F9",
//     borderWidth: 2,
//     marginTop: 10,
//   },
//   buttonOutLineText: {
//     color: "#0782F9",
//     fontSize: 16,
//     fontWeight: "700",
//   },
// });

import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import ErrorMessage from "../components/forms/ErrorMessage";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import SubmitButton from "../components/forms/SubmitButton";
import { AuthContext } from "../auth/AuthProvider";
import Button from "../components/Button";
import colors from "../config/colors";
import Text from "../components/Text";
import { SocialIcon } from "react-native-elements";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  // const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const { Login, googleLogin, faceBookLogin } = useContext(AuthContext);

  const handleSubmit = async ({ email, password }) => {
    const result = await Login(email, password);
    if (!result) return setLoginFailed(true);
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password"
          visible={loginFailed}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <Button
          title="Forgot Password?"
          color={colors.white}
          onPress={() => {}}
          alignItems="flex-end"
        />
        <SubmitButton title="Log in" alignItems="center" />
      </Form>
      {/* <View style={styles.viewStyleForLine}>
        <Text style={styles.socialButtonText}>
          Or continue with social account
        </Text>
      </View> */}
      <View style={styles.divider}>
        <View style={styles.hrLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.hrLine} />
      </View>

      <View style={styles.socialIconContainer}>
        <View>
          <SocialIcon style={styles.icon} type="google" onPress={googleLogin} />
        </View>
        <View>
          <SocialIcon
            style={styles.icon}
            type="facebook"
            onPress={faceBookLogin}
          />
        </View>
        <View>
          <SocialIcon
            style={styles.icon}
            type="twitter"
            onPress={() => {
              alert("twitter");
            }}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text>
          Do you have an account ?{" "}
          <Text
            style={{
              color: colors.primary,
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            SIGN UP
          </Text>
        </Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 15,
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-evenly",
    width: "100%",
    // flex: 1,
  },
  hrLine: {
    backgroundColor: colors.medium,
    height: 1,
    flex: 0.4,
  },
  dividerText: {
    color: colors.medium,
    flex: 0.1,
    textAlign: "center",
  },
  socialIconContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    margin: 15,
  },
  icon: {
    margin: 15,
  },
});

export default LoginScreen;
