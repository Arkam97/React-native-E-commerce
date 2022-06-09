import { StyleSheet, KeyboardAvoidingView, View } from "react-native";
import React, { useState, useContext, Image } from "react";
import * as Yup from "yup";

import Screen from "../components/Screen";
import ErrorMessage from "../components/forms/ErrorMessage";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import SubmitButton from "../components/forms/SubmitButton";
// import ActivityIndicator from "../components/ActivityIndicator";
import { AuthContext } from "../auth/AuthProvider";
// import AppText from "../components/Text";
import Text from "../components/Text";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  name: Yup.string().required().label("Name"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function RegisterScreen() {
  const [registerFailed, setRegisterFailed] = useState(false);
  const { register } = useContext(AuthContext);

  const handleSubmit = async ({ email, password }) => {
    const result = await register(email, password);
    if (!result) return setRegisterFailed(true);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* <View style={styles.logoBox}> */}
      {/* <Image style={styles.logo} source={require("../assets/logo-red.png")} /> */}
      {/* <Image style={styles.logo} source={require("../assets/logo-red.png")} />
      <Text style={styles.logoText}>Done With It</Text> */}
      {/* </View> */}
      <Form
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="An unexpected error occured."
          visible={registerFailed}
        />
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
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
        <SubmitButton title="REGISTER" alignItems="center" />
      </Form>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
  },
  logoBox: {
    flex: -1,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
  },
  logoText: {
    marginTop: 10,
    marginBottom: 40,
    fontWeight: "700",
    fontSize: 30,
    fontFamily: "Roboto",
    color: "#E91D29",
  },
});
