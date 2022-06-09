import React from "react";
import { useFormikContext } from "formik";

import TextInputField from "../TextInputField";
import ErrorMessage from "./ErrorMessage";

function FormField({ name, width, ...otherProps }) {
  const { errors, setFieldValue, setFieldTouched, touched, values } =
    useFormikContext();
  return (
    <>
      <TextInputField
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormField;
