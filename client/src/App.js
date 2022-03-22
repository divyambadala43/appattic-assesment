import React from "react";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import Form from "./components/Form";

const App = () => {
  return (
    <>
      <AppProvider i18n={enTranslations}>
        <Form />
      </AppProvider>
    </>
  );
};

export default App;
