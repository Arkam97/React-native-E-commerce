import { StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import FormField from "../components/forms/FormField";
import Form from "../components/forms/Form";
import Screen from "../components/Screen";
import SubmitButton from "../components/forms/SubmitButton";
import FormPicker from "../components/forms/FormPicker";
import FormImagePicker from "../components/forms/FormImagePicker";
// import UploadScreen from "./UploadScreen";
import { addItem } from "../api/Item";
import CategoryPickerItem from "../components/CategoryPickerItem";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../auth/AuthProvider";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

const ListingEditScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const handleSubmit = async (listing, { resetForm }) => {
    const result = await addItem({ ...listing });
    resetForm();
    navigation.navigate("ListingScreen");
  };
  return (
    <ScrollView>
      <Screen style={styles.container}>
        <Form
          initialValues={{
            user: user.uid,
            title: "",
            price: "",
            description: "",
            category: null,
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormImagePicker name="images" />
          <FormField maxLength={255} name="title" placeholder="Title" />
          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
          />
          <FormPicker
            items={categories}
            name="category"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Category"
            // width="50%"
          />
          <FormField
            maxLength={255}
            // multiline
            name="description"
            numberOfLines={4}
            placeholder="Description"
          />
          <SubmitButton title="POST" alignItems="center" />
        </Form>
      </Screen>
    </ScrollView>
  );
};

export default ListingEditScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
