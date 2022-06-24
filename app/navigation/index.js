import React from "react";
import { AuthProvider } from "../auth/AuthProvider";
import { ItemProvider } from "../auth/ItemProvider";
import Routes from "./Routes";

const ContextProviderComposer = ({ contextProviders, children }) => {
  return contextProviders.reduceRight(
    (children, parent, index) => React.cloneElement(parent, { children }),
    children
  );
};
const Providers = () => {
  return (
    <AuthProvider>
      <ItemProvider>
        <Routes />
      </ItemProvider>
    </AuthProvider>
  );
};

export default Providers;
