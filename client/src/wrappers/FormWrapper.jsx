import React from "react";
import { FormProvider } from "react-hook-form";

const FormWrapper = ({ children, formMethods }) => {
  return <FormProvider {...formMethods}>{children}</FormProvider>;
};

export default FormWrapper;
